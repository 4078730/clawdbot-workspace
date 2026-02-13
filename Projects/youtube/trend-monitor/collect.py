#!/usr/bin/env python3
"""
Trend Radar v2 — Data Collector
Collects Google Trends, YouTube (this week), and Reddit data.
Outputs data/trend-latest.json
"""

import json
import os
import re
import subprocess
import sys
import time
import urllib.parse
from datetime import datetime, timezone, timedelta

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

JST = timezone(timedelta(hours=9))
DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")

# Google Trends keyword groups (max 5 per group)
TRENDS_GROUPS = {
    "ai_video_general": {
        "keywords": ["AI anime", "AI live action", "Seedance", "AI実写化", "AI video generator"],
        "label": "AI動画全般",
    },
    "by_anime": {
        "keywords": ["AI Dragon Ball", "AI One Piece", "AI Naruto", "AI Jujutsu Kaisen", "AI Chainsaw Man"],
        "label": "作品別（グループ1）",
    },
    "by_anime_2": {
        "keywords": ["AI Demon Slayer", "AI Frieren"],
        "label": "作品別（グループ2）",
    },
    "tools": {
        "keywords": ["Seedance 2.0", "Dreamina", "Kling AI", "Sora AI", "Midjourney video"],
        "label": "ツール",
    },
}

# YouTube search queries (this week filter)
YOUTUBE_QUERIES = [
    "AI anime live action",
    "AI実写化",
    "Seedance anime",
    "AI live action Dragon Ball",
    "AI live action One Piece",
    "AI live action Naruto",
    "AI live action Jujutsu Kaisen",
    "AI live action Chainsaw Man",
    "AI live action Demon Slayer",
    "AI live action Frieren",
]

# Genre classification rules
GENRE_RULES = {
    "実写化": ["実写化", "live action", "real life", "realistic"],
    "バトル": ["fight", "battle", "バトル", "vs", "combat"],
    "メイキング": ["behind the scenes", "making of", "how to", "tutorial", "workflow", "メイキング"],
    "ドラゴンボール": ["dragon ball", "ドラゴンボール", "goku", "悟空"],
    "ワンピース": ["one piece", "ワンピース", "luffy", "ルフィ"],
    "NARUTO": ["naruto", "ナルト"],
    "呪術廻戦": ["jujutsu", "呪術廻戦", "gojo", "五条"],
    "チェンソーマン": ["chainsaw man", "チェンソーマン", "denji", "デンジ"],
    "鬼滅の刃": ["demon slayer", "鬼滅", "tanjiro", "炭治郎"],
    "葬送のフリーレン": ["frieren", "フリーレン"],
}


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def ensure_package(package_name, import_name=None):
    """Import a package, installing if necessary."""
    import_name = import_name or package_name
    try:
        return __import__(import_name)
    except ImportError:
        print(f"[*] Installing {package_name}...")
        subprocess.check_call(
            [sys.executable, "-m", "pip", "install", package_name, "--break-system-packages", "-q"],
            stderr=subprocess.DEVNULL,
        )
        return __import__(import_name)


def now_iso():
    return datetime.now(JST).isoformat()


def classify_genres(title: str, description: str = "") -> list:
    """Classify a video/post into genres based on title and description."""
    text = (title + " " + description).lower()
    genres = []
    for genre, keywords in GENRE_RULES.items():
        if any(kw.lower() in text for kw in keywords):
            genres.append(genre)
    if not genres:
        genres.append("その他")
    return genres


# ---------------------------------------------------------------------------
# 1. Google Trends (pytrends)
# ---------------------------------------------------------------------------

def collect_google_trends() -> dict:
    """Collect Google Trends data for all keyword groups."""
    try:
        from pytrends.request import TrendReq
    except ImportError:
        ensure_package("pytrends")
        from pytrends.request import TrendReq

    results = {}
    pytrends = TrendReq(hl="ja-JP", tz=-540)  # JST = UTC+9 → tz=-540

    for group_key, group_config in TRENDS_GROUPS.items():
        keywords = group_config["keywords"]
        print(f"  [Google Trends] Fetching: {group_key} ({len(keywords)} keywords)")

        try:
            pytrends.build_payload(keywords, timeframe="now 7-d")
            interest_df = pytrends.interest_over_time()

            data_points = []
            if not interest_df.empty:
                # Drop isPartial column if exists
                if "isPartial" in interest_df.columns:
                    interest_df = interest_df.drop(columns=["isPartial"])

                for idx, row in interest_df.iterrows():
                    point = {"date": idx.strftime("%Y-%m-%d %H:%M")}
                    values = {}
                    for kw in keywords:
                        if kw in row:
                            values[kw] = int(row[kw])
                    point["values"] = values
                    data_points.append(point)

            # Try to get rising queries
            rising = []
            try:
                related = pytrends.related_queries()
                for kw in keywords:
                    if kw in related and related[kw].get("rising") is not None:
                        df_rising = related[kw]["rising"]
                        if not df_rising.empty:
                            rising.extend(df_rising["query"].tolist()[:5])
            except Exception:
                pass

            results[group_key] = {
                "keywords": keywords,
                "label": group_config["label"],
                "data": data_points,
                "rising": list(set(rising))[:10],
            }

            # Polite delay to avoid rate limiting
            time.sleep(2)

        except Exception as e:
            print(f"  [Google Trends] Error for {group_key}: {e}")
            results[group_key] = {
                "keywords": keywords,
                "label": group_config["label"],
                "data": [],
                "rising": [],
                "error": str(e),
            }

    return results


# ---------------------------------------------------------------------------
# 2. YouTube (this week's videos only)
# ---------------------------------------------------------------------------

def collect_youtube() -> list:
    """Collect YouTube videos from this week using web scraping."""
    requests = ensure_package("requests")

    all_videos = {}
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9,ja;q=0.8",
    }

    for query in YOUTUBE_QUERIES:
        try:
            encoded_q = urllib.parse.quote(query)
            # sp=EgIIAw%3D%3D = Upload date: This week
            url = f"https://www.youtube.com/results?search_query={encoded_q}&sp=EgIIAw%3D%3D"
            print(f"  [YouTube] Searching: {query}")

            resp = requests.get(url, headers=headers, timeout=15)
            if resp.status_code != 200:
                print(f"    HTTP {resp.status_code}")
                continue

            html = resp.text

            # Extract ytInitialData JSON from page
            match = re.search(r"var ytInitialData\s*=\s*(\{.*?\});\s*</script>", html, re.DOTALL)
            if not match:
                # Try alternative pattern
                match = re.search(r"ytInitialData\s*=\s*(\{.*?\});\s*", html, re.DOTALL)

            if not match:
                print(f"    Could not extract ytInitialData")
                continue

            try:
                yt_data = json.loads(match.group(1))
            except json.JSONDecodeError:
                print(f"    JSON parse error")
                continue

            # Navigate the nested structure to find video renderers
            videos = _extract_videos_from_yt_data(yt_data, query)
            for v in videos:
                vid = v.get("videoId", "")
                if vid and vid not in all_videos:
                    all_videos[vid] = v

            time.sleep(1)  # Polite delay

        except Exception as e:
            print(f"    [YouTube] Error for '{query}': {e}")

    items = list(all_videos.values())
    # Sort by views descending
    items.sort(key=lambda x: x.get("views", 0) or 0, reverse=True)
    return items


def _extract_videos_from_yt_data(data: dict, query: str) -> list:
    """Extract video info from ytInitialData JSON."""
    videos = []

    try:
        contents = (
            data.get("contents", {})
            .get("twoColumnSearchResultsRenderer", {})
            .get("primaryContents", {})
            .get("sectionListRenderer", {})
            .get("contents", [])
        )

        for section in contents:
            items = (
                section.get("itemSectionRenderer", {})
                .get("contents", [])
            )
            for item in items:
                renderer = item.get("videoRenderer")
                if not renderer:
                    continue

                video_id = renderer.get("videoId", "")
                title_runs = renderer.get("title", {}).get("runs", [])
                title = "".join(r.get("text", "") for r in title_runs)

                # View count
                view_text = renderer.get("viewCountText", {}).get("simpleText", "0")
                views = _parse_view_count(view_text)

                # Channel name
                channel_runs = renderer.get("ownerText", {}).get("runs", [])
                author = "".join(r.get("text", "") for r in channel_runs)

                # Thumbnail
                thumbnails = renderer.get("thumbnail", {}).get("thumbnails", [])
                thumb = thumbnails[-1].get("url", "") if thumbnails else f"https://i.ytimg.com/vi/{video_id}/hqdefault.jpg"

                # Published time text
                published = renderer.get("publishedTimeText", {}).get("simpleText", "")

                tags = classify_genres(title)

                videos.append({
                    "videoId": video_id,
                    "title": title,
                    "url": f"https://www.youtube.com/watch?v={video_id}",
                    "views": views,
                    "thumbnail": thumb,
                    "uploaded": published,
                    "author": author,
                    "tags": tags,
                    "search_query": query,
                })

    except Exception as e:
        print(f"    [Parse] Error: {e}")

    return videos


def _parse_view_count(text: str) -> int:
    """Parse view count text like '1,234 views' or '12万回視聴' to int."""
    if not text:
        return 0
    text = text.replace(",", "").replace(" ", "")

    # Japanese format: 1.2万回視聴
    m = re.search(r"([\d.]+)万", text)
    if m:
        return int(float(m.group(1)) * 10000)

    m = re.search(r"([\d.]+)億", text)
    if m:
        return int(float(m.group(1)) * 100000000)

    # English: 1234 views / 1.2K views / 1.2M views
    m = re.search(r"([\d.]+)([KkMmBb])?", text)
    if m:
        num = float(m.group(1))
        suffix = (m.group(2) or "").upper()
        if suffix == "K":
            return int(num * 1000)
        elif suffix == "M":
            return int(num * 1000000)
        elif suffix == "B":
            return int(num * 1000000000)
        return int(num)

    return 0


# ---------------------------------------------------------------------------
# 3. Reddit r/aivideo
# ---------------------------------------------------------------------------

def collect_reddit() -> list:
    """Collect hot posts from r/aivideo."""
    requests = ensure_package("requests")

    items = []
    headers = {"User-Agent": "TrendRadar/2.0"}

    subreddits = ["aivideo"]

    for subreddit in subreddits:
        try:
            url = f"https://www.reddit.com/r/{subreddit}/hot.json?limit=50"
            print(f"  [Reddit] Fetching r/{subreddit}...")
            resp = requests.get(url, headers=headers, timeout=15)

            if resp.status_code != 200:
                print(f"    HTTP {resp.status_code}")
                continue

            data = resp.json()
            for child in data.get("data", {}).get("children", []):
                post = child.get("data", {})
                if post.get("stickied"):
                    continue

                score = post.get("score", 0)
                title = post.get("title", "")
                permalink = post.get("permalink", "")

                thumbnail = post.get("thumbnail", "")
                if thumbnail in ("self", "default", "nsfw", "spoiler", ""):
                    # Try to get preview image
                    try:
                        preview_images = post.get("preview", {}).get("images", [])
                        if preview_images:
                            thumbnail = preview_images[0].get("source", {}).get("url", "").replace("&amp;", "&")
                    except Exception:
                        thumbnail = None

                tags = classify_genres(title, post.get("selftext", ""))
                if "r/aivideo" not in str(tags):
                    tags.append("AI動画")

                items.append({
                    "title": title,
                    "url": f"https://www.reddit.com{permalink}",
                    "score": score,
                    "thumbnail": thumbnail,
                    "author": f"u/{post.get('author', 'unknown')}",
                    "tags": list(set(tags)),
                    "num_comments": post.get("num_comments", 0),
                    "created_utc": post.get("created_utc", 0),
                })

        except Exception as e:
            print(f"    [Reddit] Error for r/{subreddit}: {e}")

    # Sort by score descending
    items.sort(key=lambda x: x.get("score", 0), reverse=True)
    return items


# ---------------------------------------------------------------------------
# 4. Genre Statistics
# ---------------------------------------------------------------------------

def compute_genre_stats(youtube_items: list) -> dict:
    """Compute genre statistics from YouTube items."""
    stats = {}

    for item in youtube_items:
        views = item.get("views", 0) or 0
        tags = item.get("tags", [])

        for tag in tags:
            if tag not in stats:
                stats[tag] = {"total_views": 0, "video_count": 0, "videos": []}
            stats[tag]["total_views"] += views
            stats[tag]["video_count"] += 1
            stats[tag]["videos"].append(item.get("title", ""))

    # Compute averages
    for tag in stats:
        count = stats[tag]["video_count"]
        stats[tag]["avg_views"] = int(stats[tag]["total_views"] / count) if count > 0 else 0
        del stats[tag]["videos"]  # Clean up

    return stats


# ---------------------------------------------------------------------------
# 5. Embed data into HTML
# ---------------------------------------------------------------------------

def embed_data_in_html(data: dict):
    """Embed JSON data into dashboard HTML for file:// access."""
    dashboard_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "dashboard", "index.html")

    if not os.path.exists(dashboard_path):
        print(f"  [Embed] Dashboard not found at {dashboard_path}")
        return

    with open(dashboard_path, "r", encoding="utf-8") as f:
        html = f.read()

    # JSON data as inline script
    data_json = json.dumps(data, ensure_ascii=False, indent=2)
    embed_script = f"<script>window.__TREND_DATA__ = {data_json};</script>"

    # Replace existing embedded data or insert before closing </head>
    pattern = r"<script>window\.__TREND_DATA__\s*=\s*\{.*?\};</script>"
    if re.search(pattern, html, re.DOTALL):
        html = re.sub(pattern, embed_script, html, flags=re.DOTALL)
    else:
        html = html.replace("</head>", f"{embed_script}\n</head>")

    with open(dashboard_path, "w", encoding="utf-8") as f:
        f.write(html)

    print(f"  [Embed] Data embedded into {dashboard_path}")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    print("=" * 60)
    print(f"📡 Trend Radar v2 — Data Collector")
    print(f"   {datetime.now(JST).strftime('%Y-%m-%d %H:%M:%S %Z')}")
    print("=" * 60)

    result = {
        "collected_at": now_iso(),
        "google_trends": {},
        "youtube_trending": [],
        "reddit_hot": [],
        "genre_stats": {},
    }

    # 1. Google Trends
    print("\n[1/3] Collecting Google Trends...")
    try:
        result["google_trends"] = collect_google_trends()
        total_points = sum(len(g.get("data", [])) for g in result["google_trends"].values())
        print(f"  → {len(result['google_trends'])} groups, {total_points} data points")
    except Exception as e:
        print(f"  ❌ Google Trends failed: {e}")
        result["google_trends"] = {}

    # 2. YouTube
    print("\n[2/3] Collecting YouTube (this week)...")
    try:
        result["youtube_trending"] = collect_youtube()
        print(f"  → {len(result['youtube_trending'])} videos")
    except Exception as e:
        print(f"  ❌ YouTube failed: {e}")
        result["youtube_trending"] = []

    # 3. Reddit
    print("\n[3/3] Collecting Reddit (r/aivideo)...")
    try:
        result["reddit_hot"] = collect_reddit()
        print(f"  → {len(result['reddit_hot'])} posts")
    except Exception as e:
        print(f"  ❌ Reddit failed: {e}")
        result["reddit_hot"] = []

    # 4. Genre stats
    print("\n[+] Computing genre statistics...")
    result["genre_stats"] = compute_genre_stats(result["youtube_trending"])
    print(f"  → {len(result['genre_stats'])} genres")

    # Save JSON
    os.makedirs(DATA_DIR, exist_ok=True)
    out_path = os.path.join(DATA_DIR, "trend-latest.json")

    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    print(f"\n✅ Saved to {out_path}")

    # Embed into HTML
    print("\n[+] Embedding data into dashboard HTML...")
    embed_data_in_html(result)

    print("\n🎉 Collection complete!")
    return out_path


if __name__ == "__main__":
    main()

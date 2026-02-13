#!/usr/bin/env python3
"""
Trend Monitor — Data Collector (MVP)
Collects trending AI video / anime live-action content from YouTube & Reddit.
Outputs data/trend-YYYY-MM-DD.json
"""

import json
import os
import subprocess
import sys
from datetime import datetime, timezone, timedelta

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

JST = timezone(timedelta(hours=9))

YOUTUBE_QUERIES = [
    "AI anime live action",
    "AI実写化",
    "anime AI generated",
    "AIアニメ実写",
    "AI anime to real life",
    "AI実写 アニメ",
]

REDDIT_SUBREDDITS = [
    "StableDiffusion",
    "aivideo",
    "midjourney",
    "singularity",
]

REDDIT_MIN_SCORE = 100

DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def ensure_requests():
    """Import requests, installing if necessary."""
    try:
        import requests
        return requests
    except ImportError:
        print("[*] Installing requests...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "requests", "-q"])
        import requests
        return requests


def now_iso():
    return datetime.now(JST).isoformat()


# ---------------------------------------------------------------------------
# YouTube (via YouTube Data API v3 if key available, else web search fallback)
# ---------------------------------------------------------------------------

def collect_youtube(requests_mod) -> list:
    """Collect trending YouTube videos about AI anime live-action."""
    api_key = os.environ.get("YOUTUBE_API_KEY", "")
    items = []

    if api_key:
        items = _youtube_api(requests_mod, api_key)
    else:
        print("[YouTube] No API key found, using RSS/search fallback...")
        items = _youtube_fallback(requests_mod)

    return items


def _youtube_api(requests_mod, api_key: str) -> list:
    """Use YouTube Data API v3 to search for videos."""
    items = []
    base = "https://www.googleapis.com/youtube/v3/search"

    for query in YOUTUBE_QUERIES[:4]:  # limit to avoid quota burn
        params = {
            "part": "snippet",
            "q": query,
            "type": "video",
            "order": "viewCount",
            "maxResults": 5,
            "relevanceLanguage": "ja",
            "key": api_key,
        }
        try:
            resp = requests_mod.get(base, params=params, timeout=15)
            if resp.status_code != 200:
                print(f"  [YouTube API] HTTP {resp.status_code} for '{query}'")
                continue
            data = resp.json()
            for entry in data.get("items", []):
                vid = entry["id"].get("videoId")
                if not vid:
                    continue
                snippet = entry["snippet"]
                items.append({
                    "source": "youtube",
                    "title": snippet.get("title", ""),
                    "url": f"https://www.youtube.com/watch?v={vid}",
                    "views": None,  # search endpoint doesn't return view count
                    "score": None,
                    "author": snippet.get("channelTitle", ""),
                    "thumbnail": snippet.get("thumbnails", {}).get("high", {}).get("url", ""),
                    "tags": _auto_tags_youtube(snippet.get("title", ""), snippet.get("description", "")),
                    "summary": (snippet.get("description", "") or "")[:200],
                    "collected_at": now_iso(),
                })
        except Exception as e:
            print(f"  [YouTube API] Error for '{query}': {e}")

    # Deduplicate by URL
    seen = set()
    deduped = []
    for item in items:
        if item["url"] not in seen:
            seen.add(item["url"])
            deduped.append(item)
    return deduped


def _youtube_fallback(requests_mod) -> list:
    """Fallback: Use YouTube RSS feeds from known channels + Invidious search."""
    items = []

    # Try Invidious (public instance) search as fallback
    invidious_instances = [
        "https://vid.puffyan.us",
        "https://invidious.fdn.fr",
        "https://invidious.snopyta.org",
    ]

    for query in YOUTUBE_QUERIES[:3]:
        fetched = False
        for instance in invidious_instances:
            try:
                url = f"{instance}/api/v1/search"
                params = {"q": query, "sort_by": "view_count", "type": "video"}
                resp = requests_mod.get(url, params=params, timeout=10)
                if resp.status_code != 200:
                    continue
                data = resp.json()
                for entry in data[:5]:
                    vid = entry.get("videoId", "")
                    if not vid:
                        continue
                    items.append({
                        "source": "youtube",
                        "title": entry.get("title", ""),
                        "url": f"https://www.youtube.com/watch?v={vid}",
                        "views": entry.get("viewCount"),
                        "score": None,
                        "author": entry.get("author", ""),
                        "thumbnail": f"https://i.ytimg.com/vi/{vid}/hqdefault.jpg",
                        "tags": _auto_tags_youtube(entry.get("title", ""), entry.get("description", "")),
                        "summary": (entry.get("description", "") or "")[:200],
                        "collected_at": now_iso(),
                    })
                fetched = True
                break
            except Exception:
                continue
        if not fetched:
            print(f"  [YouTube fallback] Could not fetch results for '{query}'")

    # Deduplicate
    seen = set()
    deduped = []
    for item in items:
        if item["url"] not in seen:
            seen.add(item["url"])
            deduped.append(item)
    return deduped


def _auto_tags_youtube(title: str, description: str) -> list:
    """Simple keyword-based auto-tagging."""
    text = (title + " " + description).lower()
    tags = []
    if any(k in text for k in ["ai動画", "ai video", "ai anime", "ai実写", "ai generated"]):
        tags.append("AI動画")
    if any(k in text for k in ["実写化", "live action", "real life"]):
        tags.append("実写化")
    # Anime titles
    anime_map = {
        "ワンピース": "ワンピース", "one piece": "ワンピース",
        "呪術廻戦": "呪術廻戦", "jujutsu": "呪術廻戦",
        "チェンソーマン": "チェンソーマン", "chainsaw": "チェンソーマン",
        "鬼滅": "鬼滅の刃", "demon slayer": "鬼滅の刃",
        "進撃": "進撃の巨人", "attack on titan": "進撃の巨人",
        "ドラゴンボール": "ドラゴンボール", "dragon ball": "ドラゴンボール",
        "ナルト": "NARUTO", "naruto": "NARUTO",
        "推しの子": "推しの子", "oshi no ko": "推しの子",
    }
    for keyword, tag in anime_map.items():
        if keyword in text:
            tags.append(tag)
    if not tags:
        tags.append("AI動画")
    return list(set(tags))


# ---------------------------------------------------------------------------
# Reddit
# ---------------------------------------------------------------------------

def collect_reddit(requests_mod) -> list:
    """Collect hot posts from AI-related subreddits."""
    items = []
    headers = {"User-Agent": "TrendMonitor/1.0"}

    for subreddit in REDDIT_SUBREDDITS:
        try:
            url = f"https://www.reddit.com/r/{subreddit}/hot.json?limit=25"
            resp = requests_mod.get(url, headers=headers, timeout=15)
            if resp.status_code != 200:
                print(f"  [Reddit] HTTP {resp.status_code} for r/{subreddit}")
                continue
            data = resp.json()
            for child in data.get("data", {}).get("children", []):
                post = child.get("data", {})
                score = post.get("score", 0)
                if score < REDDIT_MIN_SCORE:
                    continue
                # Check relevance (loose filter for MVP)
                title = post.get("title", "")
                thumbnail = post.get("thumbnail", "")
                if thumbnail in ("self", "default", "nsfw", "spoiler", ""):
                    thumbnail = None

                items.append({
                    "source": "reddit",
                    "title": title,
                    "url": f"https://www.reddit.com{post.get('permalink', '')}",
                    "views": None,
                    "score": score,
                    "author": f"u/{post.get('author', 'unknown')}",
                    "thumbnail": thumbnail,
                    "tags": _auto_tags_reddit(title, subreddit),
                    "summary": (post.get("selftext", "") or "")[:200],
                    "collected_at": now_iso(),
                })
        except Exception as e:
            print(f"  [Reddit] Error for r/{subreddit}: {e}")

    return items


def _auto_tags_reddit(title: str, subreddit: str) -> list:
    """Auto-tag Reddit posts."""
    tags = []
    text = title.lower()

    if subreddit.lower() in ("stablediffusion", "midjourney"):
        tags.append("ツール情報")
    if subreddit.lower() == "aivideo":
        tags.append("AI動画")
    if any(k in text for k in ["video", "animate", "motion", "動画"]):
        tags.append("AI動画")
    if any(k in text for k in ["anime", "アニメ", "manga"]):
        tags.append("アニメ話題")
    if any(k in text for k in ["tool", "model", "release", "update", "workflow"]):
        tags.append("ツール情報")

    if not tags:
        tags.append("AI動画")
    return list(set(tags))


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    print("=" * 60)
    print(f"📡 Trend Monitor — Collector")
    print(f"   {datetime.now(JST).strftime('%Y-%m-%d %H:%M:%S %Z')}")
    print("=" * 60)

    requests_mod = ensure_requests()
    all_items = []

    # YouTube
    print("\n[1/2] Collecting from YouTube...")
    yt_items = collect_youtube(requests_mod)
    print(f"  → {len(yt_items)} items from YouTube")
    all_items.extend(yt_items)

    # Reddit
    print("\n[2/2] Collecting from Reddit...")
    reddit_items = collect_reddit(requests_mod)
    print(f"  → {len(reddit_items)} items from Reddit")
    all_items.extend(reddit_items)

    # Sort by views/score (views first, then score)
    def sort_key(item):
        v = item.get("views") or 0
        s = item.get("score") or 0
        return max(v, s * 1000)  # Rough normalization
    all_items.sort(key=sort_key, reverse=True)

    # Save
    os.makedirs(DATA_DIR, exist_ok=True)
    today = datetime.now(JST).strftime("%Y-%m-%d")
    out_path = os.path.join(DATA_DIR, f"trend-{today}.json")

    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(all_items, f, ensure_ascii=False, indent=2)

    print(f"\n✅ Saved {len(all_items)} items to {out_path}")
    return out_path


if __name__ == "__main__":
    main()

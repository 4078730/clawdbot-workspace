#!/usr/bin/env python3
"""RFA FY26-28 ガントチャート生成スクリプト"""

import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyArrowPatch
import numpy as np

# --- フォント設定 ---
plt.rcParams['font.family'] = ['DejaVu Sans', 'Noto Sans CJK JP', 'IPAGothic', 'sans-serif']
plt.rcParams['font.size'] = 8

# --- 色定義 ---
C_INTERNAL = '#1a5276'    # 内部開発（濃い青）
C_EXTERNAL = '#e67e22'    # 外部開発（オレンジ）
C_CRITICAL = '#5dade2'    # クリティカルパス（水色）
C_MILESTONE = '#e67e22'   # マイルストーン（オレンジ）
C_BG = '#fafafa'
C_GRID = '#e0e0e0'
C_HEADER_BG = '#2c3e50'
C_HEADER_TEXT = 'white'

# --- 時間軸定義 ---
# FY26: 月単位 (4-3月) = 12列, FY27: 四半期 = 4列, FY28: 四半期 = 4列
# 各月 = 1単位, 各四半期 = 3単位（月と同じスケール）
# Total: 12 + 12 + 12 = 36単位

def month_x(month):
    """FY26の月→x座標 (4月=0, 3月=11)"""
    if month >= 4:
        return month - 4
    else:
        return month + 8

def fy27_q(q):
    """FY27の四半期→x座標 (1Q=12, 2Q=15, 3Q=18, 4Q=21)"""
    return 12 + (q - 1) * 3

def fy28_q(q):
    """FY28の四半期→x座標 (1Q=24, 2Q=27, 3Q=30, 4Q=33)"""
    return 24 + (q - 1) * 3

# --- スイムレーン定義 ---
lanes = [
    'マイルストーン',
    'RoboSync\n× VLA',
    'DataOps',
    'Agent\nOperation',
    'Field PoC',
    'Responsible\nAI',
]
n_lanes = len(lanes)
lane_height = 1.8
total_height = n_lanes * lane_height

# --- 図の作成 ---
fig, ax = plt.subplots(1, 1, figsize=(20, 9))
ax.set_xlim(-0.5, 36.5)
ax.set_ylim(-0.5, total_height + 2.0)
ax.set_facecolor(C_BG)
fig.set_facecolor('white')
ax.axis('off')

# --- ヘッダー（時間軸） ---
header_y = total_height + 0.3

# FY年度ヘッダー
for label, x_start, x_end in [('FY26', 0, 12), ('FY27', 12, 24), ('FY28', 24, 36)]:
    rect = mpatches.FancyBboxPatch((x_start, header_y + 0.7), x_end - x_start, 0.6,
                                    boxstyle="round,pad=0.05", facecolor=C_HEADER_BG, edgecolor='none')
    ax.add_patch(rect)
    ax.text((x_start + x_end) / 2, header_y + 1.0, label,
            ha='center', va='center', fontsize=11, fontweight='bold', color=C_HEADER_TEXT)

# 月/四半期ヘッダー
# FY26: 月
fy26_months = [4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3]
for i, m in enumerate(fy26_months):
    rect = mpatches.FancyBboxPatch((i, header_y), 1, 0.55,
                                    boxstyle="round,pad=0.02", facecolor='#d5dbdb', edgecolor='#bdc3c7')
    ax.add_patch(rect)
    ax.text(i + 0.5, header_y + 0.27, str(m),
            ha='center', va='center', fontsize=8, color='#2c3e50')

# FY27: 四半期
for q in range(1, 5):
    x = fy27_q(q)
    rect = mpatches.FancyBboxPatch((x, header_y), 3, 0.55,
                                    boxstyle="round,pad=0.02", facecolor='#d5dbdb', edgecolor='#bdc3c7')
    ax.add_patch(rect)
    ax.text(x + 1.5, header_y + 0.27, f'{q}Q',
            ha='center', va='center', fontsize=8, color='#2c3e50')

# FY28: 四半期
for q in range(1, 5):
    x = fy28_q(q)
    rect = mpatches.FancyBboxPatch((x, header_y), 3, 0.55,
                                    boxstyle="round,pad=0.02", facecolor='#d5dbdb', edgecolor='#bdc3c7')
    ax.add_patch(rect)
    ax.text(x + 1.5, header_y + 0.27, f'{q}Q',
            ha='center', va='center', fontsize=8, color='#2c3e50')

# --- スイムレーン背景 ---
for i, lane in enumerate(lanes):
    y = total_height - (i + 1) * lane_height
    # 交互の背景色
    bg = '#ffffff' if i % 2 == 0 else '#f7f9f9'
    rect = mpatches.Rectangle((-0.5, y), 37, lane_height, facecolor=bg, edgecolor=C_GRID, linewidth=0.5)
    ax.add_patch(rect)
    # レーン名
    ax.text(-0.3, y + lane_height / 2, lane,
            ha='right', va='center', fontsize=9, fontweight='bold', color='#2c3e50')

# --- グリッド線 ---
for x in range(37):
    lw = 0.8 if x in [0, 12, 24, 36] else 0.2
    color = '#95a5a6' if x in [0, 12, 24, 36] else C_GRID
    ax.axvline(x, ymin=0, ymax=total_height / (total_height + 2.5), color=color, linewidth=lw, zorder=0)

# --- ヘルパー関数 ---
def draw_bar(x_start, x_end, lane_idx, label, color=C_INTERNAL, y_offset=0):
    """タスクバーを描画"""
    y = total_height - (lane_idx + 1) * lane_height + lane_height / 2 + y_offset
    bar_h = 0.35
    # バー本体
    rect = mpatches.FancyBboxPatch((x_start, y - bar_h / 2), x_end - x_start, bar_h,
                                    boxstyle="round,pad=0.08", facecolor=color, edgecolor='none', alpha=0.85)
    ax.add_patch(rect)
    # 矢印（終端）
    ax.annotate('', xy=(x_end, y), xytext=(x_end - 0.3, y),
                arrowprops=dict(arrowstyle='->', color=color, lw=1.5))
    # ラベル
    mid_x = (x_start + x_end) / 2
    ax.text(mid_x, y, label, ha='center', va='center', fontsize=6.5,
            color='white', fontweight='bold', zorder=10)

def draw_dashed_bar(x_start, x_end, lane_idx, label, color=C_CRITICAL, y_offset=0):
    """点線バーを描画"""
    y = total_height - (lane_idx + 1) * lane_height + lane_height / 2 + y_offset
    ax.plot([x_start, x_end], [y, y], color=color, linewidth=2.5, linestyle='--', alpha=0.7)
    ax.annotate('', xy=(x_end, y), xytext=(x_end - 0.3, y),
                arrowprops=dict(arrowstyle='->', color=color, lw=1.5, linestyle='--'))
    mid_x = (x_start + x_end) / 2
    ax.text(mid_x, y + 0.2, label, ha='center', va='bottom', fontsize=6.5,
            color=color, fontweight='bold')

def draw_milestone(x, lane_idx, label, y_extra=0):
    """マイルストーン三角形を描画"""
    y = total_height - (lane_idx + 1) * lane_height + lane_height / 2 + y_extra
    ax.plot(x, y, marker='^', markersize=14, color=C_MILESTONE, zorder=10)
    ax.text(x, y + 0.35, label, ha='center', va='bottom', fontsize=7,
            color=C_MILESTONE, fontweight='bold')

# ==========================================
# 行0: マイルストーン
# ==========================================
draw_milestone(month_x(9) + 0.5, 0, 'α版\n(CA)', y_extra=0.15)
draw_milestone(month_x(3) + 0.5, 0, 'β版', y_extra=0.15)
draw_milestone(fy27_q(1) + 1.5, 0, 'アンカー\n顧客確定', y_extra=-0.3)
draw_milestone(fy27_q(2) + 1.5, 0, 'CA', y_extra=0.15)
draw_milestone(fy27_q(4) + 1.5, 0, 'GA', y_extra=0.15)
# V2.0 (dashed)
ax.text(fy28_q(2) + 1.5, total_height - lane_height / 2 + 0.15, 'V2.0',
        ha='center', va='center', fontsize=9, color=C_CRITICAL, fontstyle='italic', fontweight='bold')

# ==========================================
# 行1: RoboSync × VLA
# ==========================================
draw_bar(month_x(4), month_x(6) + 1, 1, 'IF定義・合意', C_INTERNAL, y_offset=0.35)
draw_bar(month_x(6), month_x(9) + 1, 1, 'VLAスキル実装・統合', C_INTERNAL, y_offset=0.35)
draw_bar(month_x(9), month_x(12) + 1, 1, '現場VLA・双腕導入', C_INTERNAL, y_offset=-0.15)
draw_bar(month_x(12), month_x(3) + 1, 1, 'β版統合テスト', C_INTERNAL, y_offset=-0.15)
draw_bar(fy27_q(1), fy27_q(2) + 3, 1, '安定化・多品種', C_INTERNAL, y_offset=0.35)
draw_bar(fy27_q(3), fy27_q(4) + 3, 1, '商用品質化・QMS', C_EXTERNAL, y_offset=-0.15)
draw_dashed_bar(fy28_q(1), fy28_q(4) + 3, 1, 'V2.0 機能拡張', C_CRITICAL, y_offset=0.35)

# ==========================================
# 行2: DataOps
# ==========================================
draw_bar(month_x(4), month_x(6) + 1, 2, 'スキーマ定義・PL検証', C_INTERNAL, y_offset=0.35)
draw_bar(month_x(7), month_x(9) + 1, 2, 'ログ変換・クラウド蓄積', C_INTERNAL, y_offset=0.35)
draw_bar(month_x(10), month_x(12) + 1, 2, 'FT→再デプロイ', C_INTERNAL, y_offset=-0.15)
draw_bar(month_x(1), month_x(3) + 1, 2, '改善サイクル検証', C_INTERNAL, y_offset=-0.15)
draw_bar(fy27_q(1), fy27_q(2) + 3, 2, 'スケーラブル学習基盤', C_INTERNAL, y_offset=0.35)
draw_bar(fy27_q(3), fy27_q(4) + 3, 2, '商用データPL', C_EXTERNAL, y_offset=-0.15)

# ==========================================
# 行3: Agent Operation
# ==========================================
draw_bar(month_x(4), month_x(6) + 1, 3, '基本設計・失敗パターン', C_INTERNAL, y_offset=0.35)
draw_bar(month_x(7), month_x(9) + 1, 3, 'スキル切替詳細設計', C_INTERNAL, y_offset=0.35)
draw_bar(month_x(10), month_x(12) + 1, 3, 'Agentic制御開発', C_INTERNAL, y_offset=-0.15)
draw_bar(month_x(1), month_x(3) + 1, 3, 'サイクル検証・テレオペ', C_INTERNAL, y_offset=-0.15)
draw_bar(fy27_q(1), fy27_q(2) + 3, 3, 'リカバリー高度化', C_INTERNAL, y_offset=0.35)
draw_dashed_bar(fy27_q(3), fy27_q(4) + 3, 3, '学習ベース最適化', C_CRITICAL, y_offset=-0.15)

# ==========================================
# 行4: Field PoC
# ==========================================
draw_bar(month_x(4), month_x(6) + 1, 4, 'タスク特定・合意', C_INTERNAL, y_offset=0.35)
draw_bar(month_x(7), month_x(9) + 1, 4, '計画書・機材準備', C_INTERNAL, y_offset=0.35)
draw_bar(month_x(10), month_x(12) + 1, 4, '社内PoC実施', C_INTERNAL, y_offset=-0.15)
draw_bar(month_x(1), month_x(3) + 1, 4, '結果レポート・判定', C_INTERNAL, y_offset=-0.15)
draw_bar(fy27_q(1), fy27_q(3) + 3, 4, '顧客PoC・フィードバック', C_EXTERNAL, y_offset=0.35)
draw_bar(fy27_q(4), fy27_q(4) + 3, 4, 'GA判定', C_EXTERNAL, y_offset=-0.15)

# ==========================================
# 行5: Responsible AI
# ==========================================
draw_bar(month_x(4), month_x(9) + 1, 5, 'Microsoft WS・AI倫理方針', C_INTERNAL, y_offset=0.35)
draw_bar(month_x(10), month_x(3) + 1, 5, 'OSSライセンス・リスク整理', C_INTERNAL, y_offset=-0.15)
draw_bar(fy27_q(1), fy27_q(4) + 3, 5, '安全要件文書化・監査対応', C_EXTERNAL, y_offset=0.1)

# --- 凡例 ---
legend_y = -0.3
legend_items = [
    (C_INTERNAL, '━━', '内部開発'),
    (C_EXTERNAL, '━━', '外部開発 / 事業部連携'),
    (C_CRITICAL, '┈┈', 'クリティカルパス'),
]
x_legend = 0
for color, style, label in legend_items:
    ax.plot([x_legend, x_legend + 1.5], [legend_y, legend_y], color=color,
            linewidth=3, linestyle='--' if 'クリティカル' in label else '-')
    ax.text(x_legend + 1.8, legend_y, label, va='center', fontsize=8, color='#2c3e50')
    x_legend += 7

# マイルストーン凡例
ax.plot(x_legend + 0.5, legend_y, marker='^', markersize=10, color=C_MILESTONE)
ax.text(x_legend + 1.2, legend_y, 'マイルストーン', va='center', fontsize=8, color='#2c3e50')

# --- タイトル ---
ax.text(18, total_height + 2.2, 'RFA FY26-28 ロードマップ',
        ha='center', va='center', fontsize=14, fontweight='bold', color='#2c3e50')

plt.tight_layout()
plt.savefig('Projects/rfa/gantt-chart.png', dpi=200, bbox_inches='tight', facecolor='white')
print("✅ 保存: Projects/rfa/gantt-chart.png")
plt.close()

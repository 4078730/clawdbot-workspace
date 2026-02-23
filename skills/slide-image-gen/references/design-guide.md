# Design Guide — Corporate Slide Visuals

## Color System

| Role | Hex | Usage |
|---|---|---|
| Background | `#FFFFFF` | Always white. Never dark backgrounds. |
| Primary / Navy | `#000E4E` | Main elements, headers, borders, body text labels |
| Accent / Cyan | `#00B7F1` | Highlights, key arrows, callouts, differentiators |
| Light Gray | `#F5F5F5` | Alternating rows, subtle fills |
| Grid / Axis | `#CCCCCC` | Chart gridlines, dividers |
| White text | `#FFFFFF` | Text on navy backgrounds only |

**Never use**: gradients, drop shadows, decorative textures, or colors outside this palette.

## Typography Guidelines

- Font style: sans-serif (instruct model: "clean sans-serif, Helvetica-style")
- Label hierarchy:
  - Section headers → bold, navy, larger
  - Body labels → regular, navy, smaller
  - Accent labels → cyan, used sparingly for emphasis
- All text must be legible at 1920×1080 projection

## Layout Principles (from PaperBanana framework)

1. **Information hierarchy first**: Determine primary vs. secondary information before placing elements
2. **Directional reading**: Left-to-right or top-to-bottom; never diagonal for primary flows
3. **Whitespace**: Generous margins. Do not fill the frame completely.
4. **Consistency**: Same box sizes, same arrow styles throughout a figure
5. **Minimal**: Remove any element that does not carry information

## Audience-Specific Adjustments

| Audience | Adjustment |
|---|---|
| Executives | Fewer elements, larger text, single key message per figure |
| Project members | Technical detail OK, include all components and connections |
| All employees | Use analogies and familiar metaphors; avoid jargon in labels |

## Self-Critique Rubric (PaperBanana-inspired)

Rate each dimension 1–5 after generation:

| Dimension | What to check |
|---|---|
| **Faithfulness** | Does the figure accurately represent the described content? |
| **Conciseness** | Are there extraneous elements that could be removed? |
| **Readability** | Are all labels clear and legible at slide scale? |
| **Aesthetics** | Is the color usage consistent with the spec? Does it look professional? |
| **Message clarity** | Does a viewer immediately understand the key message? |

Regenerate if any dimension scores ≤ 2.

## Edit Mode (Consistency Across Slides)

When generating multiple figures for the same deck:
1. Generate the first figure
2. For subsequent figures, pass the first figure as `-i` reference input
3. Instruct the model to "maintain the same color scheme, font style, and layout density as the reference image"

```bash
uv run $NANO_BANANA_DIR/scripts/generate_image.py \
  --prompt "<prompt> Maintain same style as reference image." \
  --filename "$(date +%Y-%m-%d-%H-%M-%S)-fig2.png" \
  -i "./first-figure.png" \
  --resolution 2K
```

---
name: slide-image-gen
description: Generate business presentation images via Nano Banana Pro (Gemini image generation), optimized for internal company slides. Corporate design spec — white background, primary #000E4E (navy), accent #00B7F1 (cyan) — targeting executives, project members, and employees. Use when: creating diagrams, flowcharts, architecture figures, comparison visuals, or statistical charts for slides or documents. Based on PaperBanana (arXiv:2601.23265) — plan content → optimize prompt → generate → self-critique. NOT for: photos, illustrations, or non-slide creative images.
---

# slide-image-gen

Generate corporate slide visuals using a 4-phase workflow inspired by PaperBanana (arXiv:2601.23265).

## Design Spec (always apply)

| Token | Value |
|---|---|
| Background | `#FFFFFF` white |
| Primary | `#000E4E` navy |
| Accent | `#00B7F1` cyan |
| Font style | Sans-serif, clean, minimal |
| Tone | Academic, logical, information-dense |
| Audience | Executives / project members / employees |

## Workflow (4 phases)

### Phase 1 — Content Plan
Identify from the user's request:
- **Figure type**: flowchart / architecture / comparison / timeline / data chart / concept diagram
- **Key message**: one sentence the image must communicate
- **Components**: list of elements to include (boxes, arrows, labels, layers, etc.)
- **Hierarchy**: primary vs. secondary information

### Phase 2 — Prompt Construction
Build the prompt following this template (adapt per figure type):

```
[FIGURE TYPE] diagram on white background (#FFFFFF).
Use navy (#000E4E) for primary elements, borders, and text.
Use cyan (#00B7F1) as accent for highlights, arrows, and key labels.
Minimal, clean, academic style. No decorative elements.

Content: [KEY MESSAGE]
Include: [COMPONENT LIST]
Layout: [LEFT-TO-RIGHT / TOP-TO-BOTTOM / GRID / RADIAL]
Label all elements clearly in English (or Japanese if specified).
High contrast, presentation-ready.
```

See `references/prompt-patterns.md` for figure-type-specific templates.

### Phase 3 — Generate
Use Nano Banana Pro:

```bash
NANO_BANANA_DIR=~/.nvm/versions/node/v24.13.0/lib/node_modules/openclaw/skills/nano-banana-pro
uv run $NANO_BANANA_DIR/scripts/generate_image.py \
  --prompt "<constructed prompt>" \
  --filename "$(date +%Y-%m-%d-%H-%M-%S)-<slug>.png" \
  --resolution 2K
```

Default resolution: `2K` for slides. Use `1K` for quick drafts.
Output directory defaults to current working directory unless `--output-dir` is specified.

### Phase 4 — Self-Critique
After generation, verify against this checklist:
- [ ] Background is white
- [ ] Navy (#000E4E) used for primary elements
- [ ] Cyan (#00B7F1) used for accents/highlights
- [ ] All labels are legible
- [ ] Key message is immediately clear
- [ ] No cluttered or extraneous elements
- [ ] Suitable for projection (high contrast)

If any item fails, regenerate with an adjusted prompt. State which criterion failed and what was changed.

## Notes
- Prefer English labels unless the user specifies Japanese
- When the user provides existing slide images as context, use `-i` flag (edit mode) to maintain visual consistency
- For multi-figure consistency, reuse the same prompt structure across figures
- See `references/design-guide.md` for extended color/layout guidelines

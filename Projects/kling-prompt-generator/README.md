# 🎬 Kling Prompt Generator

Upload a video, analyze its motion with **Google Gemini 2.5 Pro**, and generate optimized prompts for **Kling AI** video generation.

## Features

- **Drag & Drop** video upload (MP4, WebM, MOV — up to 100 MB)
- **Gemini-powered analysis** — extracts character motion, camera work, effects, expressions, and environment
- **Kling AI optimization** — one-click prompt refinement tuned for Kling's engine
- **Live editing** — edit the generated prompt in a code-style textarea
- **Copy to clipboard** — instant copy for pasting into Kling AI
- **Session history** — browse and reload past prompts within the session
- **Dark modern UI** — responsive two-panel layout

## Quick Start

### Prerequisites

- **Node.js 18+**
- A **Google Gemini API key** with access to `gemini-2.5-pro`

### Setup

```bash
# Clone / navigate to the project
cd kling-prompt-generator

# Install dependencies
npm install

# Create your .env file
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY

# Start the server
npm start
```

The app will be available at **http://localhost:3000**.

## Configuration

| Variable | Default | Description |
|---|---|---|
| `GEMINI_API_KEY` | — | Google Gemini API key (required) |
| `PORT` | `3000` | Server port |

## Architecture

```
kling-prompt-generator/
├── server.js          # Express backend + Gemini API integration
├── public/
│   ├── index.html     # Single-page frontend
│   ├── style.css      # Dark theme styles
│   └── app.js         # Frontend logic
├── uploads/           # Temporary video storage (gitignored)
├── package.json
├── .env.example
└── README.md
```

### API Endpoints

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/analyze` | Upload video → Gemini analysis → prompt |
| `POST` | `/api/optimize` | Rewrite prompt optimized for Kling AI |

## How It Works

1. **Upload**: Video is saved locally and uploaded to Gemini's File API
2. **Analyze**: Gemini 2.5 Pro processes the video with a specialized system prompt covering motion, camera work, effects, expressions, and environment
3. **Generate**: Returns a cohesive English prompt ready for Kling AI
4. **Optimize** (optional): Further refines the prompt with Kling-specific phrasing

## License

MIT

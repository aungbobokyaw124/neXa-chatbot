# neXa AI

**Build Faster. Create Smarter.**

A premium, mobile-first AI chat application powered by Google Gemini, built on Cloudflare Workers.

---

## Features

- Clean, responsive dark-mode UI (mobile-first)
- Powered by Google Gemini 1.5 Flash
- Secure API key handling via Cloudflare secrets
- Full local chat history (localStorage)
- Markdown rendering with code blocks
- Search across all conversations
- Light / dark theme toggle
- Zero dependencies on the frontend — pure HTML, CSS, ES Modules
- Deployable on Cloudflare Pages + Workers

---

## Project structure

```
neXa-ai/
│
├── frontend/               ← Static frontend (deploy to Pages)
│   ├── index.html
│   ├── assets/
│   │   └── logo.svg
│   ├── css/
│   │   ├── reset.css
│   │   ├── theme.css
│   │   └── app.css
│   └── js/
│       ├── app.js          ← Main orchestrator
│       ├── chat.js         ← API communication
│       ├── storage.js      ← localStorage management
│       └── ui.js           ← Rendering + markdown
│
├── worker/                 ← Cloudflare Worker backend
│   ├── src/
│   │   └── index.js        ← Worker entry point
│   ├── package.json
│   └── wrangler.jsonc      ← Wrangler configuration
│
├── docs/
│   └── ARCHITECTURE.md     ← Full technical documentation
│
├── .gitignore
├── README.md
└── LICENSE
```

---

## Quick start

### Prerequisites

- Node.js 18+
- A [Cloudflare account](https://dash.cloudflare.com/sign-up) (free)
- A [Google Gemini API key](https://aistudio.google.com/app/apikey) (free tier available)

---

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/neXa-ai.git
cd neXa-ai
```

---

### 2. Install Wrangler

```bash
npm install -g wrangler
wrangler login
```

---

### 3. Add your Gemini API key as a secret

> **Never** put your API key in any file. Use Wrangler secrets.

```bash
cd worker
npm install
wrangler secret put GEMINI_API_KEY
```

When prompted, paste your Gemini API key. It is stored securely in Cloudflare and never in your code or repository.

---

### 4. Configure allowed origins (production)

Open `worker/wrangler.jsonc` and set `ALLOWED_ORIGINS` to your frontend domain:

```jsonc
"vars": {
  "ALLOWED_ORIGINS": "https://your-nexa-app.pages.dev",
  "ENVIRONMENT": "production"
}
```

Leave `ALLOWED_ORIGINS` empty during local development.

---

### 5. Deploy the Worker

```bash
cd worker
npm run deploy
```

Note the Worker URL — you'll need it if you're not using Cloudflare Pages.

---

### 6. Deploy the frontend

**Option A — Cloudflare Pages (recommended)**

1. Push this repository to GitHub
2. Go to [Cloudflare Pages](https://pages.cloudflare.com/) → Create a project
3. Connect your GitHub repository
4. Set build settings:
   - **Build command:** *(leave empty — no build step)*
   - **Build output directory:** `frontend`
5. Deploy

Then, configure the `/api/*` path to proxy to your Worker:
- Pages → Settings → Functions → Add route: `/api/*` → your Worker

**Option B — Separate static host**

Host `frontend/` on any static server (Netlify, GitHub Pages, Vercel, etc.).

Update `API_URL` in `frontend/js/chat.js`:

```javascript
const API_URL = 'https://nexa-worker.your-subdomain.workers.dev/api/chat';
```

---

### 7. Local development

```bash
# Terminal 1 — run Worker locally
cd worker
npm run dev
# Worker runs at http://localhost:8787

# Terminal 2 — serve frontend
cd frontend
npx serve .
# Frontend at http://localhost:3000 (or whichever port serve uses)
```

For local dev, temporarily update `API_URL` in `frontend/js/chat.js`:

```javascript
const API_URL = 'http://localhost:8787/api/chat';
```

> Remember to revert this before deploying.

---

## Optional: Cloudflare AI Gateway

AI Gateway adds logging, caching, cost tracking, and rate limiting.

1. Go to Cloudflare Dashboard → AI → AI Gateway → Create gateway
2. Add to `worker/wrangler.jsonc` vars:

```jsonc
"AI_GATEWAY_URL": "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_name}/google-ai-studio"
```

The Worker automatically uses the Gateway when this variable is set.

---

## Security

| Risk | Mitigation |
|------|-----------|
| API key exposure | Stored as Cloudflare secret — never in code or repository |
| XSS via AI output | All markdown is HTML-escaped before rendering |
| Malformed requests | Server-side validation in Worker before Gemini call |
| Cross-origin abuse | CORS restricted to `ALLOWED_ORIGINS` in production |
| Secret in git history | `.gitignore` excludes all `.env*` and `.dev.vars` files |

---

## Keyboard shortcuts

| Shortcut | Action |
|----------|--------|
| `Enter` | Send message |
| `Shift + Enter` | New line in composer |
| `Ctrl/Cmd + K` | Open search |
| `Ctrl/Cmd + N` | New chat |
| `Escape` | Close modals / sidebar |

---

## Environment variables reference

Set these in `worker/wrangler.jsonc` under `"vars"`:

| Variable | Default | Description |
|----------|---------|-------------|
| `ALLOWED_ORIGINS` | `""` | Comma-separated allowed origins. Empty = allow all. |
| `AI_GATEWAY_URL` | *(unset)* | Cloudflare AI Gateway base URL (optional) |
| `ENVIRONMENT` | `"development"` | Set to `"production"` when live |

Set these as Wrangler secrets (`wrangler secret put NAME`):

| Secret | Description |
|--------|-------------|
| `GEMINI_API_KEY` | Your Google Gemini API key — **never put this in any file** |

---

## License

MIT License — see `LICENSE` for details.

---

Built by Aung Bo Bo Kyaw · neXa · 2024

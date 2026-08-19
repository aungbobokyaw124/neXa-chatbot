# neXa AI — Architecture

## Overview

neXa AI is a single-page AI chat application. The architecture is intentionally simple and maintainable.

```
Browser (Frontend)
       │
       │  POST /api/chat
       ▼
Cloudflare Worker (Backend)
       │
       │  HTTPS + API Key (secret)
       ▼
Google Gemini API
```

---

## Frontend

**Location:** `frontend/`

| File | Purpose |
|------|---------|
| `index.html` | App shell — preloader, sidebar, chat, modals |
| `css/reset.css` | Minimal CSS reset |
| `css/theme.css` | CSS custom properties (design tokens) |
| `css/app.css` | All component styles |
| `js/app.js` | Main orchestrator — state, events, routing |
| `js/chat.js` | Worker API calls + validation |
| `js/storage.js` | localStorage CRUD for conversations + settings |
| `js/ui.js` | DOM rendering, markdown parser, toasts |
| `assets/logo.svg` | neXa wordmark |

### State management

All state lives in:
- **`localStorage`** — conversation history, settings
- **In-memory JS object** — current session state (`currentConvId`, `isLoading`)

No framework. No build step. Pure ES Modules loaded by the browser.

### Markdown rendering

A custom XSS-safe parser in `ui.js → parseMarkdown()`:

1. Extracts code blocks → stash tokens (prevents double-parsing)
2. Extracts inline code → stash
3. Extracts links → stash (preserves URL integrity before escaping)
4. Escapes remaining HTML characters
5. Applies heading, bold, italic, list transforms
6. Wraps paragraphs
7. Restores stashed HTML fragments

### Security (frontend)

- No API key in any frontend file
- `textContent` used for user-controlled content
- `innerHTML` only used for sanitized markdown output
- `escapeHTML()` applied before any injection

---

## Backend (Cloudflare Worker)

**Location:** `worker/`

### Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/chat` | Send messages, receive AI reply |
| `GET`  | `/health` | Health check |
| `OPTIONS` | `*` | CORS preflight |

### Request format

```json
{
  "messages": [
    { "role": "user",      "content": "Hello" },
    { "role": "assistant", "content": "Hi! How can I help?" },
    { "role": "user",      "content": "Tell me about JavaScript" }
  ]
}
```

### Response format

**Success:**
```json
{ "success": true, "message": "JavaScript is..." }
```

**Error:**
```json
{ "success": false, "error": "Unable to contact AI service." }
```

### Validation (server-side)

- `messages` must be a non-empty array
- Max 50 messages per request
- Each message: valid `role` (`user` | `assistant`), non-empty string `content`
- Max 8,000 characters per message content
- Last message must be from `user`

### CORS

Configured via `ALLOWED_ORIGINS` env var:
- **Unset** → allow all origins (development mode)
- **Set** → only allow listed origins (production mode)

### Secrets

| Name | How to set | Description |
|------|-----------|-------------|
| `GEMINI_API_KEY` | `wrangler secret put GEMINI_API_KEY` | Google Gemini API key |

### Optional env vars

| Name | Description |
|------|-------------|
| `ALLOWED_ORIGINS` | Comma-separated allowed origins |
| `AI_GATEWAY_URL` | Cloudflare AI Gateway base URL |
| `ENVIRONMENT` | `development` or `production` |

---

## Data flow

```
1. User types message → composer
2. app.js validates input (client-side, UX only)
3. Saves user message to localStorage
4. POST /api/chat with full conversation history
5. Worker validates request
6. Worker calls Gemini REST API
7. Worker returns { success, message }
8. Frontend renders assistant reply (with markdown)
9. Saves assistant reply to localStorage
10. User can continue chatting
```

---

## Deployment

### Option A — Cloudflare Pages + Worker (recommended)

The frontend is served as a Cloudflare Pages site. The Worker is deployed separately and proxied via Pages Functions or a custom route.

1. Push `frontend/` to GitHub
2. Connect repo to Cloudflare Pages
3. Deploy Worker: `cd worker && npm run deploy`
4. Configure `/api/*` route in Pages to proxy to Worker
5. Set `ALLOWED_ORIGINS` to your Pages domain

### Option B — Worker serves static files

The Worker can serve frontend files directly from Workers Static Assets (KV-based). Not covered in this config but supported.

### Option C — Separate hosting

Frontend hosted on any static host (Netlify, Vercel, GitHub Pages).
Worker deployed independently.
Update `API_URL` constant in `frontend/js/chat.js` to your Worker URL.
Set `ALLOWED_ORIGINS` to your frontend domain.

---

## Local development

```bash
# Install Wrangler
npm install -g wrangler

# Set your Gemini API key (stored securely by Wrangler)
cd worker
wrangler secret put GEMINI_API_KEY

# Run Worker locally (port 8787)
npm run dev

# Serve frontend (use any static server, e.g.:)
cd ../frontend
npx serve .

# Update API_URL in frontend/js/chat.js to:
# const API_URL = 'http://localhost:8787/api/chat';
```

---

## AI Gateway (optional)

Cloudflare AI Gateway provides:
- Request logging
- Caching
- Rate limiting
- Cost monitoring

To enable:

1. Create a Gateway in your Cloudflare dashboard
2. Add to `worker/wrangler.jsonc` vars:
   ```jsonc
   "AI_GATEWAY_URL": "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_name}/google-ai-studio"
   ```
3. The Worker automatically switches to Gateway mode when this var is present

---

## Security checklist

- [x] API key stored as Cloudflare secret (never in code)
- [x] API key never sent to frontend
- [x] Server-side input validation
- [x] HTML escaped before rendering
- [x] CORS restricted to known origins in production
- [x] No secrets in `.gitignore`-excluded files committed
- [x] Error messages sanitized (no stack traces exposed)
- [x] Safety filters enabled on Gemini API

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

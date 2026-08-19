# neXa AI Chatbot

**Build Faster. Create Smarter.**

Premium mobile-first AI chatbot powered by Gemini through a Cloudflare Worker.

## Structure

- `frontend/` — web application UI
- `worker/` — Cloudflare Worker API
- `docs/` — architecture and project documentation

## Security

Never put `GEMINI_API_KEY` in frontend code or commit it to GitHub.

## Worker setup

From `worker/`:

```bash
npm install
npx wrangler secret put GEMINI_API_KEY
npm run dev
```

Gemini API integration is intentionally left as the next implementation step.

# neXa AI Architecture

## Overview

neXa AI uses a mobile-first static frontend and a Cloudflare Worker backend.

```text
Browser
  -> neXa Frontend
  -> /api/chat
  -> Cloudflare Worker
  -> Gemini API
  -> Cloudflare Worker
  -> Browser
```

## Frontend

The frontend contains the UI, chat client, local chat storage, theme, and preloader.

## Backend

The Worker is responsible for API validation, Gemini communication, CORS/security controls, and server-side secrets.

`GEMINI_API_KEY` must remain a Cloudflare Worker secret and must never be committed to GitHub.

## Future modules

- Gemini API integration
- Streaming responses
- Rate limiting
- Cloudflare AI Gateway
- Authentication
- Persistent database storage

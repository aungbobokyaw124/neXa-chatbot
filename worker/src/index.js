export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/chat' && request.method === 'POST') {
      if (!env.GEMINI_API_KEY) {
        return json({ success: false, error: 'AI service is not configured.' }, 500);
      }

      try {
        const body = await request.json();
        if (!Array.isArray(body.messages) || body.messages.length === 0) {
          return json({ success: false, error: 'Messages are required.' }, 400);
        }

        // Gemini integration will be connected here.
        return json({ success: false, error: 'Gemini integration is not configured yet.' }, 501);
      } catch {
        return json({ success: false, error: 'Invalid request.' }, 400);
      }
    }

    return new Response('neXa AI Worker', { status: 200 });
  }
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

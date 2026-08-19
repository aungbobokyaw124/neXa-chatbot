/**
 * neXa AI — Chat API Module
 * Handles communication with the Cloudflare Worker backend.
 *
 * CONFIGURATION:
 * Change API_URL below if your Worker is deployed at a separate domain.
 * For Cloudflare Pages (recommended), leave as '/api/chat'.
 */

const API_URL         = '/api/chat';
const REQUEST_TIMEOUT = 30_000; // 30 seconds
const MAX_MSG_LENGTH  = 4000;
const MAX_HISTORY     = 30;     // Max messages sent per request

// ─── Custom Error ────────────────────────────────────────────

export class ChatError extends Error {
  /**
   * @param {string} message - User-facing message
   * @param {number|null} status - HTTP status code if available
   * @param {boolean} retryable - Whether the user can retry
   */
  constructor(message, status = null, retryable = true) {
    super(message);
    this.name      = 'ChatError';
    this.status    = status;
    this.retryable = retryable;
  }
}

// ─── Validation ──────────────────────────────────────────────

/**
 * Validates a user message before sending.
 * @param {string} content
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateMessage(content) {
  if (!content || typeof content !== 'string') {
    return { valid: false, error: 'Message cannot be empty.' };
  }
  const trimmed = content.trim();
  if (trimmed.length === 0) {
    return { valid: false, error: 'Message cannot be empty.' };
  }
  if (trimmed.length > MAX_MSG_LENGTH) {
    return {
      valid: false,
      error: `Message is too long (${trimmed.length}/${MAX_MSG_LENGTH} characters).`,
    };
  }
  return { valid: true };
}

// ─── Message Formatting ──────────────────────────────────────

/**
 * Strips internal fields, keeps only role + content.
 * Limits history to prevent large payloads.
 * @param {Array<{role: string, content: string}>} messages
 * @returns {Array<{role: string, content: string}>}
 */
export function formatMessagesForAPI(messages) {
  return messages
    .slice(-MAX_HISTORY)
    .map(({ role, content }) => ({ role, content }));
}

// ─── API Call ────────────────────────────────────────────────

/**
 * Sends a conversation to the Worker and returns the AI reply.
 * @param {Array<{role: string, content: string}>} messages
 * @returns {Promise<string>} The assistant's reply text
 * @throws {ChatError}
 */
export async function sendMessage(messages) {
  const controller = new AbortController();
  const timer      = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  let response;

  try {
    response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: formatMessagesForAPI(messages) }),
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timer);

    if (err.name === 'AbortError') {
      throw new ChatError('Request timed out. Please try again.', null, true);
    }

    if (!navigator.onLine) {
      throw new ChatError('No internet connection. Check your network and try again.', null, true);
    }

    throw new ChatError('Could not reach neXa AI. Please try again.', null, true);
  }

  clearTimeout(timer);

  // Parse body regardless of status (error details live in JSON)
  let data;
  try {
    data = await response.json();
  } catch {
    throw new ChatError(
      `Unexpected response from server (${response.status}).`,
      response.status,
      response.status >= 500,
    );
  }

  if (!response.ok || !data.success) {
    const msg = data?.error ?? 'An unexpected error occurred.';

    if (response.status === 401 || response.status === 403) {
      throw new ChatError('AI service authentication failed. Contact support.', response.status, false);
    }
    if (response.status === 429) {
      throw new ChatError('Too many requests. Please wait a moment and try again.', 429, true);
    }
    if (response.status === 503) {
      throw new ChatError('AI service is temporarily unavailable. Try again shortly.', 503, true);
    }
    if (response.status >= 500) {
      throw new ChatError('Server error. Please try again.', response.status, true);
    }

    throw new ChatError(msg, response.status, false);
  }

  if (!data.message || typeof data.message !== 'string') {
    throw new ChatError('Received an empty response. Please try again.', null, true);
  }

  return data.message;
}

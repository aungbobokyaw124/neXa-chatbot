/**
 * neXa AI — Storage Module
 * Manages conversations and settings in localStorage
 */

const CONVERSATIONS_KEY = 'nexa_conversations';
const SETTINGS_KEY      = 'nexa_settings';
const MAX_CONVERSATIONS  = 50;  // Prune oldest after this limit
const MAX_TITLE_LENGTH   = 42;

// ─── Helpers ────────────────────────────────────────────────

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    // Possible QuotaExceededError
    console.error('[neXa Storage] Write failed:', err.message);
    return false;
  }
}

// ─── ID Generation ──────────────────────────────────────────

export function generateId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

export function generateMessageId() {
  return `msg-${generateId()}`;
}

// ─── Title Generation ────────────────────────────────────────

export function generateTitle(firstUserMessage) {
  const clean = firstUserMessage.trim().replace(/\s+/g, ' ');
  if (clean.length <= MAX_TITLE_LENGTH) return clean;
  return clean.slice(0, MAX_TITLE_LENGTH).trimEnd() + '…';
}

// ─── Conversations ───────────────────────────────────────────

/**
 * Returns all conversations, newest first.
 * @returns {Array<Conversation>}
 */
export function getAllConversations() {
  return readJSON(CONVERSATIONS_KEY, []);
}

/**
 * Returns a single conversation by ID, or null.
 * @param {string} id
 * @returns {Conversation|null}
 */
export function getConversation(id) {
  const all = getAllConversations();
  return all.find(c => c.id === id) ?? null;
}

/**
 * Saves (insert or update) a conversation.
 * @param {Conversation} conversation
 * @returns {boolean} success
 */
export function saveConversation(conversation) {
  const all = getAllConversations();
  const idx = all.findIndex(c => c.id === conversation.id);

  if (idx >= 0) {
    all[idx] = { ...conversation, updatedAt: Date.now() };
  } else {
    all.unshift({ ...conversation, updatedAt: Date.now() });
  }

  // Prune if over limit (keep newest)
  const pruned = all.slice(0, MAX_CONVERSATIONS);
  return writeJSON(CONVERSATIONS_KEY, pruned);
}

/**
 * Deletes a conversation by ID.
 * @param {string} id
 * @returns {boolean} success
 */
export function deleteConversation(id) {
  const filtered = getAllConversations().filter(c => c.id !== id);
  return writeJSON(CONVERSATIONS_KEY, filtered);
}

/**
 * Deletes all conversations.
 * @returns {boolean} success
 */
export function clearAllConversations() {
  try {
    localStorage.removeItem(CONVERSATIONS_KEY);
    return true;
  } catch {
    return false;
  }
}

/**
 * Renames a conversation title.
 * @param {string} id
 * @param {string} newTitle
 * @returns {boolean} success
 */
export function renameConversation(id, newTitle) {
  const conv = getConversation(id);
  if (!conv) return false;
  return saveConversation({ ...conv, title: newTitle.trim().slice(0, MAX_TITLE_LENGTH) });
}

// ─── Messages ───────────────────────────────────────────────

/**
 * Appends a message to an existing conversation.
 * @param {string} conversationId
 * @param {{ id: string, role: 'user'|'assistant', content: string, timestamp: number }} message
 * @returns {boolean} success
 */
export function appendMessage(conversationId, message) {
  const conv = getConversation(conversationId);
  if (!conv) return false;
  conv.messages.push(message);
  return saveConversation(conv);
}

/**
 * Replaces the last assistant message (used for regeneration).
 * @param {string} conversationId
 * @param {string} newContent
 * @returns {boolean} success
 */
export function replaceLastAssistantMessage(conversationId, newContent) {
  const conv = getConversation(conversationId);
  if (!conv) return false;
  const last = [...conv.messages].reverse().find(m => m.role === 'assistant');
  if (!last) return false;
  last.content  = newContent;
  last.timestamp = Date.now();
  return saveConversation(conv);
}

// ─── Search ─────────────────────────────────────────────────

/**
 * Searches conversations by title or message content.
 * Local only — never sent to server.
 * @param {string} query
 * @returns {Array<Conversation>}
 */
export function searchConversations(query) {
  const q = query.trim().toLowerCase();
  if (!q) return getAllConversations();

  return getAllConversations().filter(conv => {
    if (conv.title.toLowerCase().includes(q)) return true;
    return conv.messages.some(m => m.content.toLowerCase().includes(q));
  });
}

// ─── Settings ───────────────────────────────────────────────

const DEFAULT_SETTINGS = {
  theme:   'dark',
  version: '1.0.0',
};

/**
 * Returns current settings with defaults applied.
 * @returns {Settings}
 */
export function getSettings() {
  return { ...DEFAULT_SETTINGS, ...readJSON(SETTINGS_KEY, {}) };
}

/**
 * Saves settings (shallow merge with existing).
 * @param {Partial<Settings>} updates
 * @returns {boolean} success
 */
export function saveSettings(updates) {
  const current = getSettings();
  return writeJSON(SETTINGS_KEY, { ...current, ...updates });
}

// ─── Conversation Factory ────────────────────────────────────

/**
 * Creates a new empty conversation object.
 * @param {string} [id]
 * @returns {Conversation}
 */
export function createConversation(id) {
  const now = Date.now();
  return {
    id:        id ?? generateId(),
    title:     'New Chat',
    createdAt: now,
    updatedAt: now,
    messages:  [],
  };
}

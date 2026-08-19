const STORAGE_KEY = 'nexa-ai-chats';

export function loadChats() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}

export function saveChats(chats) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
}

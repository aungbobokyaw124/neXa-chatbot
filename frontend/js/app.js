/**
 * neXa AI — Main Application
 * Orchestrates UI, storage, and chat modules.
 */

import {
  getAllConversations,
  getConversation,
  saveConversation,
  deleteConversation,
  clearAllConversations,
  appendMessage,
  replaceLastAssistantMessage,
  searchConversations,
  generateId,
  generateMessageId,
  generateTitle,
  createConversation,
  getSettings,
  saveSettings,
} from './storage.js';

import { sendMessage, validateMessage, ChatError } from './chat.js';

import {
  Icons,
  renderMessage,
  renderError,
  createTypingIndicator,
  renderHistoryItem,
  renderSuggestions,
  scrollToBottom,
  snapToBottom,
  showToast,
  showConfirm,
  autoResizeTextarea,
} from './ui.js';

// ─── App State ───────────────────────────────────────────────

const state = {
  currentConvId: null,
  isLoading:     false,
  sidebarOpen:   false,
};

// ─── DOM References ──────────────────────────────────────────

const $ = (id) => document.getElementById(id);

const dom = {
  preloader:        $('preloader'),
  app:              $('app'),

  // Sidebar
  sidebar:          $('sidebar'),
  sidebarOverlay:   $('sidebar-overlay'),
  sidebarCloseBtn:  $('sidebar-close-btn'),
  newChatBtn:       $('new-chat-btn'),
  searchSideBtn:    $('search-side-btn'),
  settingsBtn:      $('settings-btn'),
  aboutBtn:         $('about-btn'),
  historyList:      $('chat-history-list'),

  // Header
  menuBtn:          $('menu-btn'),
  newChatHeaderBtn: $('new-chat-header-btn'),

  // Chat area
  welcomeScreen:    $('welcome-screen'),
  suggestionsGrid:  $('suggestions-grid'),
  messages:         $('messages'),

  // Composer
  messageInput:     $('message-input'),
  sendBtn:          $('send-btn'),

  // Search modal
  searchBackdrop:   $('search-backdrop'),
  searchInput:      $('search-input'),
  searchResults:    $('search-results'),
  searchCloseBtn:   $('search-close-btn'),

  // Settings modal
  settingsBackdrop: $('settings-backdrop'),
  settingsCloseBtn: $('settings-close-btn'),
  themeToggle:      $('theme-toggle'),
  clearChatsBtn:    $('clear-chats-btn'),

  // About modal
  aboutBackdrop:    $('about-backdrop'),
  aboutCloseBtn:    $('about-close-btn'),

  // Confirm dialog
  confirmBackdrop:  $('confirm-backdrop'),
};

// ─── Init ────────────────────────────────────────────────────

function init() {
  applySettings();
  setupEventListeners();
  renderSuggestionCards();
  refreshHistoryList();
  hidePreloader();
}

function hidePreloader() {
  // Min display time so preloader doesn't flash instantly
  setTimeout(() => {
    dom.preloader.classList.add('fade-out');
    dom.app.classList.remove('hidden');
    dom.preloader.addEventListener('transitionend', () => {
      dom.preloader.remove();
    }, { once: true });
  }, 900);
}

// ─── Settings ────────────────────────────────────────────────

function applySettings() {
  const settings = getSettings();

  // Theme
  document.documentElement.dataset.theme = settings.theme ?? 'dark';

  if (dom.themeToggle) {
    dom.themeToggle.checked = settings.theme === 'light';
  }
}

function handleThemeToggle(e) {
  const theme = e.target.checked ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  saveSettings({ theme });
}

// ─── Event Listeners ─────────────────────────────────────────

function setupEventListeners() {
  // Sidebar
  dom.menuBtn?.addEventListener('click', openSidebar);
  dom.sidebarOverlay?.addEventListener('click', closeSidebar);
  dom.sidebarCloseBtn?.addEventListener('click', closeSidebar);
  dom.newChatBtn?.addEventListener('click', () => { startNewChat(); closeSidebar(); });
  dom.newChatHeaderBtn?.addEventListener('click', startNewChat);

  // Sidebar nav
  dom.searchSideBtn?.addEventListener('click', () => { openModal('search'); closeSidebar(); });
  dom.settingsBtn?.addEventListener('click', () => { openModal('settings'); closeSidebar(); });
  dom.aboutBtn?.addEventListener('click', () => { openModal('about'); closeSidebar(); });

  // Composer
  dom.messageInput?.addEventListener('input', handleInputChange);
  dom.messageInput?.addEventListener('keydown', handleInputKeydown);
  dom.sendBtn?.addEventListener('click', handleSend);

  // Auto-resize textarea
  autoResizeTextarea(dom.messageInput, 200);

  // Search
  dom.searchInput?.addEventListener('input', handleSearch);
  dom.searchCloseBtn?.addEventListener('click', () => closeModal('search'));

  // Settings
  dom.settingsCloseBtn?.addEventListener('click', () => closeModal('settings'));
  dom.themeToggle?.addEventListener('change', handleThemeToggle);
  dom.clearChatsBtn?.addEventListener('click', handleClearAllChats);

  // About
  dom.aboutCloseBtn?.addEventListener('click', () => closeModal('about'));

  // Close modals on backdrop click
  dom.searchBackdrop?.addEventListener('click', (e) => {
    if (e.target === dom.searchBackdrop) closeModal('search');
  });
  dom.settingsBackdrop?.addEventListener('click', (e) => {
    if (e.target === dom.settingsBackdrop) closeModal('settings');
  });
  dom.aboutBackdrop?.addEventListener('click', (e) => {
    if (e.target === dom.aboutBackdrop) closeModal('about');
  });

  // Global keyboard shortcuts
  document.addEventListener('keydown', handleGlobalKeydown);

  // Click delegation for copy-code buttons (fallback)
  document.addEventListener('click', handleDocumentClick);
}

// ─── Sidebar ─────────────────────────────────────────────────

function openSidebar() {
  state.sidebarOpen = true;
  dom.sidebar.classList.add('open');
  dom.sidebarOverlay.classList.add('visible');
  dom.sidebarOverlay.style.display = 'block';
  dom.sidebarCloseBtn?.focus();
}

function closeSidebar() {
  state.sidebarOpen = false;
  dom.sidebar.classList.remove('open');
  dom.sidebarOverlay.classList.remove('visible');
  setTimeout(() => {
    if (!state.sidebarOpen) dom.sidebarOverlay.style.display = '';
  }, 200);
}

// ─── Modal ───────────────────────────────────────────────────

function openModal(name) {
  const backdrop = dom[`${name}Backdrop`];
  if (!backdrop) return;
  backdrop.classList.add('open');

  if (name === 'search') {
    dom.searchInput.value = '';
    renderSearchResults('');
    setTimeout(() => dom.searchInput?.focus(), 50);
  }
}

function closeModal(name) {
  const backdrop = dom[`${name}Backdrop`];
  if (!backdrop) return;
  backdrop.classList.remove('open');
}

// ─── New Chat ────────────────────────────────────────────────

function startNewChat() {
  state.currentConvId = null;
  state.isLoading     = false;

  clearMessagesDOM();
  showWelcomeScreen();
  updateSidebarActiveState(null);
  dom.messageInput.value = '';
  triggerInputResize();
  updateSendButton();
  dom.messageInput.focus();
}

// ─── Send Message ─────────────────────────────────────────────

function handleInputChange() {
  updateSendButton();
}

function handleInputKeydown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
}

function updateSendButton() {
  const hasText = dom.messageInput.value.trim().length > 0;
  dom.sendBtn.disabled = !hasText || state.isLoading;
}

async function handleSend() {
  const content = dom.messageInput.value.trim();

  const validation = validateMessage(content);
  if (!validation.valid) {
    showToast(validation.error, 'error');
    return;
  }

  if (state.isLoading) return;

  // Create or get conversation
  if (!state.currentConvId) {
    const conv = createConversation();
    conv.title = generateTitle(content);
    saveConversation(conv);
    state.currentConvId = conv.id;
    refreshHistoryList();
  }

  const userMsg = {
    id:        generateMessageId(),
    role:      'user',
    content,
    timestamp: Date.now(),
  };

  // Update title if this is the first message
  const conv = getConversation(state.currentConvId);
  if (conv && conv.messages.length === 0) {
    conv.title = generateTitle(content);
    saveConversation(conv);
    refreshHistoryList();
  }

  // Save + render user message
  appendMessage(state.currentConvId, userMsg);
  hideWelcomeScreen();
  appendMessageToDOM(userMsg);

  // Clear input
  dom.messageInput.value = '';
  triggerInputResize();
  updateSendButton();

  // Call AI
  await callAI();
}

async function callAI(isRetry = false) {
  state.isLoading = true;
  updateSendButton();

  // Show typing indicator
  const indicator = createTypingIndicator();
  dom.messages.appendChild(indicator);
  scrollToBottom(dom.messages);

  // Get current conversation history
  const conv = getConversation(state.currentConvId);
  if (!conv) {
    state.isLoading = false;
    updateSendButton();
    indicator.remove();
    return;
  }

  try {
    const reply = await sendMessage(conv.messages);

    indicator.remove();

    const assistantMsg = {
      id:        generateMessageId(),
      role:      'assistant',
      content:   reply,
      timestamp: Date.now(),
    };

    if (isRetry) {
      replaceLastAssistantMessage(state.currentConvId, reply);
      // Remove last assistant message from DOM and re-render
      const lastAssistant = dom.messages.querySelector('.message.assistant:last-child');
      if (lastAssistant) lastAssistant.remove();
    } else {
      appendMessage(state.currentConvId, assistantMsg);
    }

    appendMessageToDOM(assistantMsg);
    scrollToBottom(dom.messages);

  } catch (err) {
    indicator.remove();

    const errorText = err instanceof ChatError
      ? err.message
      : 'Something went wrong. Please try again.';

    const retryable = err instanceof ChatError ? err.retryable : true;

    const errorEl = renderError(errorText, retryable ? () => {
      errorEl.remove();
      callAI(true);
    } : null);

    dom.messages.appendChild(errorEl);
    scrollToBottom(dom.messages);

  } finally {
    state.isLoading = false;
    updateSendButton();
  }
}

// ─── Regenerate ───────────────────────────────────────────────

async function handleRegenerate() {
  if (state.isLoading || !state.currentConvId) return;

  const conv = getConversation(state.currentConvId);
  if (!conv || conv.messages.length === 0) return;

  // Remove last assistant message from DOM
  const lastAssistantEl = dom.messages.querySelector('.message.assistant:last-child');
  if (lastAssistantEl) lastAssistantEl.remove();

  // Remove last assistant message from storage
  const lastAssIdx = [...conv.messages].reverse().findIndex(m => m.role === 'assistant');
  if (lastAssIdx >= 0) {
    const realIdx = conv.messages.length - 1 - lastAssIdx;
    conv.messages.splice(realIdx, 1);
    saveConversation(conv);
  }

  await callAI(false);
}

// ─── DOM Helpers ─────────────────────────────────────────────

function appendMessageToDOM(message) {
  const el = renderMessage(message, {
    onCopy:       () => showToast('Copied to clipboard', 'success'),
    onRegenerate: handleRegenerate,
    onShare:      () => {},
  });
  dom.messages.appendChild(el);
}

function clearMessagesDOM() {
  dom.messages.innerHTML = '';
}

function showWelcomeScreen() {
  dom.welcomeScreen.classList.remove('hidden');
  dom.messages.classList.add('hidden');
}

function hideWelcomeScreen() {
  dom.welcomeScreen.classList.add('hidden');
  dom.messages.classList.remove('hidden');
}

function triggerInputResize() {
  dom.messageInput.style.height = 'auto';
  dom.messageInput.style.height = `${Math.min(dom.messageInput.scrollHeight, 200)}px`;
}

// ─── Load Conversation ────────────────────────────────────────

function loadConversation(convId) {
  const conv = getConversation(convId);
  if (!conv) return;

  state.currentConvId = convId;
  state.isLoading = false;

  clearMessagesDOM();

  if (conv.messages.length === 0) {
    showWelcomeScreen();
  } else {
    hideWelcomeScreen();
    conv.messages.forEach(msg => appendMessageToDOM(msg));
    snapToBottom(dom.messages);
  }

  updateSidebarActiveState(convId);
  closeSidebar();
  dom.messageInput.focus();
}

// ─── History List ─────────────────────────────────────────────

function refreshHistoryList() {
  const conversations = getAllConversations();
  dom.historyList.innerHTML = '';

  if (conversations.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'history-empty';
    empty.textContent = 'No conversations yet';
    dom.historyList.appendChild(empty);
    return;
  }

  conversations.forEach(conv => {
    const item = renderHistoryItem(
      conv,
      conv.id === state.currentConvId,
      {
        onOpen:   (id) => loadConversation(id),
        onDelete: (id) => confirmDeleteConversation(id),
      }
    );
    dom.historyList.appendChild(item);
  });
}

function updateSidebarActiveState(activeId) {
  dom.historyList.querySelectorAll('.history-item').forEach(el => {
    el.classList.toggle('active', el.dataset.convId === activeId);
  });
}

// ─── Delete Conversation ──────────────────────────────────────

async function confirmDeleteConversation(convId) {
  const confirmed = await showConfirm(
    'Delete conversation',
    'This conversation will be permanently deleted.',
    'Delete'
  );
  if (!confirmed) return;

  deleteConversation(convId);

  if (state.currentConvId === convId) {
    startNewChat();
  }

  refreshHistoryList();
  showToast('Conversation deleted', 'info');
}

// ─── Clear All Chats ──────────────────────────────────────────

async function handleClearAllChats() {
  const confirmed = await showConfirm(
    'Clear all chats',
    'All conversations will be permanently deleted. This cannot be undone.',
    'Clear all'
  );
  if (!confirmed) return;

  clearAllConversations();
  startNewChat();
  refreshHistoryList();
  closeModal('settings');
  showToast('All chats cleared', 'info');
}

// ─── Search ───────────────────────────────────────────────────

function handleSearch(e) {
  renderSearchResults(e.target.value);
}

function renderSearchResults(query) {
  const results = searchConversations(query);
  dom.searchResults.innerHTML = '';

  if (results.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'search-empty';
    empty.textContent = query ? 'No results found' : 'No conversations yet';
    dom.searchResults.appendChild(empty);
    return;
  }

  results.forEach(conv => {
    const el = document.createElement('div');
    el.className = 'search-result-item';
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');

    // Find matching message preview
    const q = query.trim().toLowerCase();
    let preview = conv.messages[0]?.content?.slice(0, 60) ?? '';
    if (q) {
      const matchingMsg = conv.messages.find(m =>
        m.content.toLowerCase().includes(q)
      );
      if (matchingMsg) {
        const idx = matchingMsg.content.toLowerCase().indexOf(q);
        const start = Math.max(0, idx - 20);
        preview = (start > 0 ? '…' : '') + matchingMsg.content.slice(start, idx + 60);
      }
    }

    el.innerHTML = `
      <div class="search-result-title">${escapeForHTML(conv.title)}</div>
      <div class="search-result-preview">${escapeForHTML(preview)}${preview.length >= 60 ? '…' : ''}</div>
    `;

    const open = () => {
      closeModal('search');
      loadConversation(conv.id);
    };

    el.addEventListener('click', open);
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });

    dom.searchResults.appendChild(el);
  });
}

function escapeForHTML(str) {
  const d = document.createElement('div');
  d.textContent = str ?? '';
  return d.innerHTML;
}

// ─── Suggestions ─────────────────────────────────────────────

function renderSuggestionCards() {
  if (!dom.suggestionsGrid) return;

  const cards = renderSuggestions((prompt) => {
    dom.messageInput.value = prompt;
    triggerInputResize();
    updateSendButton();
    dom.messageInput.focus();
    // Place cursor at end
    dom.messageInput.setSelectionRange(prompt.length, prompt.length);
  });

  dom.suggestionsGrid.appendChild(cards);
}

// ─── Global Keyboard Shortcuts ────────────────────────────────

function handleGlobalKeydown(e) {
  // Escape: close open modals / sidebar
  if (e.key === 'Escape') {
    if (dom.searchBackdrop?.classList.contains('open'))   closeModal('search');
    else if (dom.settingsBackdrop?.classList.contains('open')) closeModal('settings');
    else if (dom.aboutBackdrop?.classList.contains('open'))    closeModal('about');
    else if (state.sidebarOpen) closeSidebar();
  }

  // Ctrl/Cmd + K → search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    openModal('search');
  }

  // Ctrl/Cmd + N → new chat
  if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
    e.preventDefault();
    startNewChat();
  }
}

// ─── Document Click Delegation ────────────────────────────────

function handleDocumentClick(e) {
  // Handled individually on each button — this is a safety net
}

// ─── Boot ─────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', init);

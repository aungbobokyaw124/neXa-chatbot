/**
 * neXa AI — UI Module
 * DOM rendering: messages, markdown, toasts, modals, history list.
 */

// ─── Icons (inline SVG) ──────────────────────────────────────

export const Icons = {
  send: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>`,

  plus: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,

  search: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,

  settings: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,

  info: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,

  menu: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,

  close: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,

  copy: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,

  check: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`,

  refresh: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>`,

  trash: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>`,

  alertCircle: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,

  share: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,

  chat: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
};

// ─── Suggestion Definitions ───────────────────────────────────

export const SUGGESTIONS = [
  {
    label: 'Ask AI',
    desc:  'General questions',
    icon:  `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    prompt: 'What can you help me with today?',
  },
  {
    label: 'Coding',
    desc:  'Write or review code',
    icon:  `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    prompt: 'Help me write a function to ',
  },
  {
    label: 'Writing',
    desc:  'Drafts & editing',
    icon:  `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
    prompt: 'Help me write a professional email about ',
  },
  {
    label: 'Ideas',
    desc:  'Brainstorm & explore',
    icon:  `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>`,
    prompt: 'Give me 5 creative ideas for ',
  },
  {
    label: 'Explain',
    desc:  'Learn something new',
    icon:  `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
    prompt: 'Explain how this works in simple terms: ',
  },
  {
    label: 'Translate',
    desc:  'Any language',
    icon:  `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>`,
    prompt: 'Translate the following text to English:\n\n',
  },
];

// ─── Markdown Parser ──────────────────────────────────────────

/**
 * Converts markdown text to sanitized HTML.
 * XSS-safe: HTML is escaped before any injection.
 * @param {string} rawText
 * @returns {string} HTML string
 */
export function parseMarkdown(rawText) {
  if (!rawText) return '';

  const stash   = [];
  const stashPut = (html) => {
    const token = `\x00S${stash.length}\x00`;
    stash.push(html);
    return token;
  };

  let text = rawText;

  // 1. Extract fenced code blocks → stash
  text = text.replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang, code) => {
    const trimmedCode = code.trimEnd();
    const escapedCode = escapeHTML(trimmedCode);
    const langLabel   = lang ? `<span class="code-lang">${escapeHTML(lang)}</span>` : '';
    const encodedCode = encodeURIComponent(trimmedCode);
    return stashPut(
      `<div class="code-block">` +
        `<div class="code-header">${langLabel}` +
          `<button class="copy-code-btn" data-code="${encodedCode}" title="Copy code" aria-label="Copy code">` +
            `${Icons.copy} Copy` +
          `</button>` +
        `</div>` +
        `<pre><code>${escapedCode}</code></pre>` +
      `</div>`
    );
  });

  // 2. Extract inline code → stash
  text = text.replace(/`([^`\n]+)`/g, (_, code) =>
    stashPut(`<code>${escapeHTML(code)}</code>`)
  );

  // 3. Extract links → stash (before HTML escape to preserve URL integrity)
  text = text.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    (_, label, url) =>
      stashPut(
        `<a href="${escapeAttr(url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(label)}</a>`
      )
  );

  // 4. Escape remaining HTML
  text = escapeHTML(text);

  // 5. Headings
  text = text.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  text = text.replace(/^## (.+)$/gm,  '<h2>$1</h2>');
  text = text.replace(/^# (.+)$/gm,   '<h1>$1</h1>');

  // 6. Bold + italic combo, then bold, then italic
  text = text.replace(/\*\*\*([^*\n]+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  text = text.replace(/\*\*([^*\n]+?)\*\*/g,     '<strong>$1</strong>');
  text = text.replace(/\*([^*\n]+?)\*/g,          '<em>$1</em>');
  text = text.replace(/_([^_\n]+?)_/g,             '<em>$1</em>');

  // 7. Unordered lists (consecutive lines starting with "- ")
  text = text.replace(/(^(?:- .+(?:\n|$))+)/gm, (match) => {
    const items = match
      .split('\n')
      .filter(l => l.startsWith('- '))
      .map(l => `<li>${l.slice(2)}</li>`)
      .join('');
    return `<ul>${items}</ul>`;
  });

  // 8. Ordered lists
  text = text.replace(/(^(?:\d+\. .+(?:\n|$))+)/gm, (match) => {
    const items = match
      .split('\n')
      .filter(l => /^\d+\. /.test(l))
      .map(l => `<li>${l.replace(/^\d+\. /, '')}</li>`)
      .join('');
    return `<ol>${items}</ol>`;
  });

  // 9. Paragraphs (double line breaks)
  const BLOCK_RE = /^(<h[1-6]|<ul|<ol|<div|<pre|\x00S)/;
  text = text
    .split(/\n\n+/)
    .map(block => {
      const t = block.trim();
      if (!t) return '';
      if (BLOCK_RE.test(t)) return t;
      return `<p>${t.replace(/\n/g, '<br>')}</p>`;
    })
    .filter(Boolean)
    .join('\n');

  // 10. Restore stash
  stash.forEach((html, i) => {
    text = text.split(`\x00S${i}\x00`).join(html);
  });

  return text;
}

function escapeHTML(str) {
  return str
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#39;');
}

function escapeAttr(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ─── Message Rendering ────────────────────────────────────────

/**
 * Renders a single message as a DOM element.
 * @param {{ id: string, role: 'user'|'assistant', content: string }} message
 * @param {{ onCopy: Function, onRegenerate: Function, onShare: Function }} handlers
 * @returns {HTMLElement}
 */
export function renderMessage(message, handlers = {}) {
  const el = document.createElement('div');
  el.className = `message ${message.role}`;
  el.dataset.messageId = message.id;

  if (message.role === 'user') {
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.textContent = message.content;
    el.appendChild(bubble);
  } else {
    // Header
    const header = document.createElement('div');
    header.className = 'message-header';

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.setAttribute('aria-hidden', 'true');
    avatar.textContent = 'nX';

    const sender = document.createElement('span');
    sender.className = 'message-sender';
    sender.textContent = 'neXa';

    header.appendChild(avatar);
    header.appendChild(sender);

    // Body
    const body = document.createElement('div');
    body.className = 'message-body';
    body.innerHTML = parseMarkdown(message.content);

    // Wire up copy-code buttons inside code blocks
    body.querySelectorAll('.copy-code-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const code = decodeURIComponent(btn.dataset.code || '');
        copyToClipboard(code).then(ok => {
          if (ok) {
            btn.innerHTML = `${Icons.check} Copied`;
            btn.classList.add('copied');
            setTimeout(() => {
              btn.innerHTML = `${Icons.copy} Copy`;
              btn.classList.remove('copied');
            }, 2000);
          }
        });
      });
    });

    // Actions
    const actions = document.createElement('div');
    actions.className = 'message-actions';
    actions.setAttribute('role', 'toolbar');
    actions.setAttribute('aria-label', 'Message actions');

    // Copy action
    const copyBtn = createActionButton(Icons.copy, 'Copy', 'copy-message-btn');
    copyBtn.addEventListener('click', async () => {
      const ok = await copyToClipboard(message.content);
      if (ok) {
        copyBtn.innerHTML = `${Icons.check} Copied`;
        copyBtn.classList.add('copied');
        setTimeout(() => {
          copyBtn.innerHTML = `${Icons.copy} Copy`;
          copyBtn.classList.remove('copied');
        }, 2000);
        handlers.onCopy?.();
      }
    });
    actions.appendChild(copyBtn);

    // Regenerate action
    const regenBtn = createActionButton(Icons.refresh, 'Regenerate', 'regen-btn');
    regenBtn.addEventListener('click', () => handlers.onRegenerate?.());
    actions.appendChild(regenBtn);

    // Share action (only if Web Share API is available)
    if (navigator.share) {
      const shareBtn = createActionButton(Icons.share, 'Share', 'share-btn');
      shareBtn.addEventListener('click', async () => {
        try {
          await navigator.share({ text: message.content, title: 'neXa AI response' });
        } catch {
          // User cancelled or share failed — ignore
        }
        handlers.onShare?.();
      });
      actions.appendChild(shareBtn);
    }

    el.appendChild(header);
    el.appendChild(body);
    el.appendChild(actions);
  }

  return el;
}

function createActionButton(iconHtml, label, className) {
  const btn = document.createElement('button');
  btn.className = `msg-action-btn ${className}`;
  btn.innerHTML = `${iconHtml} ${label}`;
  btn.setAttribute('aria-label', label);
  return btn;
}

// ─── Error Message ────────────────────────────────────────────

/**
 * Renders an error message with optional retry button.
 * @param {string} errorText
 * @param {Function|null} onRetry
 * @returns {HTMLElement}
 */
export function renderError(errorText, onRetry = null) {
  const el = document.createElement('div');
  el.className = 'message-error';

  const bubble = document.createElement('div');
  bubble.className = 'error-bubble';
  bubble.setAttribute('role', 'alert');

  const icon = document.createElement('span');
  icon.innerHTML = Icons.alertCircle;

  const textDiv = document.createElement('div');
  textDiv.className = 'error-text';

  const title = document.createElement('div');
  title.className = 'error-title';
  title.textContent = 'Error';

  const msg = document.createElement('div');
  msg.className = 'error-message';
  msg.textContent = errorText;

  textDiv.appendChild(title);
  textDiv.appendChild(msg);
  bubble.appendChild(icon);
  bubble.appendChild(textDiv);
  el.appendChild(bubble);

  if (onRetry) {
    const retryBtn = document.createElement('button');
    retryBtn.className = 'error-retry-btn';
    retryBtn.textContent = 'Try again';
    retryBtn.addEventListener('click', onRetry);
    el.appendChild(retryBtn);
  }

  return el;
}

// ─── Typing Indicator ─────────────────────────────────────────

/**
 * Creates a typing / loading indicator element.
 * @returns {HTMLElement}
 */
export function createTypingIndicator() {
  const el = document.createElement('div');
  el.className = 'typing-indicator';
  el.id = 'typing-indicator';
  el.setAttribute('aria-label', 'neXa is thinking');
  el.setAttribute('aria-live', 'polite');

  el.innerHTML = `
    <div class="message-header">
      <div class="message-avatar" aria-hidden="true">nX</div>
      <span class="message-sender">neXa</span>
    </div>
    <div class="typing-dots" aria-hidden="true">
      <span></span><span></span><span></span>
    </div>
  `;

  return el;
}

// ─── Chat History Item ────────────────────────────────────────

/**
 * Renders a single conversation in the sidebar history list.
 * @param {Conversation} conv
 * @param {boolean} isActive
 * @param {{ onOpen: Function, onDelete: Function }} handlers
 * @returns {HTMLElement}
 */
export function renderHistoryItem(conv, isActive, handlers = {}) {
  const el = document.createElement('div');
  el.className = `history-item${isActive ? ' active' : ''}`;
  el.dataset.convId = conv.id;
  el.setAttribute('role', 'button');
  el.setAttribute('tabindex', '0');
  el.setAttribute('aria-label', `Open conversation: ${conv.title}`);

  const titleEl = document.createElement('span');
  titleEl.className = 'history-item-title';
  titleEl.textContent = conv.title;

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'history-item-delete';
  deleteBtn.innerHTML = Icons.trash;
  deleteBtn.setAttribute('aria-label', `Delete conversation: ${conv.title}`);
  deleteBtn.title = 'Delete conversation';

  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    handlers.onDelete?.(conv.id);
  });

  el.appendChild(titleEl);
  el.appendChild(deleteBtn);

  el.addEventListener('click', () => handlers.onOpen?.(conv.id));
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handlers.onOpen?.(conv.id);
    }
  });

  return el;
}

// ─── Suggestions ─────────────────────────────────────────────

/**
 * Renders the suggestion cards for the welcome screen.
 * @param {Function} onSelect - Called with prompt string
 * @returns {DocumentFragment}
 */
export function renderSuggestions(onSelect) {
  const frag = document.createDocumentFragment();

  SUGGESTIONS.forEach(({ label, desc, icon, prompt }) => {
    const card = document.createElement('button');
    card.className = 'suggestion-card';
    card.setAttribute('aria-label', `Suggestion: ${label}`);
    card.innerHTML = `
      <div class="suggestion-icon" aria-hidden="true">${icon}</div>
      <span class="suggestion-label">${escapeHTML(label)}</span>
      <span class="suggestion-desc">${escapeHTML(desc)}</span>
    `;
    card.addEventListener('click', () => onSelect(prompt));
    frag.appendChild(card);
  });

  return frag;
}

// ─── Scroll ───────────────────────────────────────────────────

/**
 * Smoothly scrolls a container to its bottom.
 * @param {HTMLElement} container
 */
export function scrollToBottom(container) {
  container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
}

/**
 * Instantly snaps a container to its bottom (no animation).
 * @param {HTMLElement} container
 */
export function snapToBottom(container) {
  container.scrollTop = container.scrollHeight;
}

// ─── Toast ───────────────────────────────────────────────────

let toastContainer = null;

function getToastContainer() {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    toastContainer.setAttribute('aria-live', 'polite');
    toastContainer.setAttribute('aria-atomic', 'true');
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

/**
 * Shows a transient toast notification.
 * @param {string} message
 * @param {'info'|'success'|'error'} type
 * @param {number} duration ms
 */
export function showToast(message, type = 'info', duration = 2500) {
  const container = getToastContainer();

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  }, duration);
}

// ─── Clipboard ───────────────────────────────────────────────

/**
 * Copies text to the clipboard.
 * @param {string} text
 * @returns {Promise<boolean>} success
 */
export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Fallback for older browsers
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  } catch {
    return false;
  }
}

// ─── Auto-resize Textarea ─────────────────────────────────────

/**
 * Attaches auto-resize behavior to a textarea.
 * @param {HTMLTextAreaElement} textarea
 * @param {number} maxHeight px
 */
export function autoResizeTextarea(textarea, maxHeight = 200) {
  function resize() {
    textarea.style.height = 'auto';
    const newH = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = `${newH}px`;
    textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
  }
  textarea.addEventListener('input', resize);
  resize();
  return resize; // Return so callers can trigger manually
}

// ─── Confirm Dialog ───────────────────────────────────────────

/**
 * Shows a native-style confirm dialog.
 * @param {string} title
 * @param {string} message
 * @param {string} confirmLabel
 * @returns {Promise<boolean>}
 */
export function showConfirm(title, message, confirmLabel = 'Confirm') {
  return new Promise((resolve) => {
    const backdrop = document.getElementById('confirm-backdrop');
    const titleEl  = document.getElementById('confirm-title');
    const msgEl    = document.getElementById('confirm-message');
    const okBtn    = document.getElementById('confirm-ok-btn');
    const cancelBtn = document.getElementById('confirm-cancel-btn');

    if (!backdrop) { resolve(window.confirm(`${title}\n${message}`)); return; }

    titleEl.textContent   = title;
    msgEl.textContent     = message;
    okBtn.textContent     = confirmLabel;

    backdrop.classList.add('open');

    const cleanup = (result) => {
      backdrop.classList.remove('open');
      okBtn.removeEventListener('click', onOk);
      cancelBtn.removeEventListener('click', onCancel);
      backdrop.removeEventListener('click', onBackdrop);
      resolve(result);
    };

    const onOk       = () => cleanup(true);
    const onCancel   = () => cleanup(false);
    const onBackdrop = (e) => { if (e.target === backdrop) cleanup(false); };

    okBtn.addEventListener('click', onOk);
    cancelBtn.addEventListener('click', onCancel);
    backdrop.addEventListener('click', onBackdrop);
  });
}

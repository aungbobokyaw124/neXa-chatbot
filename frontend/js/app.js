import { hidePreloader, getAppShell } from './ui.js';
import { loadChats } from './storage.js';

const app = getAppShell();

function renderShell() {
  app.innerHTML = `
    <main class="chat-app" aria-label="neXa AI">
      <header class="app-header">
        <strong>neXa AI</strong>
      </header>
      <section class="welcome" aria-live="polite">
        <h1>How can I help you today?</h1>
        <p>Build Faster. Create Smarter.</p>
      </section>
    </main>`;
  app.hidden = false;
}

renderShell();
void loadChats();

window.setTimeout(hidePreloader, 450);

/* ============================================================
   CyberBootcamp — Shared Lesson JavaScript
   Loaded on every week page
   ============================================================ */

'use strict';

/* ── Tab switching (day navigation) ──────────────────────────── */
function show(i) {
  document.querySelectorAll('.pnl').forEach(p => p.classList.remove('on'));
  document.querySelectorAll('.dtab').forEach(t => t.classList.remove('on'));
  const panel = document.getElementById('p' + i);
  const tab   = document.querySelectorAll('.dtab')[i];
  if (panel) panel.classList.add('on');
  if (tab)   tab.classList.add('on');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // Persist selected day in sessionStorage
  sessionStorage.setItem('lastDay_' + getWeekId(), String(i));
}

/* ── Quiz answer handler ─────────────────────────────────────── */
function qa(el, type, explanation) {
  const qBlock = el.closest('.qb') || el.closest('.quiz-block');
  if (!qBlock || qBlock.dataset.done) return;
  qBlock.dataset.done = '1';

  qBlock.querySelectorAll('.qo, .quiz-option').forEach(o => {
    o.style.pointerEvents = 'none';
    o.style.opacity = '0.4';
  });
  el.style.opacity = '1';
  el.classList.add(type);

  const fb = qBlock.querySelector('.qfb, .quiz-feedback');
  if (fb) {
    fb.classList.add('show', type);
    fb.textContent = explanation;
  }

  // Track quiz score in sessionStorage
  trackQuizAnswer(type === 'correct');
}

/* ── Malware analysis tabs ───────────────────────────────────── */
function matab(el, targetId) {
  const container = el.closest('.card') || el.closest('.tab-container');
  if (!container) return;
  container.querySelectorAll('.ma-tab').forEach(t => t.classList.remove('on'));
  container.querySelectorAll('.ma-content').forEach(c => c.classList.remove('on'));
  el.classList.add('on');
  const target = document.getElementById(targetId);
  if (target) target.classList.add('on');
}

/* ── Back to top button ──────────────────────────────────────── */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── Progress tracking ───────────────────────────────────────── */
function getWeekId() {
  const match = document.title.match(/week\s*(\d+)/i) || location.pathname.match(/week(\d+)/i);
  return match ? 'week' + match[1] : 'week0';
}

function trackQuizAnswer(correct) {
  const key     = 'quiz_' + getWeekId();
  const current = JSON.parse(sessionStorage.getItem(key) || '{"total":0,"correct":0}');
  current.total  += 1;
  current.correct += correct ? 1 : 0;
  sessionStorage.setItem(key, JSON.stringify(current));
}

function getQuizScore() {
  const key  = 'quiz_' + getWeekId();
  return JSON.parse(sessionStorage.getItem(key) || '{"total":0,"correct":0}');
}

/* ── Restore last visited day on page load ───────────────────── */
function restoreLastDay() {
  const saved = sessionStorage.getItem('lastDay_' + getWeekId());
  if (saved !== null) {
    const idx = parseInt(saved, 10);
    const panel = document.getElementById('p' + idx);
    if (panel) show(idx);
  }
}

/* ── Copy code blocks ────────────────────────────────────────── */
function initCopyButtons() {
  document.querySelectorAll('.terminal-body, .tbody').forEach(block => {
    const btn = document.createElement('button');
    btn.className   = 'copy-btn';
    btn.textContent = 'Copy';
    btn.style.cssText = 'position:absolute;top:8px;right:8px;font-family:monospace;font-size:0.62rem;padding:3px 9px;border:1px solid rgba(255,255,255,0.15);background:rgba(0,0,0,0.5);color:#aaa;border-radius:2px;cursor:pointer;letter-spacing:0.08em;';
    const wrapper = block.parentElement;
    if (wrapper) {
      wrapper.style.position = 'relative';
      wrapper.appendChild(btn);
    }
    btn.addEventListener('click', () => {
      const text = block.innerText;
      navigator.clipboard.writeText(text).then(() => {
        btn.textContent = 'Copied!';
        btn.style.color = '#4ade80';
        setTimeout(() => { btn.textContent = 'Copy'; btn.style.color = '#aaa'; }, 2000);
      }).catch(() => {
        btn.textContent = 'Error';
        setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
      });
    });
  });
}

/* ── Keyboard shortcut: left/right arrow to switch days ─────── */
function initKeyboardNav() {
  const tabs = document.querySelectorAll('.dtab');
  if (!tabs.length) return;

  document.addEventListener('keydown', (e) => {
    // Don't hijack input/textarea keypresses
    if (['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName)) return;

    const active = document.querySelector('.dtab.on');
    if (!active) return;
    const idx    = Array.from(tabs).indexOf(active);

    if (e.key === 'ArrowRight' && idx < tabs.length - 1) {
      e.preventDefault(); show(idx + 1);
    }
    if (e.key === 'ArrowLeft' && idx > 0) {
      e.preventDefault(); show(idx - 1);
    }
  });
}

/* ── Smooth tab scroll into view on mobile ───────────────────── */
function initTabScrollIntoView() {
  document.querySelectorAll('.dtab').forEach(tab => {
    tab.addEventListener('click', () => {
      tab.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
    });
  });
}

/* ── Reading time estimate ───────────────────────────────────── */
function addReadingTime() {
  const panels = document.querySelectorAll('.pnl');
  panels.forEach(panel => {
    const words     = (panel.innerText || '').split(/\s+/).length;
    const minutes   = Math.max(1, Math.round(words / 200));
    const dayInfo   = panel.querySelector('.dinfo p');
    if (dayInfo) {
      const rt = document.createElement('span');
      rt.style.cssText = 'margin-left:12px;font-family:monospace;font-size:0.6rem;opacity:0.4;';
      rt.textContent   = `~${minutes} min read`;
      dayInfo.appendChild(rt);
    }
  });
}

/* ── Dark/Light mode toggle (optional, default dark) ────────── */
function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const saved = localStorage.getItem('cb_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('cb_theme', next);
  });
}

/* ── External links open in new tab with rel=noopener ───────── */
function secureExternalLinks() {
  document.querySelectorAll('a[href]').forEach(a => {
    if (a.hostname && a.hostname !== location.hostname) {
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
    }
  });
}

/* ── Print button ────────────────────────────────────────────── */
function initPrintButton() {
  const btn = document.getElementById('print-btn');
  if (btn) btn.addEventListener('click', () => window.print());
}

/* ── Init all on DOM ready ───────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  restoreLastDay();
  initBackToTop();
  initCopyButtons();
  initKeyboardNav();
  initTabScrollIntoView();
  addReadingTime();
  initThemeToggle();
  secureExternalLinks();
  initPrintButton();
});

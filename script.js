
function toggleCourtlyMenu(forceState) {
  const btn = document.getElementById('menu-toggle-btn') || document.querySelector('.menu-toggle');
  const nav = document.getElementById('primary-nav') || document.querySelector('.nav');

  if (!btn || !nav) {
    console.error('Courtly: Не знайдено кнопку або меню навігації!');
    return;
  }

  const isCurrentlyOpen = nav.classList.contains('is-open');
  const shouldOpen = forceState !== undefined ? forceState : !isCurrentlyOpen;

  if (shouldOpen) {
    nav.classList.add('is-open');
  } else {
    nav.classList.remove('is-open');
  }

  btn.setAttribute('aria-expanded', String(shouldOpen));
  btn.setAttribute('aria-label', shouldOpen ? 'Закрити меню навігації' : 'Відкрити меню навігації');

  if (shouldOpen) {
    const firstLink = nav.querySelector('a');
    if (firstLink) firstLink.focus();
  } else {
    btn.focus();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('menu-toggle-btn') || document.querySelector('.menu-toggle');
  const nav = document.getElementById('primary-nav') || document.querySelector('.nav');

  if (!btn || !nav) return;

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      toggleCourtlyMenu(false);
    }
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 1024) {
        toggleCourtlyMenu(false);
      }
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && nav.classList.contains('is-open')) {
      toggleCourtlyMenu(false);
    }
  });
});
/* ═══════════════════════════════════════════════════
   ZENXONE — ui-loader.js
   Page Loader + Scroll Reveal Observer
   ═══════════════════════════════════════════════════ */

'use strict';

/**
 * লোডার hide করে এবং সব section reveal observer চালু করে।
 * window.load event এ call হয়।
 */
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  setTimeout(() => {
    loader.classList.add('hidden');
    initRevealObserver();
  }, 1000);
}

/**
 * IntersectionObserver দিয়ে .section-reveal elements
 * viewport এ আসলে .visible class add করে।
 */
function initRevealObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.section-reveal').forEach(el => observer.observe(el));
}

window.addEventListener('load', initLoader);

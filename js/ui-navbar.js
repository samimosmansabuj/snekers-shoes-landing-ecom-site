/* ═══════════════════════════════════════════════════
   ZENXONE — ui-navbar.js
   Navbar Scroll Effect · Mobile Hamburger Menu · Smooth Anchor Links
   ═══════════════════════════════════════════════════ */

'use strict';

function initNavbar() {
  const navbar       = document.getElementById('navbar');
  const navMenuBtn   = document.getElementById('navMenuBtn');
  const navMobileMenu= document.getElementById('navMobileMenu');

  if (!navbar) return;

  /* Scroll — sticky glass effect */
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  /* Hamburger toggle */
  if (navMenuBtn && navMobileMenu) {
    navMenuBtn.addEventListener('click', () => {
      navMobileMenu.classList.toggle('open');
    });

    /* Close mobile menu on any mobile-link click */
    navMobileMenu.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => navMobileMenu.classList.remove('open'));
    });
  }

  /* Smooth anchor navigation (all anchor links across page) */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
        if (navMobileMenu) navMobileMenu.classList.remove('open');
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', initNavbar);

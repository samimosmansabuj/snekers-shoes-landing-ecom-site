/* ═══════════════════════════════════════════════════
   ZENXONE — mobile-bar.js
   Mobile Bottom Bar — show/hide · cart + buy now buttons
   ═══════════════════════════════════════════════════ */

'use strict';

function showMobileBottomBar(product) {
  if (product) lastViewedProduct = product;
  const bar = document.getElementById('mobileBottomBar');
  if (bar) bar.style.display = 'flex';
}

function initMobileBar() {
  const mbbCartBtn = document.getElementById('mbbCartBtn');
  const mbbBuyBtn  = document.getElementById('mbbBuyBtn');

  mbbCartBtn?.addEventListener('click', openCartDrawer);

  mbbBuyBtn?.addEventListener('click', () => {
    if (getCart().length > 0) {
      openCartDrawer();
    } else if (lastViewedProduct) {
      addToCart(lastViewedProduct, lastViewedProduct.colors[0].name, lastViewedProduct.sizes[0], 1);
      openCartDrawer();
    }
  });

  // Show bar on page load if cart has items (returning user) on mobile
  if (getCart().length > 0 && window.innerWidth <= 680) {
    showMobileBottomBar(null);
  }
}

document.addEventListener('DOMContentLoaded', initMobileBar);

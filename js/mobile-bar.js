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
      const defaultSize = lastViewedProduct.sizes[0];
      const matchedVariant = lastViewedProduct.variants ? lastViewedProduct.variants.find(v => String(v.attributes?.size) === String(defaultSize)) : null;
      const variantId = matchedVariant ? matchedVariant.id : null;
      addToCart(lastViewedProduct, lastViewedProduct.colors[0].name, defaultSize, 1, variantId);
      openCartDrawer();
    }
  });

  // Show bar on page load if cart has items (returning user) on mobile
  if (getCart().length > 0 && window.innerWidth <= 680) {
    showMobileBottomBar(null);
  }
}

document.addEventListener('DOMContentLoaded', initMobileBar);

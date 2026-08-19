/* ═══════════════════════════════════════════════════
   ZENXONE — main.js
   App Entry Point — সব module initialize করে।
   window.load এ products render হয়,
   DOMContentLoaded এ বাকি সব init হয় (নিজ নিজ ফাইলে)।
   ═══════════════════════════════════════════════════ */

'use strict';

/* Products render হয় loader hide হওয়ার পরে এবং data fetch হওয়ার পরে */
window.addEventListener('load', () => {
  fetchProducts().then(() => {
    // API থেকে ডাটা আসার পরে UI render করুন
    setTimeout(() => {
      initProducts();       // products.js
    }, 1000); // loader animation শেষ হওয়ার পরে
  });
});

/* DOMContentLoaded এ cart badge restore করুন */
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI(); // cart.js — page reload এ badge আপডেট করে
});

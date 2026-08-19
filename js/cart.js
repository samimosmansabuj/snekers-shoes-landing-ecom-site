/* ═══════════════════════════════════════════════════
   ZENXONE — cart.js
   Cart State Management
   add / remove / qty change / size change / save to localStorage
   ═══════════════════════════════════════════════════ */

'use strict';

/* ── Cart State ── */
let cart = JSON.parse(localStorage.getItem('zenxone_cart') || '[]');

/* ── Persist ── */
function saveCart() {
  localStorage.setItem('zenxone_cart', JSON.stringify(cart));
}

/* ── Getters ── */
function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}
function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}
function getCart() {
  return cart;
}

/* ── Mutations ── */
function addToCart(product, color, size, qty) {
  const key = `${product.id}_${color}_${size}`;
  const existing = cart.find(i => i.key === key);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      key,
      id:    product.id,
      name:  product.name,
      image: product.images[0],
      color,
      size,
      qty,
      price: product.salePrice,
    });
  }

  saveCart();
  updateCartUI();
  animateCartBadge();
}

function removeFromCart(key) {
  cart = cart.filter(i => i.key !== key);
  saveCart();
  updateCartUI();
  /* Callers are responsible for re-rendering their views */
}

function changeQty(key, delta) {
  const item = cart.find(i => i.key === key);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  updateCartUI();
}

function changeCartItemSize(key, newSize) {
  const item = cart.find(i => i.key === key);
  if (!item || item.size === newSize) return;

  const mergeTarget = cart.find(
    i => i.id === item.id && i.color === item.color && i.size === newSize
  );
  if (mergeTarget) {
    mergeTarget.qty += item.qty;
    cart = cart.filter(i => i.key !== key);
  } else {
    item.size = newSize;
    item.key  = `${item.id}_${item.color}_${item.size}`;
  }

  saveCart();
  updateCartUI();
}

/* ── UI sync (badge + subtotal label) ── */
function updateCartUI() {
  const count = getCartCount();

  const badge    = document.getElementById('cartBadge');
  const mbbCount = document.getElementById('mbbCount');
  const subtotal = document.getElementById('cartSubtotal');

  if (badge)    badge.textContent    = count;
  if (mbbCount) mbbCount.textContent = count;
  if (subtotal) subtotal.textContent = `৳${getCartTotal().toLocaleString()}`;
}

function animateCartBadge() {
  const badge = document.getElementById('cartBadge');
  if (!badge) return;
  badge.classList.remove('pop');
  void badge.offsetWidth; // force reflow
  badge.classList.add('pop');
}

/* ── Helper: build star HTML ── */
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let html = '';
  for (let i = 0; i < full; i++) html += '<i class="fa-solid fa-star"></i>';
  if (half) html += '<i class="fa-solid fa-star-half-stroke"></i>';
  return html;
}

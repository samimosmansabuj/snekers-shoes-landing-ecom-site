/* ═══════════════════════════════════════════════════
   ZENXONE — cart-drawer.js
   Cart Drawer UI — render items, open/close, qty/size controls
   ═══════════════════════════════════════════════════ */

'use strict';

/* ════════════════════════════════════
   RENDER CART ITEMS (inside drawer)
════════════════════════════════════ */
function renderCartItems() {
  const cartItemsEl = document.getElementById('cartItems');
  const cartFooter  = document.getElementById('cartFooter');
  if (!cartItemsEl) return;

  const currentCart = getCart();

  if (currentCart.length === 0) {
    cartItemsEl.innerHTML = `
      <div class="cart-empty">
        <i class="fa-solid fa-bag-shopping"></i>
        <p>Your cart is empty.<br/>Explore our collection.</p>
      </div>`;
    if (cartFooter) cartFooter.style.display = 'none';
    return;
  }

  if (cartFooter) cartFooter.style.display = 'flex';
  cartItemsEl.innerHTML = '';

  currentCart.forEach(item => {
    const product = PRODUCTS.find(p => p.id === item.id);
    const sizes   = product ? product.sizes : [];

    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <div class="cart-item-img">
        <img src="${item.image}" alt="${item.name}" loading="lazy" />
      </div>
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p class="cart-item-meta">${item.color}</p>
        <label class="cart-item-size-label" for="cart-size-${item.key}">Size</label>
        <select class="cart-item-size" id="cart-size-${item.key}" data-key="${item.key}">
          ${sizes.map(s => `<option value="${s}" ${s === item.size ? 'selected' : ''}>${s}</option>`).join('')}
        </select>
        <p class="cart-item-price">৳${(item.price * item.qty).toLocaleString()}</p>
        <div class="cart-item-controls">
          <button class="qty-btn" data-key="${item.key}" data-delta="-1" aria-label="Decrease">
            <i class="fa-solid fa-minus"></i>
          </button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" data-key="${item.key}" data-delta="1" aria-label="Increase">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
      <button class="cart-item-remove" data-key="${item.key}" aria-label="Remove item">
        <i class="fa-solid fa-xmark"></i>
      </button>`;

    el.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        changeQty(btn.dataset.key, parseInt(btn.dataset.delta));
        renderCartItems();
        updateCheckoutSummary(); // sync checkout modal if open
      });
    });

    el.querySelector('.cart-item-size')?.addEventListener('change', e => {
      changeCartItemSize(item.key, e.target.value);
      renderCartItems();
      updateCheckoutSummary();
    });

    el.querySelector('.cart-item-remove').addEventListener('click', () => {
      removeFromCart(item.key);
      renderCartItems();
      updateCheckoutSummary();
    });

    cartItemsEl.appendChild(el);
  });

  // Update subtotal label
  const subtotal = document.getElementById('cartSubtotal');
  if (subtotal) subtotal.textContent = `৳${getCartTotal().toLocaleString()}`;
}

/* ════════════════════════════════════
   OPEN / CLOSE DRAWER
════════════════════════════════════ */
function openCartDrawer() {
  renderCartItems();
  document.getElementById('cartDrawer')?.classList.add('open');
  document.getElementById('drawerOverlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  document.getElementById('cartDrawer')?.classList.remove('open');
  document.getElementById('drawerOverlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

/* ════════════════════════════════════
   INIT — event listeners
════════════════════════════════════ */
function initCartDrawer() {
  const cartToggle        = document.getElementById('cartToggle');
  const drawerClose       = document.getElementById('drawerClose');
  const drawerOverlay     = document.getElementById('drawerOverlay');
  const continueShopBtn   = document.getElementById('continueShoppingBtn');
  const checkoutBtn       = document.getElementById('checkoutBtn');

  cartToggle?.addEventListener('click', openCartDrawer);
  drawerClose?.addEventListener('click', closeCartDrawer);
  drawerOverlay?.addEventListener('click', closeCartDrawer);
  continueShopBtn?.addEventListener('click', closeCartDrawer);

  checkoutBtn?.addEventListener('click', () => {
    if (getCart().length === 0) return;
    closeCartDrawer();
    openCheckoutModal();
  });
}

document.addEventListener('DOMContentLoaded', initCartDrawer);

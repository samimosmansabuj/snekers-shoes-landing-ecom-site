/* ═══════════════════════════════════════════════════
   ZENXONE — modal-product.js
   Product Detail Modal — open, close, image gallery,
   color/size/qty selection, add to cart
   ═══════════════════════════════════════════════════ */

'use strict';

let lastViewedProduct = null;

function openProductModal(product) {
  lastViewedProduct = product;

  let currentImg    = 0;
  let selectedColor = product.colors[0].name;
  let selectedSize  = product.sizes[0];
  let qty           = 1;

  const inner = document.getElementById('productModalInner');
  if (!inner) return;

  inner.innerHTML = `
    <div class="modal-gallery">
      <img class="modal-main-img" id="modalMainImg" src="${product.images[0]}" alt="${product.name}" />
      <div class="modal-thumbs">
        ${product.images.map((img, i) => `
          <div class="modal-thumb ${i === 0 ? 'active' : ''}" data-idx="${i}">
            <img src="${img}" alt="View ${i + 1}" loading="lazy" />
          </div>`).join('')}
      </div>
    </div>
    <div class="modal-info">
      <span class="card-badge modal-badge">${product.badge}</span>
      <h2 class="modal-name">${product.name}</h2>
      <div class="card-rating">
        <span class="stars">${renderStars(product.rating)}</span>
        <span>${product.rating} (${product.reviews} reviews)</span>
      </div>
      <p class="modal-desc">${product.description}</p>
      <ul class="modal-features">
        ${product.features.map(f => `<li>${f}</li>`).join('')}
      </ul>

      <div>
        <p class="modal-label">Color — <span id="modalColorName">${selectedColor}</span></p>
        <div class="card-colors" id="modalColors">
          ${product.colors.map((c, i) => `
            <div class="color-dot ${i === 0 ? 'active' : ''}"
                 style="background:${c.hex};"
                 title="${c.name}"
                 data-color="${c.name}">
            </div>`).join('')}
        </div>
      </div>

      <div>
        <p class="modal-label">Size</p>
        <div class="modal-size-grid" id="modalSizes">
          ${product.sizes.map((s, i) => `
            <button class="modal-size-chip ${i === 0 ? 'active' : ''}" data-size="${s}">${s}</button>
          `).join('')}
        </div>
      </div>

      <div>
        <p class="modal-label">Quantity</p>
        <div class="modal-qty-row">
          <button class="qty-btn" id="modalQtyMinus" aria-label="Decrease"><i class="fa-solid fa-minus"></i></button>
          <span class="qty-num" id="modalQtyNum">1</span>
          <button class="qty-btn" id="modalQtyPlus" aria-label="Increase"><i class="fa-solid fa-plus"></i></button>
        </div>
      </div>

      <div class="modal-price-row">
        <span class="price-original">৳${product.originalPrice.toLocaleString()}</span>
        <span class="price-sale">৳${product.salePrice.toLocaleString()}</span>
        <span class="discount-badge">-${product.discount}</span>
      </div>

      <div class="modal-actions">
        <button class="btn-primary" id="modalAddCart">
          <i class="fa-solid fa-bag-shopping"></i> Add to Cart
        </button>
        <button class="btn-ghost" id="modalBuyNow">Buy Now</button>
      </div>
    </div>`;

  /* ── Thumbnail switching ── */
  inner.querySelectorAll('.modal-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      currentImg = parseInt(thumb.dataset.idx);
      document.getElementById('modalMainImg').src = product.images[currentImg];
      inner.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });

  /* ── Color selection ── */
  inner.querySelectorAll('#modalColors .color-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      selectedColor = dot.dataset.color;
      document.getElementById('modalColorName').textContent = selectedColor;
      inner.querySelectorAll('#modalColors .color-dot').forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
    });
  });

  /* ── Size selection ── */
  inner.querySelectorAll('#modalSizes .modal-size-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      selectedSize = chip.dataset.size;
      inner.querySelectorAll('#modalSizes .modal-size-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });

  /* ── Qty controls ── */
  document.getElementById('modalQtyMinus').addEventListener('click', () => {
    if (qty > 1) { qty--; document.getElementById('modalQtyNum').textContent = qty; }
  });
  document.getElementById('modalQtyPlus').addEventListener('click', () => {
    qty++; document.getElementById('modalQtyNum').textContent = qty;
  });

  /* ── Add to cart ── */
  document.getElementById('modalAddCart').addEventListener('click', () => {
    addToCart(product, selectedColor, selectedSize, qty);
    closeProductModal();
    openCartDrawer();
  });

  /* ── Buy Now ── */
  document.getElementById('modalBuyNow').addEventListener('click', () => {
    addToCart(product, selectedColor, selectedSize, qty);
    closeProductModal();
    openCartDrawer();
  });

  document.getElementById('productModalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  document.getElementById('productModalOverlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

function initProductModal() {
  document.getElementById('productModalClose')?.addEventListener('click', closeProductModal);
  document.getElementById('productModalOverlay')?.addEventListener('click', e => {
    if (e.target === document.getElementById('productModalOverlay')) closeProductModal();
  });
}

document.addEventListener('DOMContentLoaded', initProductModal);

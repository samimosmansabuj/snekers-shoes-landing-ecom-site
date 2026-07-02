/* ═══════════════════════════════════════════════════
   STRYDE — Luxury Footwear  |  script.js
   ═══════════════════════════════════════════════════ */

'use strict';

/* ════════════════════════════════════
   PRODUCT DATA
════════════════════════════════════ */
const PRODUCTS = [
  {
    id: 1,
    name: 'Aether Low',
    badge: 'Best Seller',
    description: 'A minimalist low-top silhouette crafted from full-grain Italian leather with a cloud-cushion sole.',
    features: ['Full-grain Italian leather upper', 'Memory foam insole', 'Rubber lug outsole', 'Hand-stitched welt construction'],
    rating: 4.9,
    reviews: 312,
    colors: [
      { name: 'Midnight', hex: '#1a1a2e' },
      { name: 'Ivory', hex: '#f0ece0' },
      { name: 'Cognac', hex: '#8b4513' },
    ],
    sizes: ['40', '41', '42', '43', '44', '45'],
    originalPrice: 8500,
    salePrice: 6800,
    discount: '20%',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
    ],
  },
  {
    id: 2,
    name: 'Meridian Runner',
    badge: 'New Arrival',
    description: 'A technical runner reimagined for everyday life. Engineered mesh upper meets an ultra-responsive foam platform.',
    features: ['Engineered mesh upper', 'Ultra-light responsive foam', 'Padded ankle collar', 'Reflective details'],
    rating: 4.7,
    reviews: 198,
    colors: [
      { name: 'Navy', hex: '#0b1120' },
      { name: 'Slate', hex: '#708090' },
      { name: 'Chalk', hex: '#e8e4da' },
    ],
    sizes: ['40', '41', '42', '43', '44', '45'],
    originalPrice: 7200,
    salePrice: 5900,
    discount: '18%',
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80',
      'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800&q=80',
    ],
  },
  {
    id: 3,
    name: 'Veld Chelsea',
    badge: 'Limited Edition',
    description: 'An elevated Chelsea boot with elastic side panels and a sleek pointed toe — the definition of effortless luxury.',
    features: ['Suede leather upper', 'Elastic gore panels', 'Leather lining', 'Stacked heel construction'],
    rating: 4.8,
    reviews: 145,
    colors: [
      { name: 'Black', hex: '#0d0d0d' },
      { name: 'Mocha', hex: '#6b4226' },
      { name: 'Sand', hex: '#c4a882' },
    ],
    sizes: ['40', '41', '42', '43', '44', '45'],
    originalPrice: 11000,
    salePrice: 8900,
    discount: '19%',
    images: [
      'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&q=80',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80',
      'https://images.unsplash.com/photo-1531310197839-ccf54634509e?w=800&q=80',
    ],
  },
  {
    id: 4,
    name: 'Solstice Slip',
    badge: 'New Arrival',
    description: 'Effortless entry, premium feel. A slip-on mule sculpted from nappa leather with a featherweight platform.',
    features: ['Nappa leather upper', 'Elasticated back strap', 'EVA platform sole', 'Leather footbed'],
    rating: 4.6,
    reviews: 87,
    colors: [
      { name: 'White', hex: '#f5f5f0' },
      { name: 'Blush', hex: '#e8b4a0' },
      { name: 'Ebony', hex: '#2c2c2c' },
    ],
    sizes: ['40', '41', '42', '43', '44', '45'],
    originalPrice: 6500,
    salePrice: 5200,
    discount: '20%',
    images: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800&q=80',
    ],
  },
];

/* ════════════════════════════════════
   STATE
════════════════════════════════════ */
let cart = JSON.parse(localStorage.getItem('stryde_cart') || '[]');
let lastViewedProduct = null;
let countdownInterval = null;

/* ════════════════════════════════════
   SELECTORS
════════════════════════════════════ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const loader               = $('#loader');
const navbar               = $('#navbar');
const navMenuBtn           = $('#navMenuBtn');
const navMobileMenu        = $('#navMobileMenu');
const cartToggle           = $('#cartToggle');
const cartBadge            = $('#cartBadge');
const cartDrawer           = $('#cartDrawer');
const drawerOverlay        = $('#drawerOverlay');
const drawerClose          = $('#drawerClose');
const cartItemsEl          = $('#cartItems');
const cartFooter           = $('#cartFooter');
const cartSubtotal         = $('#cartSubtotal');
const checkoutBtn          = $('#checkoutBtn');
const continueShoppingBtn  = $('#continueShoppingBtn');

const productSkeleton      = $('#productSkeleton');
const productGrid          = $('#productGrid');

const productModalOverlay  = $('#productModalOverlay');
const productModal         = $('#productModal');
const productModalClose    = $('#productModalClose');
const productModalInner    = $('#productModalInner');

const checkoutModalOverlay = $('#checkoutModalOverlay');
const checkoutModal        = $('#checkoutModal');
const checkoutModalClose   = $('#checkoutModalClose');
const checkoutOrderItems   = $('#checkoutOrderItems');
const coSubtotal           = $('#coSubtotal');
const coDelivery           = $('#coDelivery');
const coGrand              = $('#coGrand');
const deliveryDistrictSel  = $('#deliverydistrict');
const placeOrderBtn        = $('#placeOrderBtn');

const successModalOverlay  = $('#successModalOverlay');
const countdownNum         = $('#countdownNum');
const returnHomeBtn        = $('#returnHomeBtn');

const mobileBottomBar      = $('#mobileBottomBar');
const mbbCartBtn           = $('#mbbCartBtn');
const mbbBuyBtn            = $('#mbbBuyBtn');
const mbbCount             = $('#mbbCount');

/* ════════════════════════════════════
   LOADER
════════════════════════════════════ */
window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('hidden');
    initRevealObserver();
    renderProducts();
    loadDistricts();
  }, 1000);
});

/* ════════════════════════════════════
   NAVBAR
════════════════════════════════════ */
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

navMenuBtn.addEventListener('click', () => {
  navMobileMenu.classList.toggle('open');
});

// Close mobile menu when a link is clicked
$$('.mobile-link').forEach(link => {
  link.addEventListener('click', () => navMobileMenu.classList.remove('open'));
});

/* ════════════════════════════════════
   SCROLL REVEAL
════════════════════════════════════ */
function initRevealObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  $$('.section-reveal').forEach(el => observer.observe(el));
}

/* ════════════════════════════════════
   RENDER PRODUCTS
════════════════════════════════════ */
function renderProducts() {
  setTimeout(() => {
    productSkeleton.style.display = 'none';
    productGrid.style.display = 'grid';

    PRODUCTS.forEach(product => {
      const card = createProductCard(product);
      productGrid.appendChild(card);
    });
  }, 600);
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.dataset.id = product.id;

  const selectedColor = product.colors[0];
  const selectedSize  = product.sizes[0];

  card.innerHTML = `
    <div class="card-img-wrap" data-id="${product.id}">
      <img src="${product.images[0]}" alt="${product.name}" loading="lazy" />
      <span class="card-badge">${product.badge}</span>
    </div>
    <div class="card-body">
      <h3 class="card-name" data-id="${product.id}">${product.name}</h3>
      <div class="card-rating">
        <span class="stars">${renderStars(product.rating)}</span>
        <span>${product.rating} (${product.reviews})</span>
      </div>
      <div class="card-colors">
        ${product.colors.map((c, i) => `
          <div class="color-dot ${i === 0 ? 'active' : ''}"
               style="background:${c.hex};"
               title="${c.name}"
               data-color="${c.name}"
               data-card-id="${product.id}">
          </div>`).join('')}
      </div>
      <div class="card-sizes">
        ${product.sizes.map((s, i) => `
          <button class="size-chip ${i === 0 ? 'active' : ''}"
                  data-size="${s}"
                  data-card-id="${product.id}">
            ${s}
          </button>`).join('')}
      </div>
      <div class="card-price">
        <span class="price-original">৳${product.originalPrice.toLocaleString()}</span>
        <span class="price-sale">৳${product.salePrice.toLocaleString()}</span>
        <span class="discount-badge">-${product.discount}</span>
      </div>
    </div>
    <div class="card-actions">
      <button class="btn-primary add-to-cart-btn" data-id="${product.id}">
        <i class="fa-solid fa-bag-shopping"></i> Add to Cart
      </button>
      <button class="btn-ghost buy-now-btn" data-id="${product.id}">
        Buy Now
      </button>
    </div>
  `;

  // Color selection
  card.querySelectorAll('.color-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      card.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
    });
  });

  // Size selection
  card.querySelectorAll('.size-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      card.querySelectorAll('.size-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });

  // Open product modal
  card.querySelector('.card-img-wrap').addEventListener('click', () => openProductModal(product));
  card.querySelector('.card-name').addEventListener('click', () => openProductModal(product));

  // Add to cart
  card.querySelector('.add-to-cart-btn').addEventListener('click', () => {
    const color = card.querySelector('.color-dot.active')?.dataset.color || product.colors[0].name;
    const size  = card.querySelector('.size-chip.active')?.dataset.size  || product.sizes[0];
    addToCart(product, color, size, 1);
    showMobileBottomBar(product);
  });

  // Buy now
  card.querySelector('.buy-now-btn').addEventListener('click', () => {
    const color = card.querySelector('.color-dot.active')?.dataset.color || product.colors[0].name;
    const size  = card.querySelector('.size-chip.active')?.dataset.size  || product.sizes[0];
    addToCart(product, color, size, 1);
    openCartDrawer();
  });

  return card;
}

function renderStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5;
  let html = '';
  for (let i = 0; i < full; i++) html += '<i class="fa-solid fa-star"></i>';
  if (half) html += '<i class="fa-solid fa-star-half-stroke"></i>';
  return html;
}

/* ════════════════════════════════════
   PRODUCT MODAL
════════════════════════════════════ */
function openProductModal(product) {
  lastViewedProduct = product;
  let currentImg   = 0;
  let selectedColor = product.colors[0].name;
  let selectedSize  = product.sizes[0];
  let qty           = 1;

  productModalInner.innerHTML = `
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
          <button class="qty-btn" id="modalQtyMinus"><i class="fa-solid fa-minus"></i></button>
          <span class="qty-num" id="modalQtyNum">1</span>
          <button class="qty-btn" id="modalQtyPlus"><i class="fa-solid fa-plus"></i></button>
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
        <button class="btn-ghost" id="modalBuyNow">
          Buy Now
        </button>
      </div>
    </div>
  `;

  // Thumbnail switching
  productModalInner.querySelectorAll('.modal-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      currentImg = parseInt(thumb.dataset.idx);
      $('#modalMainImg').src = product.images[currentImg];
      productModalInner.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });

  // Color selection
  productModalInner.querySelectorAll('#modalColors .color-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      selectedColor = dot.dataset.color;
      $('#modalColorName').textContent = selectedColor;
      productModalInner.querySelectorAll('#modalColors .color-dot').forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
    });
  });

  // Size selection
  productModalInner.querySelectorAll('#modalSizes .modal-size-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      selectedSize = chip.dataset.size;
      productModalInner.querySelectorAll('#modalSizes .modal-size-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });

  // Qty controls
  $('#modalQtyMinus').addEventListener('click', () => {
    if (qty > 1) { qty--; $('#modalQtyNum').textContent = qty; }
  });
  $('#modalQtyPlus').addEventListener('click', () => {
    qty++;
    $('#modalQtyNum').textContent = qty;
  });

  // Add to cart
  $('#modalAddCart').addEventListener('click', () => {
    addToCart(product, selectedColor, selectedSize, qty);
    closeProductModal();
    openCartDrawer();
  });

  // Buy now
  $('#modalBuyNow').addEventListener('click', () => {
    addToCart(product, selectedColor, selectedSize, qty);
    closeProductModal();
    openCartDrawer();
  });

  productModalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  productModalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

productModalClose.addEventListener('click', closeProductModal);
productModalOverlay.addEventListener('click', e => {
  if (e.target === productModalOverlay) closeProductModal();
});

/* ════════════════════════════════════
   CART
════════════════════════════════════ */
function saveCart() {
  localStorage.setItem('stryde_cart', JSON.stringify(cart));
}

function addToCart(product, color, size, qty) {
  const key = `${product.id}_${color}_${size}`;
  const existing = cart.find(i => i.key === key);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      key,
      id: product.id,
      name: product.name,
      image: product.images[0],
      color,
      size,
      qty,
      price: product.salePrice,
    });
  }

  saveCart();
  updateCartUI();
  animateBadge();
}

function removeFromCart(key) {
  cart = cart.filter(i => i.key !== key);
  saveCart();
  updateCartUI();
  renderCartItems();
  updateCheckoutSummary();
}

function changeQty(key, delta) {
  const item = cart.find(i => i.key === key);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  updateCartUI();
  renderCartItems();
  updateCheckoutSummary();
}

function getCartTotal() {
  return cart.reduce((sum, i) => sum + i.price * i.qty, 0);
}

function getCartCount() {
  return cart.reduce((sum, i) => sum + i.qty, 0);
}

function updateCartUI() {
  const count = getCartCount();
  cartBadge.textContent = count;
  mbbCount.textContent  = count;
  cartSubtotal.textContent = `৳${getCartTotal().toLocaleString()}`;
}

function animateBadge() {
  cartBadge.classList.remove('pop');
  void cartBadge.offsetWidth; // reflow
  cartBadge.classList.add('pop');
}

function renderCartItems() {
  if (cart.length === 0) {
    cartItemsEl.innerHTML = `
      <div class="cart-empty">
        <i class="fa-solid fa-bag-shopping"></i>
        <p>Your cart is empty.<br/>Explore our collection.</p>
      </div>`;
    cartFooter.style.display = 'none';
    return;
  }

  cartFooter.style.display = 'flex';
  cartItemsEl.innerHTML = '';

  cart.forEach(item => {
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <div class="cart-item-img">
        <img src="${item.image}" alt="${item.name}" loading="lazy" />
      </div>
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p class="cart-item-meta">${item.color} · Size ${item.size}</p>
        <p class="cart-item-price">৳${(item.price * item.qty).toLocaleString()}</p>
        <div class="cart-item-controls">
          <button class="qty-btn" data-key="${item.key}" data-delta="-1">
            <i class="fa-solid fa-minus"></i>
          </button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" data-key="${item.key}" data-delta="1">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
      <button class="cart-item-remove" data-key="${item.key}" aria-label="Remove">
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;

    el.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', () => changeQty(btn.dataset.key, parseInt(btn.dataset.delta)));
    });
    el.querySelector('.cart-item-remove').addEventListener('click', () => removeFromCart(item.key));

    cartItemsEl.appendChild(el);
  });

  cartSubtotal.textContent = `৳${getCartTotal().toLocaleString()}`;
}

/* ════════════════════════════════════
   CART DRAWER
════════════════════════════════════ */
function openCartDrawer() {
  renderCartItems();
  cartDrawer.classList.add('open');
  drawerOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  cartDrawer.classList.remove('open');
  drawerOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

cartToggle.addEventListener('click', openCartDrawer);
drawerClose.addEventListener('click', closeCartDrawer);
drawerOverlay.addEventListener('click', closeCartDrawer);
continueShoppingBtn.addEventListener('click', closeCartDrawer);

checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) return;
  closeCartDrawer();
  openCheckoutModal();
});

/* ════════════════════════════════════
   DISTRICT API
════════════════════════════════════ */
function loadDistricts() {
  fetch('https://bdapi.vercel.app/api/v.1/district')
    .then(res => res.json())
    .then(data => {
      if (data.status === 200 && data.success) {
        data.data.forEach(district => {
          const option = document.createElement('option');
          option.value = district.name.toLowerCase();
          option.setAttribute('district_id', district.id);
          option.textContent = district.bn_name;
          deliveryDistrictSel.appendChild(option);
        });
      }
    })
    .catch(() => {
      // Fallback districts if API fails
      const fallback = [
        { value: 'dhaka', text: 'ঢাকা' },
        { value: 'chattogram', text: 'চট্টগ্রাম' },
        { value: 'sylhet', text: 'সিলেট' },
        { value: 'rajshahi', text: 'রাজশাহী' },
        { value: 'khulna', text: 'খুলনা' },
        { value: 'barishal', text: 'বরিশাল' },
      ];
      fallback.forEach(d => {
        const option = document.createElement('option');
        option.value = d.value;
        option.textContent = d.text;
        deliveryDistrictSel.appendChild(option);
      });
    });
}

function getDeliveryCharge(district) {
  if (!district) return 0;
  if (district === 'dhaka')      return 80;
  if (district === 'chattogram') return 120;
  return 150;
}

/* ════════════════════════════════════
   CHECKOUT MODAL
════════════════════════════════════ */
function openCheckoutModal() {
  updateCheckoutSummary();
  checkoutModalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
  checkoutModalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

checkoutModalClose.addEventListener('click', closeCheckoutModal);
checkoutModalOverlay.addEventListener('click', e => {
  if (e.target === checkoutModalOverlay) closeCheckoutModal();
});

function updateCheckoutSummary() {
  // Render items
  checkoutOrderItems.innerHTML = '';
  cart.forEach(item => {
    const el = document.createElement('div');
    el.className = 'co-item';
    el.innerHTML = `
      <div class="co-item-img">
        <img src="${item.image}" alt="${item.name}" loading="lazy" />
      </div>
      <div class="co-item-info">
        <h5>${item.name}</h5>
        <p>${item.color} · Size ${item.size}</p>
      </div>
      <div class="co-item-controls">
        <button class="qty-btn co-qty" data-key="${item.key}" data-delta="-1">
          <i class="fa-solid fa-minus"></i>
        </button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn co-qty" data-key="${item.key}" data-delta="1">
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
      <span class="co-item-price">৳${(item.price * item.qty).toLocaleString()}</span>
      <button class="co-item-remove" data-key="${item.key}" aria-label="Remove">
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;

    el.querySelectorAll('.co-qty').forEach(btn => {
      btn.addEventListener('click', () => {
        changeQty(btn.dataset.key, parseInt(btn.dataset.delta));
      });
    });
    el.querySelector('.co-item-remove').addEventListener('click', () => removeFromCart(item.key));

    checkoutOrderItems.appendChild(el);
  });

  recalcTotals();
}

function recalcTotals() {
  const subtotal = getCartTotal();
  const district = deliveryDistrictSel.value;
  const delivery = district ? getDeliveryCharge(district) : 0;
  const grand    = subtotal + delivery;

  coSubtotal.textContent = `৳${subtotal.toLocaleString()}`;
  coDelivery.textContent = district ? `৳${delivery}` : '৳—';
  coGrand.textContent    = `৳${grand.toLocaleString()}`;
}

deliveryDistrictSel.addEventListener('change', recalcTotals);

/* ════════════════════════════════════
   FORM VALIDATION
════════════════════════════════════ */
function validateForm() {
  const fields = [
    { id: 'custName',    msg: 'Please enter your name.' },
    { id: 'custPhone',   msg: 'Please enter your phone number.' },
    { id: 'custEmail',   msg: 'Please enter your email address.' },
    { id: 'custAddress', msg: 'Please enter your address.' },
  ];

  let valid = true;

  // Clear previous errors
  $$('.form-group').forEach(g => g.classList.remove('error'));

  fields.forEach(f => {
    const input = $(`#${f.id}`);
    if (!input || !input.value.trim()) {
      input.closest('.form-group').classList.add('error');
      valid = false;
    }
  });

  if (!deliveryDistrictSel.value) {
    deliveryDistrictSel.closest('.form-group').classList.add('error');
    valid = false;
  }

  return valid;
}

/* ════════════════════════════════════
   PLACE ORDER
════════════════════════════════════ */
placeOrderBtn.addEventListener('click', () => {
  if (cart.length === 0) return;
  if (!validateForm()) return;

  closeCheckoutModal();
  openSuccessModal();
});

/* ════════════════════════════════════
   SUCCESS MODAL
════════════════════════════════════ */
function openSuccessModal() {
  successModalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  let count = 6;
  countdownNum.textContent = count;

  if (countdownInterval) clearInterval(countdownInterval);

  countdownInterval = setInterval(() => {
    count--;
    countdownNum.textContent = count;
    if (count <= 0) {
      clearInterval(countdownInterval);
      finishOrder();
    }
  }, 1000);
}

function finishOrder() {
  // Reset everything
  cart = [];
  saveCart();
  updateCartUI();

  // Clear form
  ['custName','custPhone','custWhatsapp','custEmail','custAddress'].forEach(id => {
    const el = $(`#${id}`);
    if (el) el.value = '';
  });
  if (deliveryDistrictSel) deliveryDistrictSel.selectedIndex = 0;

  // Close modal
  successModalOverlay.classList.remove('open');
  document.body.style.overflow = '';

  // Scroll to hero
  $('#hero').scrollIntoView({ behavior: 'smooth' });

  // Hide mobile bottom bar
  mobileBottomBar.style.display = 'none';
}

returnHomeBtn.addEventListener('click', () => {
  if (countdownInterval) clearInterval(countdownInterval);
  finishOrder();
});

successModalOverlay.addEventListener('click', e => {
  if (e.target === successModalOverlay) {
    // Don't close on overlay click during success
  }
});

/* ════════════════════════════════════
   MOBILE BOTTOM BAR
════════════════════════════════════ */
function showMobileBottomBar(product) {
  lastViewedProduct = product;
  mobileBottomBar.style.display = 'flex';
}

mbbCartBtn.addEventListener('click', openCartDrawer);

mbbBuyBtn.addEventListener('click', () => {
  if (cart.length > 0) {
    openCartDrawer();
  } else if (lastViewedProduct) {
    addToCart(lastViewedProduct, lastViewedProduct.colors[0].name, lastViewedProduct.sizes[0], 1);
    openCartDrawer();
  }
});

/* ════════════════════════════════════
   SMOOTH NAV LINKS
════════════════════════════════════ */
$$('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = $(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      navMobileMenu.classList.remove('open');
    }
  });
});

/* ════════════════════════════════════
   INIT ON DOM READY
════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();

  // Restore cart badge on page load
  if (cart.length > 0) {
    updateCartUI();
  }

  // Show mobile bottom bar if items in cart (returning user)
  if (cart.length > 0 && window.innerWidth <= 680) {
    mobileBottomBar.style.display = 'flex';
  }
});

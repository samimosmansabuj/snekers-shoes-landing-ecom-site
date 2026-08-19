/* ═══════════════════════════════════════════════════
   ZENXONE — products.js
   Product Grid + Swiper Slider
   index.html এর <template id="productCardTemplate"> থেকে
   card clone করে PRODUCTS data দিয়ে fill করে।
   ═══════════════════════════════════════════════════ */

'use strict';

/* ════════════════════════════════════
   CARD BUILDER — HTML template থেকে clone
════════════════════════════════════ */
function buildProductCard(product) {
  const template = document.getElementById('productCardTemplate');
  if (!template) {
    console.error('productCardTemplate not found in HTML');
    return null;
  }

  // Clone the template
  const card = template.content.firstElementChild.cloneNode(true);
  card.dataset.id = product.id;

  // Image
  const img = card.querySelector('.card-product-img');
  img.src = product.images[0];
  img.alt = product.name;

  // Badge (price overlay on image)
  card.querySelector('.card-price-sale').textContent = `৳${product.salePrice.toLocaleString()}`;
  card.querySelector('.card-price-discount').textContent = `(-${product.discount})`;

  // Name, stars, rating text
  card.querySelector('.card-name').textContent = product.name;
  card.querySelector('.card-stars').innerHTML = renderStars(product.rating);
  card.querySelector('.card-rating-text').textContent = `${product.rating} (${product.reviews})`;

  // Event: open product modal on image or name click
  card.querySelector('.card-img-wrap').addEventListener('click', () => openProductModal(product));
  card.querySelector('.card-name').addEventListener('click', () => openProductModal(product));

  // Event: Add to Cart
  card.querySelector('.add-to-cart-btn').addEventListener('click', () => {
    addToCart(product, product.colors[0].name, product.sizes[0], 1);
    showMobileBottomBar(product);
  });

  // Event: Buy Now
  card.querySelector('.buy-now-btn').addEventListener('click', () => {
    addToCart(product, product.colors[0].name, product.sizes[0], 1);
    openCartDrawer();
  });

  return card;
}

/* ════════════════════════════════════
   RENDER PRODUCT GRID (main collection)
════════════════════════════════════ */
function renderProductGrid() {
  const skeleton = document.getElementById('productSkeleton');
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  // Simulate loading delay (replace with actual API fetch later)
  setTimeout(() => {
    if (skeleton) skeleton.style.display = 'none';
    grid.style.display = 'grid';
    grid.innerHTML = '';

    PRODUCTS.forEach(product => {
      const card = buildProductCard(product);
      if (card) grid.appendChild(card);
    });
  }, 600);
}

/* ════════════════════════════════════
   RENDER PRODUCT SWIPER (featured slider)
════════════════════════════════════ */
function renderProductSwiper() {
  const wrapper = document.getElementById('productSwiperWrapper');
  if (!wrapper) return;

  wrapper.innerHTML = '';

  PRODUCTS.forEach(product => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';

    const card = buildProductCard(product);
    if (card) slide.appendChild(card);

    wrapper.appendChild(slide);
  });

  // Init Swiper after slides are in DOM
  new Swiper('.product-swiper', {
    loop: false,
    rewind: false,
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: 0,
    centeredSlides: false,
    watchOverflow: true,
    allowTouchMove: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      640: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 0 },
      900: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 8 },
      1200: { slidesPerView: 5, slidesPerGroup: 5, spaceBetween: 10 },
    },
  });
}

/* ════════════════════════════════════
   INIT — loader হওয়ার পরে call হবে main.js থেকে
════════════════════════════════════ */
function initProducts() {
  renderProductGrid();
  renderProductSwiper();
}

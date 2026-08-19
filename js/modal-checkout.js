/* ═══════════════════════════════════════════════════
   ZENXONE — modal-checkout.js
   Checkout Modal · District API · Form Validation · Order Summary
   ═══════════════════════════════════════════════════ */

'use strict';

/* ════════════════════════════════════
   DISTRICT DATA
════════════════════════════════════ */
function getDeliveryCharge(district) {
  if (!district) return 0;
  if (district === 'dhaka') return 80;
  if (district === 'chattogram') return 120;
  return 150;
}

function loadDistricts() {
  const sel = document.getElementById('deliverydistrict');
  if (!sel) return;

  fetch('https://bdapi.vercel.app/api/v.1/district')
    .then(res => res.json())
    .then(data => {
      if (data.status === 200 && data.success) {
        data.data.forEach(d => {
          const opt = document.createElement('option');
          opt.value = d.name.toLowerCase();
          opt.setAttribute('district_id', d.id);
          opt.textContent = d.bn_name;
          sel.appendChild(opt);
        });
      }
    })
    .catch(() => {
      // Fallback districts if API fails
      [
        { value: 'dhaka', text: 'ঢাকা' },
        { value: 'chattogram', text: 'চট্টগ্রাম' },
        { value: 'sylhet', text: 'সিলেট' },
        { value: 'rajshahi', text: 'রাজশাহী' },
        { value: 'khulna', text: 'খুলনা' },
        { value: 'barishal', text: 'বরিশাল' },
      ].forEach(d => {
        const opt = document.createElement('option');
        opt.value = d.value;
        opt.textContent = d.text;
        sel.appendChild(opt);
      });
    });
}

/* ════════════════════════════════════
   ORDER SUMMARY RENDER
════════════════════════════════════ */
function updateCheckoutSummary() {
  const container = document.getElementById('checkoutOrderItems');
  if (!container) return;

  container.innerHTML = '';
  const currentCart = getCart();

  currentCart.forEach(item => {
    const product = PRODUCTS.find(p => p.id === item.id);
    const sizes = product ? product.sizes : [];

    const el = document.createElement('div');
    el.className = 'co-item';
    el.innerHTML = `
      <div class="co-item-img">
        <img src="${item.image}" alt="${item.name}" loading="lazy" />
      </div>
      <div class="co-item-details">
        <div class="co-item-header">
          <h5 title="${item.name}">${item.name}</h5>
        </div>
        <div class="co-item-size-wrapper">
          <label class="co-item-size-label" for="co-size-${item.key}">Size</label>
          <select class="co-item-size" id="co-size-${item.key}" data-key="${item.key}">
            ${sizes.map(s => `<option value="${s}" ${s === item.size ? 'selected' : ''}>${s}</option>`).join('')}
          </select>
        </div>
        <div class="co-item-actions">
          <div class="co-item-controls">
            <button class="qty-btn co-qty" data-key="${item.key}" data-delta="-1" aria-label="Decrease">
              <i class="fa-solid fa-minus"></i>
            </button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn co-qty" data-key="${item.key}" data-delta="1" aria-label="Increase">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
          <span class="co-item-price">৳${(item.price * item.qty).toLocaleString()}</span>
          <button class="co-item-remove" data-key="${item.key}" aria-label="Remove">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>`;

    el.querySelectorAll('.co-qty').forEach(btn => {
      btn.addEventListener('click', () => {
        changeQty(btn.dataset.key, parseInt(btn.dataset.delta));
        updateCheckoutSummary();
        renderCartItems(); // keep drawer in sync
      });
    });
    el.querySelector('.co-item-size')?.addEventListener('change', e => {
      changeCartItemSize(item.key, e.target.value);
      updateCheckoutSummary();
      renderCartItems();
    });
    el.querySelector('.co-item-remove').addEventListener('click', () => {
      removeFromCart(item.key);
      updateCheckoutSummary();
      renderCartItems();
    });

    container.appendChild(el);
  });

  recalcTotals();
}

function recalcTotals() {
  const district = document.getElementById('deliverydistrict')?.value;
  const subtotal = getCartTotal();
  const delivery = district ? getDeliveryCharge(district) : 0;
  const grand = subtotal + delivery;

  const coSubtotal = document.getElementById('coSubtotal');
  const coDelivery = document.getElementById('coDelivery');
  const coGrand = document.getElementById('coGrand');

  if (coSubtotal) coSubtotal.textContent = `৳${subtotal.toLocaleString()}`;
  if (coDelivery) coDelivery.textContent = district ? `৳${delivery}` : '৳—';
  if (coGrand) coGrand.textContent = `৳${grand.toLocaleString()}`;
}

/* ════════════════════════════════════
   FORM VALIDATION
════════════════════════════════════ */
function validateForm() {
  const fields = [
    { id: 'custName', msg: 'Please enter your name.' },
    { id: 'custPhone', msg: 'Please enter your phone number.' },
    { id: 'custEmail', msg: 'Please enter your email address.' },
    { id: 'custAddress', msg: 'Please enter your address.' },
  ];

  let valid = true;
  document.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));

  fields.forEach(f => {
    const input = document.getElementById(f.id);
    if (!input || !input.value.trim()) {
      input?.closest('.form-group')?.classList.add('error');
      valid = false;
    }
  });

  const districtSel = document.getElementById('deliverydistrict');
  if (!districtSel?.value) {
    districtSel?.closest('.form-group')?.classList.add('error');
    valid = false;
  }

  return valid;
}

/* ════════════════════════════════════
   OPEN / CLOSE
════════════════════════════════════ */
function openCheckoutModal() {
  updateCheckoutSummary();
  document.getElementById('checkoutModalOverlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
  document.getElementById('checkoutModalOverlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

/* ════════════════════════════════════
   INIT
════════════════════════════════════ */
function initCheckoutModal() {
  loadDistricts();

  document.getElementById('checkoutModalClose')?.addEventListener('click', closeCheckoutModal);
  document.getElementById('checkoutModalOverlay')?.addEventListener('click', e => {
    if (e.target === document.getElementById('checkoutModalOverlay')) closeCheckoutModal();
  });
  document.getElementById('deliverydistrict')?.addEventListener('change', recalcTotals);

  document.getElementById('placeOrderBtn')?.addEventListener('click', async () => {
    const cartItems = getCart();
    if (cartItems.length === 0) return;
    if (!validateForm()) return;

    const btn = document.getElementById('placeOrderBtn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
    btn.disabled = true;

    try {
      const trackingData = window.getAttributionData ? window.getAttributionData() : {};
      
      const payload = {
        name: document.getElementById('custName').value.trim(),
        phone: document.getElementById('custPhone').value.trim(),
        address: document.getElementById('custAddress').value.trim(),
        district: document.getElementById('deliverydistrict').value,
        upazila: document.getElementById('deliveryUpazila')?.value || '',
        items: cartItems.map(item => {
          let vId = item.variant_id;
          if (!vId && typeof PRODUCTS !== 'undefined') {
            const prod = PRODUCTS.find(p => p.id === item.id);
            if (prod && prod.variants) {
              const matched = prod.variants.find(v => String(v.attributes?.size) === String(item.size));
              if (matched) vId = matched.id;
            }
          }
          return {
            product_id: item.id,
            variant_id: vId || null,
            quantity: item.qty
          };
        }),
        ...trackingData
      };

      const response = await fetch('https://api.zenxone.com/api/checkout/place-order/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      // Order successful
      if (typeof clearCart === 'function') clearCart();
      closeCheckoutModal();
      openSuccessModal();
    } catch (error) {
      console.error('Order error:', error);
      alert('There was an error placing your order. Please try again.');
    } finally {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }
  });
}

document.addEventListener('DOMContentLoaded', initCheckoutModal);

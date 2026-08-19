/* ═══════════════════════════════════════════════════
   ZENXONE — modal-success.js
   Success Modal · Countdown · Order Finish / Reset
   ═══════════════════════════════════════════════════ */

'use strict';

let countdownInterval = null;

function openSuccessModal() {
  const overlay     = document.getElementById('successModalOverlay');
  const countdownEl = document.getElementById('countdownNum');
  if (!overlay) return;

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  let count = 6;
  if (countdownEl) countdownEl.textContent = count;

  if (countdownInterval) clearInterval(countdownInterval);

  countdownInterval = setInterval(() => {
    count--;
    if (countdownEl) countdownEl.textContent = count;
    if (count <= 0) {
      clearInterval(countdownInterval);
      finishOrder();
    }
  }, 1000);
}

function finishOrder() {
  // Clear cart state
  cart = [];
  saveCart();
  updateCartUI();

  // Clear checkout form fields
  ['custName', 'custPhone', 'custWhatsapp', 'custEmail', 'custAddress'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  const districtSel = document.getElementById('deliverydistrict');
  if (districtSel) districtSel.selectedIndex = 0;

  // Close success modal
  document.getElementById('successModalOverlay')?.classList.remove('open');
  document.body.style.overflow = '';

  // Hide mobile bottom bar
  const mbb = document.getElementById('mobileBottomBar');
  if (mbb) mbb.style.display = 'none';

  // Scroll back to hero
  document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
}

function initSuccessModal() {
  document.getElementById('returnHomeBtn')?.addEventListener('click', () => {
    if (countdownInterval) clearInterval(countdownInterval);
    finishOrder();
  });

  // Clicking overlay does NOT close success modal (intentional UX — must use button)
  document.getElementById('successModalOverlay')?.addEventListener('click', e => {
    e.stopPropagation();
  });
}

document.addEventListener('DOMContentLoaded', initSuccessModal);

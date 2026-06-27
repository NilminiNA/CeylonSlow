/* =============================================
   CeylonSlow — Shared JS
   ============================================= */

// ── Mobile nav toggle ──────────────────────────
const hamburger = document.querySelector('.hamburger');
const navDrawer  = document.querySelector('.nav-drawer');

if (hamburger && navDrawer) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navDrawer.classList.toggle('open');
  });
  // close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navDrawer.contains(e.target)) {
      hamburger.classList.remove('open');
      navDrawer.classList.remove('open');
    }
  });
}

// ── Active nav link highlight ──────────────────
(function highlightNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && href !== '#' && path.includes(href.replace('./', ''))) {
      a.classList.add('active');
    }
  });
})();

// ── Newsletter form (Formspree) ────────────────
// Replace YOUR_FORM_ID with your actual Formspree form ID
// Sign up free at https://formspree.io
const FORMSPREE_NEWSLETTER_ID = 'YOUR_FORM_ID';

document.querySelectorAll('.newsletter-form').forEach(form => {
  const msgEl = form.querySelector('.form-msg');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value.trim();
    if (!email) return;
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_NEWSLETTER_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        if (msgEl) { msgEl.textContent = '✓ You\'re subscribed! Welcome to CeylonSlow.'; msgEl.className = 'form-msg success'; }
        form.reset();
      } else {
        throw new Error('server');
      }
    } catch {
      if (msgEl) { msgEl.textContent = 'Something went wrong. Please try again.'; msgEl.className = 'form-msg error'; }
    } finally {
      btn.disabled = false;
      btn.textContent = 'Subscribe';
    }
  });
});

// ── Contact / list-your-service form ──────────
const FORMSPREE_CONTACT_ID = 'YOUR_FORM_ID';

document.querySelectorAll('.contact-form').forEach(form => {
  const msgEl = form.querySelector('.form-msg');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const btn  = form.querySelector('button[type="submit"]');
    btn.disabled  = true;
    btn.textContent = 'Sending…';
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_CONTACT_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        if (msgEl) { msgEl.textContent = '✓ Message received! We\'ll be in touch soon.'; msgEl.className = 'form-msg success'; }
        form.reset();
      } else {
        throw new Error('server');
      }
    } catch {
      if (msgEl) { msgEl.textContent = 'Something went wrong. Please try again.'; msgEl.className = 'form-msg error'; }
    } finally {
      btn.disabled = false;
      btn.textContent = 'Send message';
    }
  });
});

// ── Directory filter ───────────────────────────
const filterBtns  = document.querySelectorAll('.filter-btn');
const guideCards  = document.querySelectorAll('.guide-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    guideCards.forEach(card => {
      const match = cat === 'all' || card.dataset.category === cat;
      card.style.display = match ? '' : 'none';
    });
  });
});

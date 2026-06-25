const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 30);
});

const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');
burger?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
});
document.addEventListener('click', (e) => {
  if (!nav?.contains(e.target)) navLinks?.classList.remove('open');
});

const counters = document.querySelectorAll('.stat-num');
const animateCounters = () => {
  counters.forEach(el => {
    const target = +el.dataset.target;
    const step = target / 60;
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { el.textContent = target; clearInterval(timer); }
      else el.textContent = Math.floor(current);
    }, 25);
  });
};
const statsSection = document.querySelector('.stats');
if (statsSection) {
  const io = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) { animateCounters(); io.disconnect(); }
  }, { threshold: 0.3 });
  io.observe(statsSection);
}

const fadeEls = document.querySelectorAll('.service-card, .testi-card, .step, .team-card, .mv-card, .port-card, .pp-card');
const fadeObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.1 });
fadeEls.forEach(el => { el.classList.add('fade-up'); fadeObs.observe(el); });

const filterBtns = document.querySelectorAll('.filter-btn');
const portCards = document.querySelectorAll('.port-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    portCards.forEach(card => {
      if (cat === 'all' || card.dataset.cat === cat) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

const lightbox = document.getElementById('lightbox');
const lbMedia  = document.getElementById('lb-media');
const lbTitle  = document.getElementById('lb-title');
const lbTag    = document.getElementById('lb-tag');

if (lightbox) {
  document.querySelectorAll('.port-card').forEach(card => {
    card.addEventListener('click', () => {
      const video = card.dataset.video;
      const youtube = card.dataset.youtube;
      const title = card.dataset.title;
      const tag = card.dataset.tag;
      lbTitle.textContent = title || '';
      lbTag.textContent = tag || '';
      if (youtube) {
        lbMedia.innerHTML = `<iframe src="https://www.youtube.com/embed/${youtube}?autoplay=1" allowfullscreen allow="autoplay" style="width:100%;aspect-ratio:16/9;border:none;border-radius:8px"></iframe>`;
      } else if (video) {
        lbMedia.innerHTML = `<video src="${video}" controls autoplay style="width:100%;border-radius:8px"></video>`;
      } else {
        lbMedia.innerHTML = `<div style="aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;background:#1a1a24;border-radius:8px;color:#6b6b88">No video added yet</div>`;
      }
      lightbox.classList.add('open');
    });
  });

  document.getElementById('lb-close')?.addEventListener('click', closeLB);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLB(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLB(); });
}

function closeLB() {
  lightbox?.classList.remove('open');
  if (lbMedia) lbMedia.innerHTML = '';
}

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz5LuGBaNV8eucQkLiFnFFbiekyOT1WIlZB2g78QfBosd5gIEaIB67LeutrQNyN0T_phA/exec';

const subForm = document.getElementById('subscribe-form');
const subMsg  = document.getElementById('sub-msg');
subForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  subMsg.textContent = 'Subscribing...';
  subMsg.className = 'form-msg';
  const fd = new FormData();
  fd.append('type', 'subscribe');
  fd.append('email', subForm.email.value.trim());
  await fetch(SCRIPT_URL, { method:'POST', body:fd, mode:'no-cors' });
  subMsg.textContent = 'You are subscribed! Welcome to EditKaro.';
  subMsg.className = 'form-msg success';
  subForm.reset();
});

const contactForm = document.getElementById('contact-form');
const contactMsg  = document.getElementById('contact-msg');
contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  contactMsg.textContent = 'Sending...';
  contactMsg.className = 'form-msg';
  const fd = new FormData();
  fd.append('type', 'contact');
  fd.append('name', contactForm.name.value);
  fd.append('email', contactForm.email.value);
  fd.append('phone', contactForm.phone.value);
  fd.append('service', contactForm.service.value);
  fd.append('message', contactForm.message.value);
  fd.append('timestamp', new Date().toISOString());
  await fetch(SCRIPT_URL, { method:'POST', body:fd, mode:'no-cors' });
  contactMsg.textContent = 'Message sent! We will get back to you within 24 hours.';
  contactMsg.className = 'form-msg success';
  contactForm.reset();
});

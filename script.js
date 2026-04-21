// ── NAVBAR scroll effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Mobile nav toggle ──
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Registration modal ──
function showRegistration(eventName) {
  document.getElementById('modalTitle').textContent = `Inscrição – ${eventName}`;
  document.getElementById('registrationModal').classList.add('active');
  document.getElementById('modalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('registrationModal').classList.remove('active');
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

function handleRegistration(e) {
  e.preventDefault();
  closeModal();
  showToast('Inscrição recebida! Entraremos em contato em breve. 🎉');
}

// ── Donation amount selection ──
function selectAmount(btn, amount) {
  document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  document.getElementById('customAmount').value = '';
}

// ── Contact form ──
const FORMSPREE_ID = 'SEU_ID_AQUI'; // substitua pelo ID do seu formulário no Formspree

async function handleContact(e) {
  e.preventDefault();
  const form = e.target;
  const btn  = form.querySelector('button[type="submit"]');

  btn.disabled = true;
  btn.textContent = 'Enviando...';

  try {
    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    });

    if (res.ok) {
      showToast('Mensagem enviada com sucesso! Responderemos em breve. 💚');
      form.reset();
    } else {
      showToast('Erro ao enviar. Tente novamente ou escreva para labras.ie@gmail.com');
    }
  } catch {
    showToast('Erro de conexão. Tente novamente mais tarde.');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Enviar Mensagem';
  }
}

// ── Toast notification ──
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'success-toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// ── Festa Junina Slideshow ──
const fjPhotos = [
  'festa_junina25/1753261846866.jpg',
  'festa_junina25/FB_IMG_1753130593800.jpg',
  'festa_junina25/FB_IMG_1753130595903.jpg',
  'festa_junina25/FB_IMG_1753130598935.jpg',
  'festa_junina25/FB_IMG_1753130602793.jpg',
  'festa_junina25/FB_IMG_1753130605275.jpg',
  'festa_junina25/FB_IMG_1753130607963.jpg',
  'festa_junina25/FB_IMG_1753130614883.jpg',
  'festa_junina25/FB_IMG_1753130617282.jpg',
  'festa_junina25/IMG-20250719-WA0068.jpg',
  'festa_junina25/IMG-20250719-WA0069%281%29.jpg',
  'festa_junina25/IMG-20250719-WA0070.jpg',
  'festa_junina25/IMG-20250719-WA0071%281%29.jpg',
  'festa_junina25/IMG-20250719-WA0072%281%29.jpg',
  'festa_junina25/IMG-20250719-WA0073.jpg',
  'festa_junina25/IMG-20250719-WA0075.jpg',
  'festa_junina25/IMG-20250719-WA0076.jpg',
  'festa_junina25/IMG-20250719-WA0077.jpg',
  'festa_junina25/IMG-20250719-WA0101.jpg',
  'festa_junina25/IMG-20250719-WA0102%281%29.jpg',
  'festa_junina25/IMG-20250719-WA0102.jpg',
  'festa_junina25/IMG-20250719-WA0104.jpg',
  'festa_junina25/IMG-20250719-WA0105.jpg',
  'festa_junina25/IMG-20250719-WA0106%281%29.jpg',
  'festa_junina25/IMG-20250719-WA0107%281%29.jpg',
  'festa_junina25/IMG-20250719-WA0108.jpg',
  'festa_junina25/IMG-20250719-WA0109.jpg',
  'festa_junina25/IMG-20250719-WA0110.jpg',
  'festa_junina25/IMG-20250719-WA0114.jpg',
  'festa_junina25/IMG-20250719-WA0116.jpg',
  'festa_junina25/IMG-20250719-WA0117.jpg',
  'festa_junina25/IMG-20250719-WA0118.jpg',
  'festa_junina25/IMG-20250719-WA0119.jpg',
  'festa_junina25/IMG-20250719-WA0120.jpg',
  'festa_junina25/IMG-20250719-WA0122.jpg',
  'festa_junina25/IMG-20250719-WA0123.jpg',
  'festa_junina25/IMG-20250719-WA0139.jpg',
  'festa_junina25/IMG-20250719-WA0140.jpg',
  'festa_junina25/IMG-20250719-WA0141.jpg',
  'festa_junina25/IMG-20250719-WA0142.jpg',
  'festa_junina25/IMG-20250719-WA0144.jpg',
  'festa_junina25/IMG-20250719-WA0145.jpg',
  'festa_junina25/IMG-20250719-WA0146.jpg',
  'festa_junina25/IMG-20250719-WA0147.jpg',
  'festa_junina25/IMG-20250719-WA0148.jpg',
  'festa_junina25/IMG-20250719-WA0149.jpg',
  'festa_junina25/IMG-20250719-WA0176.jpg',
  'festa_junina25/IMG-20250719-WA0192.jpg',
  'festa_junina25/IMG_20250719_141607.jpg',
  'festa_junina25/IMG_20250719_141608.jpg',
  'festa_junina25/IMG_20250719_141653%281%29.jpg',
  'festa_junina25/IMG_20250719_141653.jpg',
  'festa_junina25/IMG_20250719_141703%281%29.jpg',
  'festa_junina25/IMG_20250719_141703.jpg',
  'festa_junina25/IMG_20250719_142256%281%29.jpg',
  'festa_junina25/IMG_20250719_142256.jpg',
  'festa_junina25/IMG_20250719_145959.jpg',
  'festa_junina25/IMG_20250719_153902.jpg',
  'festa_junina25/IMG_20250719_153902_1.jpg',
  'festa_junina25/IMG_20250719_153905.jpg',
  'festa_junina25/IMG_20250719_153906.jpg',
  'festa_junina25/IMG_20250719_153906_1.jpg',
  'festa_junina25/IMG_20250719_153941.jpg',
  'festa_junina25/IMG_20250719_153958.jpg',
  'festa_junina25/IMG_20250719_154021.jpg',
  'festa_junina25/IMG_20250719_155106.jpg',
  'festa_junina25/IMG_20250719_155147.jpg',
  'festa_junina25/IMG_20250719_155149.jpg',
  'festa_junina25/IMG_20250719_155150.jpg',
  'festa_junina25/IMG_20250719_155151.jpg',
  'festa_junina25/IMG_20250719_155151_1.jpg',
  'festa_junina25/IMG_20250719_155151_2.jpg',
  'festa_junina25/IMG_20250719_155152.jpg',
  'festa_junina25/IMG_20250719_160411.jpg',
  'festa_junina25/IMG_20250719_160412%281%29.jpg',
  'festa_junina25/IMG_20250719_160412.jpg',
  'festa_junina25/IMG_20250719_160617.jpg',
  'festa_junina25/IMG_20250719_160620.jpg',
  'festa_junina25/IMG_20250719_161532.jpg',
  'festa_junina25/IMG_20250719_161534.jpg',
  'festa_junina25/IMG_20250719_163158.jpg',
  'festa_junina25/IMG_20250719_170230.jpg',
  'festa_junina25/IMG_20250719_170523.jpg',
  'festa_junina25/IMG_20250719_170527.jpg',
  'festa_junina25/IMG_20250719_170528.jpg',
  'festa_junina25/IMG_20250721_150534.jpg',
  'festa_junina25/Leinster%20Express%2014.jpg',
  'festa_junina25/Leinster%20Express%202.jpg',
  'festa_junina25/Leinster%20Express%203.jpg',
  'festa_junina25/Leinster%20Express%204.jpg',
  'festa_junina25/Leinster%20Express%205.jpg',
  'festa_junina25/Leinster%20Express%206.jpg',
  'festa_junina25/Leinster%20Express%208.jpg',
  'festa_junina25/Leinster%20express%201.jpg',
  'festa_junina25/Leinster%20express%2010.jpg',
  'festa_junina25/Leinster%20express%2011.jpg',
  'festa_junina25/Leinster%20express%2012.jpg',
  'festa_junina25/Leinster%20express%2013.jpg',
  'festa_junina25/Leinster%20express%2015.jpg',
  'festa_junina25/Leinster%20express%2016.jpg',
  'festa_junina25/Leinster%20express%2017.jpg',
  'festa_junina25/Leinster%20express%2020.jpg',
  'festa_junina25/WhatsApp%20Image%202025-07-22%20at%2010.30.44.jpeg',
  'festa_junina25/WhatsApp%20Image%202025-07-22%20at%2010.30.45%20%281%29.jpeg',
  'festa_junina25/WhatsApp%20Image%202025-07-22%20at%2010.30.45%20%282%29.jpeg',
  'festa_junina25/WhatsApp%20Image%202025-07-22%20at%2010.30.45.jpeg',
  'festa_junina25/_storage_emulated_0_DCIM_Camera_IMG_20250719_162132.jpg',
];

let fjIndex = 0;

function fjUpdateSlide() {
  const img     = document.getElementById('fjSlideImg');
  const counter = document.getElementById('fjCounter');
  img.classList.add('fading');
  setTimeout(() => {
    img.src = fjPhotos[fjIndex];
    counter.textContent = `${fjIndex + 1} / ${fjPhotos.length}`;
    img.classList.remove('fading');
  }, 150);
}

function fjNav(dir, e) {
  if (e) e.stopPropagation();
  fjIndex = (fjIndex + dir + fjPhotos.length) % fjPhotos.length;
  fjUpdateSlide();
}

// ── Lightbox ──
function openLightboxSlide() {
  document.getElementById('lightboxImg').src = fjPhotos[fjIndex];
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

function lightboxNav(dir, e) {
  e.stopPropagation();
  fjIndex = (fjIndex + dir + fjPhotos.length) % fjPhotos.length;
  fjUpdateSlide();
  document.getElementById('lightboxImg').src = fjPhotos[fjIndex];
}

document.addEventListener('keydown', (e) => {
  const lb = document.getElementById('lightbox');
  if (lb.classList.contains('active')) {
    if (e.key === 'ArrowRight') lightboxNav(1,  { stopPropagation: () => {} });
    if (e.key === 'ArrowLeft')  lightboxNav(-1, { stopPropagation: () => {} });
    if (e.key === 'Escape')     closeLightbox();
  }
});

// ── Intersection Observer: fade-in on scroll ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.value-card, .project-card, .event-card, .upcoming-card, .contact-item'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

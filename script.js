// Force scroll to top immediately (safe on multi-page)
document.documentElement.style.scrollBehavior = 'auto';
window.scrollTo(0, 0);

window.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);
});

window.addEventListener('load', () => {
  window.scrollTo(0, 0);
  setTimeout(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, 100);
});

// Scroll reveal animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Navbar scroll effect
const topbar = document.getElementById('topbar');
window.addEventListener('scroll', () => {
  if (!topbar) return;
  if (window.scrollY > 50) topbar.classList.add('scrolled');
  else topbar.classList.remove('scrolled');
});

// =====================
// HERO MONKEY CURSOR FOLLOWER (ONLY ON index.html HERO)
// =====================
const heroSection = document.querySelector('.hero--title');
const heroMonkey = document.getElementById('heroMonkey');

if (heroSection && heroMonkey) {
  // Start monkey in upper right corner
  let mouseX = window.innerWidth - 150;
  let mouseY = 120;
  let monkeyX = window.innerWidth - 150;
  let monkeyY = 120;

  function animateHeroMonkey() {
    const ease = 0.04;
    monkeyX += (mouseX - monkeyX) * ease;
    monkeyY += (mouseY - monkeyY) * ease;

    const heroRect = heroSection.getBoundingClientRect();
    const constrainedX = Math.max(60, Math.min(window.innerWidth - 60, monkeyX));
    const constrainedY = Math.max(100, Math.min(heroRect.height - 100, monkeyY));

    heroMonkey.style.left = constrainedX - 42 + 'px';
    heroMonkey.style.top = constrainedY + 'px';

    requestAnimationFrame(animateHeroMonkey);
  }

  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    mouseX = e.clientX;
    mouseY = e.clientY - rect.top;
  });

  animateHeroMonkey();
}

// =====================
// ROBOT ITERATION IMAGE SWITCHER (auto per page)
// Works on iteration-1.html ... iteration-4.html
// =====================
(() => {
  const img = document.getElementById('robotImage');
  if (!img) return; // not a robot/iteration page

  const prev = document.querySelector('.robot-nav--prev');
  const next = document.querySelector('.robot-nav--next');

  // Detect which iteration page we're on
  const path = (window.location.pathname.split('/').pop() || '').toLowerCase();

  // IMPORTANT: update extensions here if your files are .jpg/.jpeg instead of .png
  const imageSets = {
    'iteration-1.html': [
      'assets/iteration1.png',
    ],
    'iteration-2.html': [
      'assets/iteration2.png',
    ],
    'iteration-3.html': [
      'assets/iteration3.png',
    ],
    'iteration-4.html': [
      'assets/iteration4.png',
    ]
  };

  // Choose the correct list; fallback to the current src only
  const images = imageSets[path] || [img.getAttribute('src')];

  // Hide arrows if only 1 image
  if (images.length <= 1) {
    if (prev) prev.style.display = 'none';
    if (next) next.style.display = 'none';
    return;
  }

  let i = 0;

  function show(index) {
    i = (index + images.length) % images.length;
    const newSrc = images[i];

    img.style.transition = 'opacity 0.2s ease';
    img.style.opacity = '0';

    const pre = new Image();
    pre.onload = () => {
      img.src = newSrc;
      img.style.opacity = '1';
    };
    pre.onerror = () => {
      console.log('Robot image not found:', newSrc);
      img.style.opacity = '1';
      alert('Could not load: ' + newSrc + '\nCheck the filename/path in assets.');
    };
    pre.src = newSrc;
  }

  prev?.addEventListener('click', () => show(i - 1));
  next?.addEventListener('click', () => show(i + 1));

  // Start index based on current image src (if it matches)
  const current = img.getAttribute('src');
  const startIndex = images.indexOf(current);
  i = startIndex >= 0 ? startIndex : 0;

  // Ensure correct starting image
  img.src = images[i];
})();

// =====================
// AWARDS TAP EXPAND (for mobile)
// =====================

document.querySelectorAll('.award-card').forEach(card => {

  card.addEventListener('click', () => {

    const alreadyOpen = card.classList.contains('active');

    // close all
    document.querySelectorAll('.award-card').forEach(c => {
      c.classList.remove('active');
    });

    // open clicked one
    if(!alreadyOpen){
      card.classList.add('active');
    }

  });

});
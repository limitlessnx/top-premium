const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

// Keep deployed visuals aligned with the approved/local concept assets.
const heroPhoto = document.querySelector('.hero-photo');
if (heroPhoto) heroPhoto.style.backgroundImage = "url('./assets/hero-terminal.jpg')";

const marketsSection = document.querySelector('.markets');
if (marketsSection) {
  marketsSection.style.backgroundImage = "linear-gradient(110deg, rgba(3,26,43,.98), rgba(4,67,95,.9)), url('./assets/hero-terminal.jpg')";
}

const aboutImage = document.querySelector('.about-visual img');
if (aboutImage) aboutImage.src = './assets/about-facility.jpg';

const revealItems = Array.from(document.querySelectorAll('.reveal'));
const isMobile = window.matchMedia('(max-width: 760px)').matches;

// Mobile must never depend on scroll animation to become visible.
// This prevents blank white sections when IntersectionObserver is delayed or skipped.
if (isMobile) {
  revealItems.forEach(el => {
    el.classList.add('visible');
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
} else if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px 80px 0px' });

  revealItems.forEach(el => observer.observe(el));

  // Fail-safe: nothing remains invisible if the observer fails to fire.
  window.setTimeout(() => {
    revealItems.forEach(el => el.classList.add('visible'));
  }, 1400);
} else {
  revealItems.forEach(el => el.classList.add('visible'));
}

// Re-apply mobile visibility after rotation/resizing.
window.addEventListener('resize', () => {
  if (window.matchMedia('(max-width: 760px)').matches) {
    revealItems.forEach(el => {
      el.classList.add('visible');
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }
});

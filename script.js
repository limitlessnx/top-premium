// Production-safe visibility override.
// Content must never depend on JavaScript animation state to exist on screen.
const visibilityFix = document.createElement('style');
visibilityFix.textContent = `
  .reveal,
  .hero-copy,
  .stats-card,
  .section-heading,
  .service-card,
  .about-copy,
  .about-visual,
  .markets-inner,
  .insight-card,
  .contact-card {
    opacity: 1 !important;
    transform: none !important;
    visibility: visible !important;
  }
`;
document.head.appendChild(visibilityFix);

document.querySelectorAll('.reveal').forEach(el => {
  el.classList.add('visible');
  el.style.opacity = '1';
  el.style.transform = 'none';
  el.style.visibility = 'visible';
});

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

// Keep deployed visuals aligned with the approved local concept assets.
const heroPhoto = document.querySelector('.hero-photo');
if (heroPhoto) heroPhoto.style.backgroundImage = "url('./assets/hero-terminal.jpg')";

const marketsSection = document.querySelector('.markets');
if (marketsSection) {
  marketsSection.style.backgroundImage = "linear-gradient(110deg, rgba(3,26,43,.98), rgba(4,67,95,.9)), url('./assets/hero-terminal.jpg')";
}

const aboutImage = document.querySelector('.about-visual img');
if (aboutImage) aboutImage.src = './assets/about-facility.jpg';

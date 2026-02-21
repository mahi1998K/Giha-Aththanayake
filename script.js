// ========== LOADING SCREEN ==========
window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 800);
  }
});

// ========== NAVBAR SCROLL EFFECT ==========
const navbar = document.querySelector('.navbar');
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }

  if (window.scrollY > 400) {
    backToTop?.classList.add('visible');
  } else {
    backToTop?.classList.remove('visible');
  }
});

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== MOBILE MENU ==========
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

mobileToggle?.addEventListener('click', () => {
  mobileToggle.classList.toggle('active');
  navLinks.classList.toggle('mobile-open');
  document.body.style.overflow = navLinks.classList.contains('mobile-open') ? 'hidden' : '';
});

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    mobileToggle?.classList.remove('active');
    navLinks?.classList.remove('mobile-open');
    document.body.style.overflow = '';
  });
});

// ========== SCROLL ANIMATIONS ==========
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  observer.observe(el);
});

// Add CSS class for visible
const style = document.createElement('style');
style.textContent = `
  .animate-visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

// Staggered animations for cards
document.querySelectorAll('.stagger-children').forEach(container => {
  const children = container.children;
  Array.from(children).forEach((child, index) => {
    child.style.opacity = '0';
    child.style.transform = 'translateY(30px)';
    child.style.transition = `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`;

    const childObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          childObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    childObserver.observe(child);
  });
});

// ========== COUNTER ANIMATION ==========
function animateCounters() {
  const counters = document.querySelectorAll('.counter-number');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const suffix = counter.getAttribute('data-suffix') || '';
    const prefix = counter.getAttribute('data-prefix') || '';
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = prefix + target.toLocaleString() + suffix;
      }
    };

    updateCounter();
  });
}

const counterSection = document.querySelector('.counter-section');
if (counterSection) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  counterObserver.observe(counterSection);
}

// ========== INSURANCE CALCULATOR ==========
function initCalculator() {
  const ageSlider = document.getElementById('calc-age');
  const coverageSlider = document.getElementById('calc-coverage');
  const termSlider = document.getElementById('calc-term');
  const ageValue = document.getElementById('age-value');
  const coverageValue = document.getElementById('coverage-value');
  const termValue = document.getElementById('term-value');
  const resultAmount = document.getElementById('result-amount');

  if (!ageSlider || !coverageSlider || !termSlider) return;

  function calculatePremium() {
    const age = parseInt(ageSlider.value);
    const coverage = parseInt(coverageSlider.value);
    const term = parseInt(termSlider.value);

    // Simplified premium calculation
    const basePremium = coverage * 0.003;
    const ageFactor = 1 + (age - 25) * 0.02;
    const termFactor = 1 + (term - 10) * 0.01;
    const monthlyPremium = Math.round(basePremium * ageFactor * termFactor);

    ageValue.textContent = age + ' years';
    coverageValue.textContent = 'Rs. ' + coverage.toLocaleString();
    termValue.textContent = term + ' years';
    resultAmount.textContent = 'Rs. ' + monthlyPremium.toLocaleString();
  }

  ageSlider.addEventListener('input', calculatePremium);
  coverageSlider.addEventListener('input', calculatePremium);
  termSlider.addEventListener('input', calculatePremium);

  calculatePremium();
}

initCalculator();

// ========== CONTACT FORM ==========
const contactForm = document.getElementById('contact-form');
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;
  btn.innerHTML = '✓ Message Sent Successfully!';
  btn.style.background = '#10b981';

  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.style.background = '';
    contactForm.reset();
  }, 3000);
});

// ========== SMOOTH SCROLL FOR NAVIGATION ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ========== ACTIVE NAV LINK HIGHLIGHT ==========
function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}
setActiveNav();

// ========== PARALLAX EFFECT FOR HERO ==========
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero, .page-hero');
  if (hero && window.scrollY < window.innerHeight) {
    const speed = 0.3;
    hero.style.transform = `translateY(${window.scrollY * speed}px)`;
  }
});

// ========== TYPING EFFECT ==========
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// ========== PRODUCT CARD TILT EFFECT ==========
document.querySelectorAll('.product-card, .value-card, .why-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

console.log('🛡️ Gihan Aththanayake Life Insurance Website Loaded Successfully!');

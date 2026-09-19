// ===== Прелоадер =====
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => preloader.classList.add('hidden'), 600);
});

// ===== Шапка при скролле + прогресс-бар =====
const navbar = document.getElementById('navbar');
const progress = document.getElementById('scrollProgress');

const onScroll = () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);

  const height = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = height > 0 ? (window.scrollY / height) * 100 + '%' : '0';
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== Мобильное меню =====
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ===== Появление блоков при прокрутке =====
const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    obs.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== Счётчики в статистике =====
const runCounter = el => {
  const target = Number(el.dataset.target);
  const duration = 1400;
  const start = performance.now();

  const tick = now => {
    const p = Math.min((now - start) / duration, 1);
    // ease-out, чтобы числа тормозили к финалу
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

const statsObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.stat-number').forEach(runCounter);
    obs.unobserve(entry.target);
  });
}, { threshold: 0.35 });

const statsGrid = document.querySelector('.stats-grid');
if (statsGrid) statsObserver.observe(statsGrid);

// ===== Полоски навыков =====
const skillsObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.bar i').forEach((bar, i) => {
      setTimeout(() => { bar.style.width = bar.dataset.val + '%'; }, i * 120);
    });
    obs.unobserve(entry.target);
  });
}, { threshold: 0.3 });

const skills = document.querySelector('.skills');
if (skills) skillsObserver.observe(skills);

// ===== Лёгкий параллакс фона на главном экране =====
const heroBg = document.querySelector('.hero-bg');
if (heroBg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      heroBg.style.setProperty('--py', window.scrollY * 0.25 + 'px');
    }
  }, { passive: true });
}

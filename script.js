// Плавная прокрутка по якорным ссылкам
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Анимация подсчёта чисел в блоке статистики
const statNumbers = document.querySelectorAll('.stat-number');
const animateStats = () => {
  statNumbers.forEach(el => {
    if (el.dataset.animated) return;
    const target = parseInt(el.textContent, 10);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      el.textContent = current;
    }, 30);
    el.dataset.animated = 'true';
  });
};

const statsSection = document.querySelector('.stats');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateStats();
      observer.disconnect();
    }
  });
}, { threshold: 0.4 });

if (statsSection) observer.observe(statsSection);

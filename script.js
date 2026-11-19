(() => {
  const header = document.getElementById('header');
  const burger = document.getElementById('burger');
  const menu = document.getElementById('menu');
  const links = menu.querySelectorAll('a');

  // Menu hambúrguer
  const setMenu = (open) => {
    menu.classList.toggle('open', open);
    header.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  };
  burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenu(false);
  });

  // Cabeçalho com fundo e sombra ao rolar
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Efeito interativo de luz no Hero
  const heroSection = document.getElementById('inicio');
  const heroGlow = document.getElementById('heroGlow');

  if (heroSection && heroGlow) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      heroGlow.style.setProperty('--mouse-x', `${x}%`);
      heroGlow.style.setProperty('--mouse-y', `${y}%`);
    });
  }

  // Rolagem suave
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({
        behavior: reduce ? 'auto' : 'smooth',
        block: 'start',
      });
      setMenu(false);
    });
  });

  // Destaque do link da seção visível
  const sections = [...links]
    .map((l) => document.querySelector(l.getAttribute('href')))
    .filter(Boolean);
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          links.forEach((l) =>
            l.classList.toggle('active', l.getAttribute('href') === '#' + en.target.id),
          );
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  sections.forEach((s) => io.observe(s));

  document.getElementById('year').textContent = new Date().getFullYear();
})();

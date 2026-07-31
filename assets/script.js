(() => {
  const header = document.querySelector('[data-header]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');

  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 20);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  menuToggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  }));

  document.querySelectorAll('[data-year]').forEach(node => { node.textContent = new Date().getFullYear(); });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const form = document.querySelector('[data-connect-form]');
  if (!form) return;

  const radios = [...form.querySelectorAll('[data-type-radio]')];
  const panels = [...form.querySelectorAll('[data-panel]')];

  const setType = type => {
    radios.forEach(radio => { radio.checked = radio.dataset.typeRadio === type; });
    panels.forEach(panel => {
      const active = panel.dataset.panel === type;
      panel.hidden = !active;
      panel.querySelectorAll('[data-required-when-visible]').forEach(field => { field.required = active; });
    });
  };

  radios.forEach(radio => radio.addEventListener('change', () => setType(radio.dataset.typeRadio)));
  const params = new URLSearchParams(window.location.search);
  const requestedType = params.get('type');
  if (['client', 'contributor', 'partner'].includes(requestedType)) setType(requestedType);

  const requestedService = params.get('service');
  const serviceSelect = form.querySelector('[data-service-select]');
  if (serviceSelect && ['cloud', 'big-data', 'consulting', 'custom', 'ai', 'multiple'].includes(requestedService)) serviceSelect.value = requestedService;
})();

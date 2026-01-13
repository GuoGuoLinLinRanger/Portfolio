// Helper functions
const qs = (sel, el = document) => el.querySelector(sel);
const qsa = (sel, el = document) => Array.from(el.querySelectorAll(sel));

document.addEventListener('DOMContentLoaded', () => {
  const html = document.documentElement;
  const body = document.body;

  // Theme handling: three palettes (keep palette1 as-is)
  const themes = ['palette1', 'palette2', 'palette3'];
  let currIndex = parseInt(localStorage.getItem('themeIndex') || '0', 10);
  const themeToggle = qs('#themeToggle');
  const indicators = qsa('.dot-indicator');
  const themeLabel = qs('#themeLabel');

  function applyTheme(index) {
    currIndex = ((index % themes.length) + themes.length) % themes.length;
    const theme = themes[currIndex];
    html.setAttribute('data-theme', theme);
    localStorage.setItem('themeIndex', String(currIndex));
    
    // refresh indicator visuals
    indicators.forEach((el) => {
      const i = Number(el.dataset.index);
      el.classList.toggle('active', i === currIndex);
    });
    
    // label text
    if (themeLabel) {
      const labels = ['Light Space', 'Navy Tech', 'Neo Synth'];
      themeLabel.textContent = labels[currIndex] || theme;
    }
  }

  applyTheme(currIndex);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => applyTheme(currIndex + 1));
  }
  
  // also make indicators clickable
  indicators.forEach(el => {
    el.addEventListener('click', () => applyTheme(Number(el.dataset.index)));
  });

  // Mobile menu
  const menuBtn = qs('#menuToggle');
  const mobileMenu = qs('#mobileMenu');
  
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.getAttribute('aria-hidden') === 'false';
      mobileMenu.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
      mobileMenu.classList.toggle('active', !isOpen);
      menuBtn.classList.toggle('open', !isOpen);
    });
  }

  // Intersection reveal - with null check
<<<<<<< HEAD
  const viewElements = qsa('.view');
  if (viewElements.length > 0) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { 
        if (e.isIntersecting) e.target.classList.add('active'); 
      });
    }, { threshold: 0.12 });
    
    viewElements.forEach(v => io.observe(v));
  }
=======
const viewElements = qsa('.view');
if (viewElements.length > 0) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { 
      if (e.isIntersecting) e.target.classList.add('active'); 
    });
  }, { threshold: 0.12 });
  
  viewElements.forEach(v => io.observe(v));

  // Force trigger in case element is already in viewport on load
  window.addEventListener('load', () => {
    viewElements.forEach(v => {
      const rect = v.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        v.classList.add('active');
      }
    });
  });
}

>>>>>>> 1fe183fe96366765ea937364414299a07b9aa318

  // Page transition (click links ending with .html)
  const veil = qs('.veil');
  const links = qsa('a[href$=".html"]');
  const lastXY = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  
  document.addEventListener('pointermove', e => { 
    lastXY.x = e.clientX; 
    lastXY.y = e.clientY; 
  });

  links.forEach(a => {
    a.addEventListener('click', e => {
      const url = a.getAttribute('href');
      if (!url || url.startsWith('#')) return;
      
      e.preventDefault();
      document.body.style.setProperty('--x', lastXY.x + 'px');
      document.body.style.setProperty('--y', lastXY.y + 'px');
      
      if (veil) {
        veil.classList.add('show');
      }
      
      setTimeout(() => { 
        window.location.href = url; 
      }, 480);
    });
  });

  // Add active class to nav link matching current location
  qsa('.nav-link').forEach(link => {
    try {
      const href = link.getAttribute('href');
      if (href && (location.pathname.endsWith(href) || 
          (location.pathname === '/' && href === 'index.html'))) {
        link.classList.add('active');
      }
    } catch (e) {
      console.error('Error setting active link:', e);
    }
  });

  // Footer year
  const yearEl = qs('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
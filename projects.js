// Project modal & gallery
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('projectModal');
  const galleryImg = modal ? modal.querySelector('#galleryImage') : null;
  const titleEl = modal ? modal.querySelector('#projTitle') : null;
  const descEl = modal ? modal.querySelector('#projDesc') : null;
  const closeBtn = modal ? modal.querySelector('#projClose') : null;
  const prevBtn = modal ? modal.querySelector('#galleryPrev') : null;
  const nextBtn = modal ? modal.querySelector('#galleryNext') : null;

  if (!modal) return;

  const projects = document.querySelectorAll('.project');
  let gallery = [];
  let index = 0;

  function openModal(g, i, t, d) {
    gallery = g.slice();
    index = i;
    galleryImg.src = gallery[index] || '';
    titleEl.textContent = t || '';
    descEl.textContent = d || '';
    modal.setAttribute('aria-hidden', 'false');
    modal.style.display = 'grid';
    setTimeout(() => modal.focus(), 120);
  }
  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    setTimeout(() => { modal.style.display = 'none'; }, 200);
  }
  function showIndex(i) {
    index = ((i % gallery.length) + gallery.length) % gallery.length;
    galleryImg.src = gallery[index];
  }

  projects.forEach(proj => {
    proj.addEventListener('click', () => {
      const title = proj.dataset.title || proj.querySelector('h3')?.textContent;
      const desc = proj.dataset.desc || proj.querySelector('.meta')?.textContent;
      const raw = proj.dataset.gallery || '';
      const g = raw.split(',').map(s => s.trim()).filter(Boolean);
      openModal(g, 0, title, desc);
    });
  });

  // controls
  closeBtn.addEventListener('click', closeModal);
  prevBtn.addEventListener('click', () => { if (gallery.length) showIndex(index - 1); });
  nextBtn.addEventListener('click', () => { if (gallery.length) showIndex(index + 1); });
  // keyboard
  document.addEventListener('keydown', (e) => {
    if (modal.getAttribute('aria-hidden') === 'false') {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') showIndex(index - 1);
      if (e.key === 'ArrowRight') showIndex(index + 1);
    }
  });

  // click outside to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // pointer swipe on image
  let startX = null;
  let startTime = 0;
  galleryImg.addEventListener('pointerdown', (e) => {
    startX = e.clientX;
    startTime = Date.now();
    galleryImg.setPointerCapture(e.pointerId);
  });
  galleryImg.addEventListener('pointerup', (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    const dt = Date.now() - startTime;
    if (Math.abs(dx) > 40 && dt < 500) {
      if (dx < 0) showIndex(index + 1); else showIndex(index - 1);
    }
    startX = null;
  });
});

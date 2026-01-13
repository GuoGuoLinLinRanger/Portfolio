document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const btn = document.getElementById('sendBtn');

  if (!form || !btn || !status) return;

  btn.addEventListener('click', () => {
    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const msg = document.getElementById('msg')?.value.trim();
    if (!name || !email || !msg) {
      status.textContent = 'Please fill out all fields.';
      return;
    }
    // Fake success UX
    status.textContent = 'Thanks — your message has been sent.';
    form.reset();
  });
});

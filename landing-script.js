// ACE PARKWAY 2.0 — landing page interactions

document.addEventListener('DOMContentLoaded', () => {

  // ---- Lead forms (simple submit override) ----
  const forms = document.querySelectorAll('[data-lead-form]');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Redirect to the new dedicated thank you page
      window.location.href = 'thankyou.html';
    });
  });

  // ---- Location advantage tabs (progressive enhancement) ----
  // All panels are visible by default via CSS. JS only hides the non-active
  // ones once it runs — if JS fails, every panel stays visible.
  const tabs = document.querySelectorAll('.loc-tab');
  const panels = document.querySelectorAll('.loc-panel');
  if (tabs.length && panels.length) {
    panels.forEach((p, i) => { if (i > 0) p.classList.add('is-hidden'); });
    tabs.forEach((tab, i) => {
      if (i === 0) tab.classList.add('is-active');
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('is-active'));
        panels.forEach(p => p.classList.add('is-hidden'));
        tab.classList.add('is-active');
        panels[i].classList.remove('is-hidden');
      });
    });
  }

  // ---- Modal popup ----
  const overlay = document.getElementById('lead-modal');
  const openTriggers = document.querySelectorAll('[data-open-modal]');
  const closeBtn = document.querySelector('.modal-close');
  let modalShown = false;

  function openModal(){
    if (!overlay) return;
    overlay.classList.add('is-open');
    document.body.classList.add('modal-open');
    modalShown = true;
  }
  function closeModal(){
    if (!overlay) return;
    overlay.classList.remove('is-open');
    document.body.classList.remove('modal-open');
  }

  openTriggers.forEach(btn => btn.addEventListener('click', (e) => { e.preventDefault(); openModal(); }));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  // Auto-open once after a delay, only if the visitor hasn't already converted/closed it
  setTimeout(() => { if (!modalShown) openModal(); }, 25000);

  // Auto-open on exit intent (desktop only)
  document.addEventListener('mouseout', (e) => {
    if (!modalShown && e.clientY < 10 && e.relatedTarget == null) openModal();
  });

});

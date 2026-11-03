(() => {
  const emailLink = document.querySelector('.hero-icon-link.email-link');
  const emailModal = document.getElementById('email-modal');
  const emailCopyButton = document.querySelector('.email-modal__copy');
  const emailStatus = document.querySelector('.email-modal__status');
  const cvTrigger = document.querySelector('.cv-trigger');
  const cvModal = document.getElementById('cv-modal');
  let activeModal = null;
  let modalTrigger = null;
  let previousBodyOverflow = '';

  function openModal(modal, trigger) {
    if (!modal) return;
    if (activeModal) closeModal(activeModal, false);

    activeModal = modal;
    modalTrigger = trigger;
    modal.inert = false;
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('is-open');
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    modal.querySelector('.email-modal__close')?.focus();
  }

  function closeModal(modal, restoreFocus = true) {
    if (!modal || !modal.classList.contains('is-open')) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    modal.inert = true;
    document.body.style.overflow = previousBodyOverflow;

    if (activeModal === modal) {
      activeModal = null;
      if (restoreFocus && modalTrigger instanceof HTMLElement) {
        modalTrigger.focus();
      }
      modalTrigger = null;
    }

    if (modal === emailModal) {
      if (emailStatus) {
        emailStatus.textContent = '';
      }
      if (emailCopyButton) {
        emailCopyButton.classList.remove('is-copied');
        emailCopyButton.textContent = 'Copiar correo';
      }
    }
  }

  if (emailLink) {
    emailLink.addEventListener('click', () => {
      openModal(emailModal, emailLink);
    });
  }

  if (cvTrigger) {
    cvTrigger.addEventListener('click', () => {
      openModal(cvModal, cvTrigger);
    });
  }

  if (emailCopyButton) {
    emailCopyButton.addEventListener('click', async () => {
      const email = emailLink?.dataset.email || 'said200317@gmail.com';

      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(email);
        } else {
          const tempInput = document.createElement('textarea');
          tempInput.value = email;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }

        emailCopyButton.classList.add('is-copied');
        emailCopyButton.textContent = '¡Copiado!';
        if (emailStatus) {
          emailStatus.textContent = '¡Correo copiado al portapapeles!';
        }
      } catch (error) {
        if (emailStatus) {
          emailStatus.textContent = 'No se pudo copiar el correo. Inténtalo de nuevo.';
        }
      }
    });
  }

  document.querySelectorAll('[data-close-modal]').forEach((button) => {
    button.addEventListener('click', () => {
      closeModal(button.closest('.email-modal'));
    });
  });

  document.addEventListener('keydown', (event) => {
    if (!activeModal) return;

    if (event.key === 'Escape') {
      closeModal(activeModal);
      return;
    }

    if (event.key === 'Tab') {
      const focusable = [...activeModal.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
  });
})();

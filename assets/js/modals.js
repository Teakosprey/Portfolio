(() => {
  const emailLink = document.querySelector('.hero-icon-link.email-link');
  const emailModal = document.getElementById('email-modal');
  const emailCopyButton = document.querySelector('.email-modal__copy');
  const emailOpenButton = document.querySelector('.email-modal__open');
  const emailStatus = document.querySelector('.email-modal__status');
  const cvTrigger = document.querySelector('.cv-trigger');
  const cvModal = document.getElementById('cv-modal');

  function openEmailModal() {
    if (!emailModal) return;
    emailModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeEmailModal() {
    if (!emailModal) return;
    emailModal.classList.remove('is-open');
    document.body.style.overflow = '';
    if (emailStatus) {
      emailStatus.textContent = '';
    }
    if (emailCopyButton) {
      emailCopyButton.classList.remove('is-copied');
      emailCopyButton.textContent = 'Copiar correo';
    }
  }

  function openCvModal() {
    if (!cvModal) return;
    cvModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeCvModal() {
    if (!cvModal) return;
    cvModal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (emailLink) {
    emailLink.addEventListener('click', (event) => {
      event.preventDefault();
      openEmailModal();
    });

    emailLink.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openEmailModal();
      }
    });
  }

  if (cvTrigger) {
    cvTrigger.addEventListener('click', () => {
      openCvModal();
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
      closeEmailModal();
      closeCvModal();
    });
  });

  if (emailModal) {
    emailModal.addEventListener('click', (event) => {
      if (event.target === emailModal) {
        closeEmailModal();
      }
    });
  }

  if (cvModal) {
    cvModal.addEventListener('click', (event) => {
      if (event.target === cvModal) {
        closeCvModal();
      }
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeEmailModal();
      closeCvModal();
    }
  });
})();

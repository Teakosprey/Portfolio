(() => {
  const inputNombre = document.getElementById('name');
  const inputEmail = document.getElementById('email');
  const inputMensaje = document.getElementById('message');
  const form = document.getElementById('contact-form');

  if (inputNombre && inputEmail && inputMensaje) {
    inputNombre.addEventListener('invalid', function() {
      inputNombre.setCustomValidity('Por favor, escribe tu nombre aquí, es obligatorio.');
    });
    inputEmail.addEventListener('invalid', function() {
      inputEmail.setCustomValidity('Por favor, escribe tu correo electrónico aquí, es obligatorio.');
    });
    inputMensaje.addEventListener('invalid', function() {
      inputMensaje.setCustomValidity('Por favor, escribe tu mensaje aquí, es obligatorio.');
    });

    inputNombre.addEventListener('input', function() {
      inputNombre.setCustomValidity('');
    });
    inputEmail.addEventListener('input', function() {
      inputEmail.setCustomValidity('');
    });
    inputMensaje.addEventListener('input', function() {
      inputMensaje.setCustomValidity('');
    });
  }

  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const nombre = document.getElementById('name')?.value.trim() || '';
    const correo = document.getElementById('email')?.value.trim() || '';
    const mensaje = document.getElementById('message')?.value.trim() || '';

    const asunto = encodeURIComponent(`Mensaje de ${nombre} desde tu portafolio`);
    const cuerpo = encodeURIComponent(`${mensaje}`);

    window.location.href = `mailto:said200318@outlook.com?subject=${asunto}&body=${cuerpo}`;
    form.reset();
  });
})();

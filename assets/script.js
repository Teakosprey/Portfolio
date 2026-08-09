// cargar proyectos desde el json
async function loadProjects() {
  const res = await fetch("./projects.json");
  const projects = await res.json();
  const container = document.getElementById("project-list");

  projects.forEach(p => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
      <h3 class="card-title">${p.name}</h3><br>
      <img src="${p.image}" alt="${p.name}" class="card-image"><br><br>
      <p class="card-description">${p.description}</p><br>
      <div class="card-container"><br>
      <img class="card-icon-link" src="/assets/icons/html.svg" alt="html"><br>
      <img class="card-icon-link" src="/assets/icons/css.svg" alt="css"><br>
      <img class="card-icon-link" src="/assets/icons/js.svg" alt="javascript"><br>
      <img class="card-icon-link" src="/assets/icons/react.svg" alt="react"><br>
      <img class="card-icon-link" src="/assets/icons/tailwind.svg" alt="tailwind"><br>
      </div><br>
      <div class="card-container"><br>
      <a href="${p.link}" class="card-link" target="_blank">Ver proyecto</a>
      </div>
    `;
    container.appendChild(card);
  });
}

// Función para manejar el scroll y resaltar el enlace activo
const secciones = document.querySelectorAll("section");
const enlaces = document.querySelectorAll("nav a");

const opciones = {
  root: null, //Usa la pantalla como referencia
  rootMargin: "0px",
  threshold: 0.8 // Se activa cuando el 80% de la sección es visible
};

const nav = document.querySelector("nav");
const navLinks = [...document.querySelectorAll("nav a")];

if (nav && navLinks.length) {
  const indicator = document.createElement("span");
  indicator.classList.add("nav-indicator");
  nav.appendChild(indicator);

  function showIndicator(link) {
    const navRect = nav.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    const offsetLeft = linkRect.left - navRect.left;

    indicator.style.width = `${linkRect.width}px`;
    indicator.style.transform = `translate(${offsetLeft}px, -50%)`;
    indicator.style.opacity = "1";
  }

  function hideIndicator() {
    indicator.style.opacity = "0";
  }

  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => showIndicator(link));
    link.addEventListener("focus", () => showIndicator(link));
    link.addEventListener("mouseleave", hideIndicator);
    link.addEventListener("blur", hideIndicator);
  });

  const observer = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      // Si la sección está visible en la pantalla
      if (entrada.isIntersecting) {
        const id = entrada.target.getAttribute("id");

        // Quita la clase activa de todos los enlaces
        navLinks.forEach((enlace) => {
          enlace.classList.remove("active");
        });

        // Añade la clase activa solo al enlace que corresponde
        const enlaceActivo = document.querySelector(`nav a[href="#${id}"]`);
        if (enlaceActivo) {
          enlaceActivo.classList.add("active");
        }
      }
    });
  }, opciones);

  secciones.forEach((seccion) => {
    observer.observe(seccion);
  });
}

const inputNombre = document.getElementById('name');
const inputEmail = document.getElementById('email');
const inputMensaje = document.getElementById('message');

if (inputNombre && inputEmail && inputMensaje) {
  // Cambiar el texto cuando el campo está vacío al enviar
  inputNombre.addEventListener('invalid', function() {
    inputNombre.setCustomValidity('Por favor, escribe tu nombre aquí, es obligatorio.');
  });
  inputEmail.addEventListener('invalid', function() {
    inputEmail.setCustomValidity('Por favor, escribe tu correo electrónico aquí, es obligatorio.');
  });
  inputMensaje.addEventListener('invalid', function() {
    inputMensaje.setCustomValidity('Por favor, escribe tu mensaje aquí, es obligatorio.');
  });

  // Limpiar el mensaje cuando el usuario empieza a escribir
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

const iconContainer = document.getElementById('icons-container');
const iconLinks = [...document.querySelectorAll('.icon-link')];

const emailLink = document.querySelector('.icon-link.email-link');
const emailModal = document.getElementById('email-modal');
const emailCopyButton = document.querySelector('.email-modal__copy');
const emailOpenButton = document.querySelector('.email-modal__open');
const emailStatus = document.querySelector('.email-modal__status');

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

if (emailOpenButton) {
  emailOpenButton.addEventListener('click', () => {
    window.location.href = 'mailto:said200317@gmail.com?subject=Hola%20Abdiel';
  });
}

document.querySelectorAll('[data-close-modal]').forEach((button) => {
  button.addEventListener('click', closeEmailModal);
});

if (emailModal) {
  emailModal.addEventListener('click', (event) => {
    if (event.target === emailModal) {
      closeEmailModal();
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeEmailModal();
  }
});

if (iconContainer && iconLinks.length) {
  const iconIndicator = document.createElement('span');
  iconIndicator.classList.add('icon-indicator');
  iconContainer.appendChild(iconIndicator);

  function moveIconIndicator(link) {
    const containerRect = iconContainer.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    const offsetLeft = linkRect.left - containerRect.left;

    iconIndicator.style.width = `${linkRect.width}px`;
    iconIndicator.style.transform = `translateX(${offsetLeft}px)`;
    iconIndicator.style.opacity = '1';
  }

  function hideIconIndicator() {
    iconIndicator.style.opacity = '0';
  }

  iconLinks.forEach((link) => {
    link.addEventListener('mouseenter', () => moveIconIndicator(link));
    link.addEventListener('focus', () => moveIconIndicator(link));
    link.addEventListener('mouseleave', hideIconIndicator);
    link.addEventListener('blur', hideIconIndicator);
  });
}

const form = document.getElementById('contact-form');

if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const nombre = document.getElementById('name')?.value.trim() || '';
    const correo = document.getElementById('email')?.value.trim() || '';
    const mensaje = document.getElementById('message')?.value.trim() || '';

    const asunto = encodeURIComponent(`Mensaje de ${nombre} desde tu portafolio`);
    const cuerpo = encodeURIComponent(
      `${mensaje}`
    );

    window.location.href = `mailto:said200318@outlook.com?subject=${asunto}&body=${cuerpo}`;
    form.reset();
  });
}

loadProjects();

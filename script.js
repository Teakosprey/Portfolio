// cargar proyectos desde el json
async function loadProjects() {
  const res = await fetch("projects.json");
  const projects = await res.json();
  const container = document.getElementById("project-list");

  projects.forEach(p => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
      <h3>${p.name}</h3><br>
      <img src="${p.image}" alt="${p.name}" style="width: 100%; height: auto; border-radius: 10px;"><br><br>
      <p>${p.description}</p><br>
      <a href="${p.link}" target="_blank" style="text-decoration: none; color: #279af1; font-weight: bold;">Ver proyecto</a>
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

const observer = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    // Si la sección está visible en la pantalla
    if (entrada.isIntersecting) {
      const id = entrada.target.getAttribute("id");

      // Quita la clase activa de todos los enlaces
      enlaces.forEach((enlace) => {
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

const send = document.getElementById('send');

if (name && email && message) {
  send.addEventListener('click', function() {
    alert("Tu correo ha sido enviado, te responderé a la brevedad :)");
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

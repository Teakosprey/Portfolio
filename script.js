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

loadProjects();

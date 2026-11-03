window.projectsData = [];
window.activeProjectTech = null;

window.renderProjects = function(projects) {
  const container = document.getElementById("project-list");
  if (!container) return;

  container.classList.remove("single-project");
  container.innerHTML = "";

  if (!projects || !projects.length) {
    container.innerHTML = '<p class="no-projects">No hay proyectos para esta tecnología.</p>';
    return;
  }

  if (projects.length === 1) {
    container.classList.add("single-project");
  }

  projects.forEach(p => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const techIcons = p.technologies
      .map(tech => `<img class="card-icon" src="./assets/icons/${tech}.svg" draggable="false" alt="${tech}" loading="lazy">`)
      .join("");

    const card = document.createElement("article");
    card.className = "project-card";
    card.innerHTML = `
      <h3 class="card-title">${p.name}</h3>
      <video src="${p.video}" ${prefersReducedMotion ? "" : "autoplay"} muted loop playsinline preload="${prefersReducedMotion ? "metadata" : "none"}" aria-hidden="true" class="card-video"></video>
      <p class="card-description">${p.description}</p>
      <div class="card-icon-container">
        ${techIcons}
      </div>
      <div class="card-link-container">
        <a href="${p.link_github}" class="card-link" target="_blank" rel="noopener noreferrer">
          <img src="assets/icons/github.svg" alt="" aria-hidden="true" loading="lazy" width="25" height="25">
          <span>Ir al repositorio</span>
        </a>
        <a href="${p.link_web}" class="card-link" target="_blank" rel="noopener noreferrer">
          <img src="assets/icons/web.svg" alt="" aria-hidden="true" loading="lazy" width="25" height="25">
          <span>Ir a la web</span>
        </a>
      </div>
    `;
    container.appendChild(card);
  });
};

window.loadProjects = async function() {
  const res = await fetch("projects.json");
  window.projectsData = await res.json();
  window.renderProjects(window.projectsData);
};

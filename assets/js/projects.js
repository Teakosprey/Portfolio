window.projectsData = [];
window.activeProjectTech = null;

window.renderProjects = function(projects) {
  const container = document.getElementById("project-list");
  container.innerHTML = "";

  if (!projects || !projects.length) {
    container.innerHTML = '<p class="no-projects">No hay proyectos para esta tecnología.</p>';
    return;
  }

  projects.forEach(p => {
    const techIcons = p.technologies
      .map(tech => `<img class="card-icon" src="./assets/icons/${tech}.svg" draggable="false" alt="${tech}">`)
      .join("");

    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
      <h3 class="card-title">${p.name}</h3>
      <img src="${p.image}" alt="${p.name}" class="card-image">
      <p class="card-description">${p.description}</p>
      <div class="card-container">
        ${techIcons}
      </div>
      <div class="card-container">
        <a href="${p.link_github}" class="card-link" target="_blank">
          <img src="assets/icons/github.svg" alt="github" width="30" height="30">
          <span>Ir al repositorio</span>
        </a>
        <a href="${p.link_web}" class="card-link" target="_blank">
          <img src="assets/icons/web.svg" alt="web" width="30" height="30">
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

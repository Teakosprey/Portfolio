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
      .map(tech => `<img class="card-icon-link" src="./assets/icons/${tech}.svg" draggable="false" alt="${tech}">`)
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
        <a href="${p.link}" class="card-link" target="_blank">Ver proyecto</a>
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

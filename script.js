// carar proyectos desde el json
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

loadProjects();

// modo oscuro/claro
const themeBtn = document.getElementById("toggle-theme");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// cargar proyectos desde el json
async function loadProjects() {
  const res = await fetch("projects.json");
  const projects = await res.json();
  const container = document.getElementById("project-list");

  projects.forEach(p => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <a href="${p.link}" target="_blank">Ver proyecto</a>
    `;
    container.appendChild(card);
  });
}

loadProjects();

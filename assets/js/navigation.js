(() => {
  const secciones = document.querySelectorAll("section");
  const nav = document.querySelector("header nav");
  const navLinks = [...(nav?.querySelectorAll("a") ?? [])];
  const menuToggle = nav?.querySelector(".nav-menu-toggle");

  if (!nav || !navLinks.length) return;

  function closeMenu() {
    nav.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }

  menuToggle?.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target)) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

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

  const opciones = {
    root: null,
    rootMargin: "0px",
    threshold: 0.6
  };

  const observer = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        const id = entrada.target.getAttribute("id");

        navLinks.forEach((enlace) => {
          enlace.classList.remove("active");
        });

        const enlaceActivo = nav.querySelector(`a[href="#${id}"]`);
        if (enlaceActivo) {
          enlaceActivo.classList.add("active");
        }
      }
    });
  }, opciones);

  secciones.forEach((seccion) => {
    observer.observe(seccion);
  });
})();

(() => {
  const secciones = document.querySelectorAll("section");
  const nav = document.querySelector("nav");
  const navLinks = [...document.querySelectorAll("nav a")];

  if (!nav || !navLinks.length) return;

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
})();

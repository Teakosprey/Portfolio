(() => {
  if (
    !("IntersectionObserver" in window) ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  let revealIndex = 0;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.2 });

  function observeTarget(target) {
    if (target.classList.contains("scroll-reveal")) return;

    const direction = revealIndex % 2 === 0 ? "scroll-reveal--left" : "scroll-reveal--right";
    revealIndex += 1;
    target.classList.add("scroll-reveal", direction);
    observer.observe(target);
  }

  document.querySelectorAll(
    "#contact-form, .about-content, #projects-icons-container, .section-title, .section-subtitle, .project-card"
  ).forEach(observeTarget);

  const projectList = document.getElementById("project-list");
  if (projectList) {
    const projectObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches(".project-card")) observeTarget(node);
          node.querySelectorAll(".project-card").forEach(observeTarget);
        });
      });
    });

    projectObserver.observe(projectList, { childList: true });
  }
})();

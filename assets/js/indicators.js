(() => {
  const iconContainer = document.getElementById('hero-icons-container');
  const iconLinks = [...document.querySelectorAll('.hero-icon-link')];

  if (iconContainer && iconLinks.length) {
    const iconIndicator = document.createElement('span');
    iconIndicator.classList.add('icon-indicator');
    iconContainer.appendChild(iconIndicator);

    function moveIconIndicator(link) {
      const containerRect = iconContainer.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      const offsetLeft = linkRect.left - containerRect.left;

      iconIndicator.style.width = `${linkRect.width}px`;
      iconIndicator.style.transform = `translateX(${offsetLeft}px)`;
      iconIndicator.style.opacity = '1';
    }

    function hideIconIndicator() {
      iconIndicator.style.opacity = '0';
    }

    iconLinks.forEach((link) => {
      link.addEventListener('mouseenter', () => moveIconIndicator(link));
      link.addEventListener('focus', () => moveIconIndicator(link));
      link.addEventListener('mouseleave', hideIconIndicator);
      link.addEventListener('blur', hideIconIndicator);
    });
  }

  const projectIconContainer = document.getElementById('projects-icons-container');
  const projectIconLinks = [...document.querySelectorAll('.projects-icon-link')];

  if (projectIconContainer && projectIconLinks.length) {
    const projectIconIndicator = document.createElement('span');
    projectIconIndicator.classList.add('icon-indicator');
    projectIconContainer.appendChild(projectIconIndicator);

    function moveProjectIconIndicator(link) {
      const containerRect = projectIconContainer.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      const offsetLeft = linkRect.left - containerRect.left;

      projectIconIndicator.style.width = `${linkRect.width}px`;
      projectIconIndicator.style.transform = `translateX(${offsetLeft}px)`;
      projectIconIndicator.style.opacity = '1';
    }

    function hideProjectIconIndicator() {
      projectIconIndicator.style.opacity = '0';
    }

    projectIconLinks.forEach((link) => {
      link.addEventListener('mouseenter', () => moveProjectIconIndicator(link));
      link.addEventListener('focus', () => moveProjectIconIndicator(link));
      link.addEventListener('mouseleave', hideProjectIconIndicator);
      link.addEventListener('blur', hideProjectIconIndicator);

      // click -> toggle filter for this technology
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const tech = link.dataset.tech;
        if (!tech) return;

        const isSameTech = window.activeProjectTech === tech;

        projectIconLinks.forEach((el) => {
          const isActive = !isSameTech && el.dataset.tech === tech;
          el.classList.toggle('active', isActive);
          el.setAttribute('aria-pressed', String(isActive));
        });

        window.activeProjectTech = isSameTech ? null : tech;

        const filtered = window.activeProjectTech
          ? (window.projectsData || []).filter(p => p.technologies.includes(window.activeProjectTech))
          : (window.projectsData || []);

        if (typeof window.renderProjects === 'function') {
          window.renderProjects(filtered);
        }
      });
    });
  }
})();

/* ============================================================
    NAVBAR.JS — Comportamiento de la navbar al hacer scroll
   ============================================================ */

function initNavbar() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    // Marcar el link activo según la sección visible
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => sectionObserver.observe(section));
}

document.addEventListener('DOMContentLoaded', initNavbar);
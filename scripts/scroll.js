/* ============================================================
    SCROLL.JS — Smooth scroll para los enlaces de navegación
   ============================================================ */

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initSmoothScroll);
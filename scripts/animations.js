/*  ============================================================
    ANIMATIONS.JS - scripts/animations.js
    ES: Animaciones de scroll con IntersectionObserver.
        Cuando un elemento con clase .fade-in entra en el
        viewport, le anadimos la clase .visible, que es la
        que realmente dispara la transicion en animations.css.
    EN: Scroll animations with IntersectionObserver.
        When an element with the .fade-in class enters the
        viewport, we add the .visible class, which is what
        actually triggers the transition in animations.css.
    ============================================================  */
    
function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initAnimations);
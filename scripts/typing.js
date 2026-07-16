/* ============================================================
    TYPING.JS - scripts/typing.js
    ES: Efecto de tipeo animado (escribe el texto letra a
        letra, como una maquina de escribir). Usado por
        main.js para animar el nombre del hero.
    EN: Animated typing effect (writes the text letter by
        letter, like a typewriter). Used by main.js to
        animate the hero name.
   ============================================================ */
    
function typeWriter(element, text, speed = 80, callback) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

/* ES: Se auto-inicializa: anima el nombre del hero al cargar la página
   EN: It auto-initializes: animates the hero name when the page loads. */
document.addEventListener('DOMContentLoaded', () => {
    const heroName = document.getElementById('heroName');
    if (heroName) {
        const fullName = heroName.dataset.text || heroName.textContent;
        heroName.textContent = '';
        typeWriter(heroName, fullName, 80);
    }
});
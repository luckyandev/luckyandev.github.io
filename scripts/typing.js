/* ============================================================
    TYPING.JS — Efecto de tipeo animado
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

// Exportar para usar desde main.js
window.typeWriter = typeWriter;
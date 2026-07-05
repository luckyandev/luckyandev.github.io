/* ============================================================
    MAIN.JS — Punto de entrada principal
    Inicializa todos los módulos una vez el DOM está listo.
    El orden importa: theme primero para evitar flash.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Los módulos se auto-inicializan con su propio DOMContentLoaded,
    // pero aquí podemos añadir lógica extra de coordinación.

    // Efecto de tipeo en el nombre del hero (opcional)
    const heroName = document.getElementById('heroName');
    if (heroName && window.typeWriter) {
        const fullName = heroName.dataset.text || heroName.textContent;
        heroName.textContent = '';
        window.typeWriter(heroName, fullName, 80);
    }
});
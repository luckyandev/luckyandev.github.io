/*  ============================================================
    THEME.JS - scripts/theme.js
    ES: Interruptor de modo oscuro / claro. Guarda la
        preferencia en localStorage para recordarla entre
        visitas, y cambia el icono (sol/luna) segun el tema.
    EN: Dark / light mode toggle. Saves the preference in
        localStorage to remember it across visits, and swaps
        the icon (sun/moon) depending on the active theme.
    ============================================================  */

/*  ES: Iconos de sol y luna.
    EN: Sun and moon icons.  */
const sunIcon = `<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>`;
const moonIcon = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`;

/*  ES: Aplica el tema al <html>, lo guarda y actualiza el icono.
    EN: Applies the theme to <html>, saves it and updates the icon.  */
function setTheme(theme) {
    const html = document.documentElement;
    const themeIcon = document.getElementById('themeIcon');
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (themeIcon) {
        themeIcon.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
    }
}

/*  ES: Oscuro por defecto y conecta el boton de cambio de tema.
    EN: Dark by default and wires up the theme toggle button.  */
function initTheme() {
    setTheme('dark');

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            setTheme(current === 'dark' ? 'light' : 'dark');
        });
    }
}

document.addEventListener('DOMContentLoaded', initTheme);
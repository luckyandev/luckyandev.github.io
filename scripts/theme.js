/* ============================================================
    THEME.JS — Dark / Light mode toggle
   ============================================================ */

const sunIcon = `<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>`;
const moonIcon = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`;

function setTheme(theme) {
    const html = document.documentElement;
    const themeIcon = document.getElementById('themeIcon');
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (themeIcon) {
        themeIcon.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
    }
}

function initTheme() {
    const saved = localStorage.getItem('theme') || 'dark';
    setTheme(saved);

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            setTheme(current === 'dark' ? 'light' : 'dark');
        });
    }
}

document.addEventListener('DOMContentLoaded', initTheme);
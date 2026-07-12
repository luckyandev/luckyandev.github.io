/* ============================================================
    LANGUAGE.JS — Sistema de internacionalización ES / EN
   ============================================================ */

let currentLang = localStorage.getItem('lang') || 'es';

async function loadContent(lang) {
    // Los archivos de contenido están en /data/content-es.js y /data/content-en.js
    // Se importan como módulos o se accede al objeto global window.CONTENT
    const content = lang === 'en' ? window.CONTENT_EN : window.CONTENT_ES;
    if (!content) return;

    // Traduccion del texto
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (content[key]) {
            el.textContent = content[key];
        }
    });

    // Traducción de tooltips
    document.querySelectorAll('[data-tooltip-en]').forEach(el => {
        el.setAttribute(
            'data-tooltip',
            lang === 'en'
                ? el.dataset.tooltipEn
                : el.dataset.tooltipEs || el.dataset.tooltip
        );
    });

    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);
    currentLang = lang;
}

function initLanguage() {
    loadContent(currentLang);

    const langBtn = document.getElementById('langToggle');
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            const next = currentLang === 'es' ? 'en' : 'es';
            loadContent(next);
            langBtn.textContent = next === 'es' ? 'EN' : 'ES';
        });
    }
}

document.addEventListener('DOMContentLoaded', initLanguage);
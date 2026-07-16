/* ============================================================
    LANGUAGE.JS - scripts/language.js
    ES: Sistema de internacionalizacion ES / EN.
        Lee el contenido de /data/content-es.js y
        /data/content-en.js y rellena todos los elementos con
        atributo data-i18n con el texto en el idioma activo.
    EN: ES / EN internationalization system.
        Reads content from /data/content-es.js and
        /data/content-en.js and fills every element with a
        data-i18n attribute with text in the active language.
   ============================================================ */
    
/* ES: Idioma actual, "es" por defecto.
   EN: Current language, "es" by default. */
let currentLang = 'es';

async function loadContent(lang) {
    const content = lang === 'en' ? window.CONTENT_EN : window.CONTENT_ES;
    if (!content) return;

    /* ES: Traduccion del texto normal.
       EN: Translation of regular text. */
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (content[key]) {
            el.textContent = content[key];
        }
    });

    /* ES: Traduccion de tooltips (atributo data-tooltip).
       EN: Translation of tooltips (data-tooltip attribute). */
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

/* ES: Carga el idioma guardado y conecta el boton de idioma (#langToggle).
   EN: Loads the saved language and wires up the language button (#langToggle). */
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
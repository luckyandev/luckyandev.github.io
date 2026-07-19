/*  ==========================================================
    EMAIL-PROTECT.JS - scripts/email-protect.js
    ES: Construye el enlace mailto en tiempo de ejecución para
        que el email no aparezca en texto plano en el HTML
        (evita que bots que solo leen HTML estático lo recolecten).
    EN: Builds the mailto link at runtime so the email doesn't
        appear as plain text in the HTML (stops bots that only
        read static HTML from harvesting it).
    ==========================================================  */
    
function initEmailProtection() {
    document.querySelectorAll(".js-email-link").forEach(link => {
        const user = link.dataset.user;
        const domain = link.dataset.domain;
        link.setAttribute("href", `mailto:${user}@${domain}`);
    });
}

document.addEventListener("DOMContentLoaded", initEmailProtection);
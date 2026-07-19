/*  ============================================================
    NAVBAR.JS - scripts/navbar.js
    ES: Comportamiento de la navbar - scroll, sección activa
        y menú hamburger para móvil/tablet.
    EN: Navbar behaviour - scroll, active section highlight
        and hamburger menu for mobile/tablet.
    ============================================================  */
    
function initNavbar() {
    const nav = document.querySelector("nav");
    if (!nav) return;

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobileMenu");

    /*  ES: Navegación interna sin tocar la URL - hace scroll suave al
            destino pero evita que el navegador añada el "#seccion"
            a la barra de direcciones.
        EN: Internal navigation without touching the URL - smooth
            scrolls to the target but stops the browser from adding
            "#section" to the address bar.  */
    function scrollToSection(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute("href");
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    }
    navLinks.forEach(link => link.addEventListener("click", scrollToSection));

    /*  ES: Detectamos qué sección ocupa el viewport y
            marcamos el enlace correspondiente.
        EN: Detect which section is currently visible and
            highlight its corresponding navbar link.  */
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const id = entry.target.id;
            navLinks.forEach(link => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === `#${id}`
                );
            });
        });
    }, { threshold: 0.4 });
    sections.forEach(section => sectionObserver.observe(section));

    /*  ES: Si no existe el menú móvil terminamos aquí.
        EN: Stop here if mobile menu doesn't exist.  */
    if (!hamburger || !mobileMenu) return;

    /*  ES: Función para abrir el menú.
        EN: Opens the mobile menu.  */
    function openMenu() {
        mobileMenu.classList.add("open");
        hamburger.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    /*  ES: Función para cerrar el menú.
        EN: Closes the mobile menu.  */
    function closeMenu() {
        mobileMenu.classList.remove("open");
        hamburger.classList.remove("active");
        document.body.style.overflow = "";
    }

    /*  ES: Toggle del menú hamburguesa.
        EN: Hamburger menu toggle.  */
    hamburger.addEventListener("click", (e) => {
        e.stopPropagation();
        if (mobileMenu.classList.contains("open")) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    /*  ES: Cerrar al pulsar un enlace del menú móvil.
        EN: Close menu after clicking any mobile link.  */
    mobileMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", (e) => {
            scrollToSection(e);
            closeMenu();
        });
    });

    /*  ES: Cerrar al hacer click fuera del menú.
        EN: Close menu when clicking outside.  */
    document.addEventListener("click", (e) => {
        if (!mobileMenu.classList.contains("open")) return;
        if (
            !mobileMenu.contains(e.target) &&
            !hamburger.contains(e.target)
        ) {
            closeMenu();
        }
    });

    /*  ES: Si el usuario vuelve a escritorio (>900px),
            cerramos automáticamente el menú.
        EN: Automatically close the menu when returning
            to desktop (>900px).  */
    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            closeMenu();
        }
    });
}

/*  ES: Inicializamos cuando el DOM está listo.
    EN: Initialize once the DOM is ready.  */
document.addEventListener("DOMContentLoaded", initNavbar);
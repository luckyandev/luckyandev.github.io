/*  ============================================================
    CATALOG-FILTER.JS - scripts/catalog-filter.js
    ES: Motor generico de busqueda + filtro por tecnologia
        (desplegable con buscador interno) + orden por fecha.
        Lo usan tanto proyectos.html como certificados.html,
        cada una pasandole sus propios selectores (ver el
        <script> al final de cada pagina).

        Cada tarjeta (.project-card o .cert-card) debe llevar:
            - data-tags="html css javascript" (separados por espacio)
            - data-date="2025-06" (AAAA-MM, para ordenar)

        Las tarjetas "proximamente" / "en progreso" pueden no
        llevar data-tags, se comportan igual que cualquier otra
        a efectos de filtro.

    EN: Generic search + technology filter (dropdown with
        internal search) + date sort engine. Used by both
        proyectos.html and certificados.html, each passing its
        own selectors (see the <script> at the bottom of each
        page).

        Every card (.project-card or .cert-card) must have:
            - data-tags="html css javascript" (space separated)
            - data-date="2025-06" (YYYY-MM, for sorting)

        "Coming soon" / "in progress" cards can skip data-tags,
        they behave like any other card for filtering purposes.
    ============================================================  */

function initCatalogFilter(config) {
    const grid = document.querySelector(config.gridSelector);
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll(config.cardSelector));
    const searchInput = document.querySelector(config.searchInputSelector);
    const tagFilterRoot = document.querySelector(config.tagContainerSelector);
    const sortSelect = document.querySelector(config.sortSelectSelector);
    const emptyState = document.querySelector(config.emptyStateSelector);

    let activeTags = new Set();
    let query = "";

    /*  ES: Recopilamos todos los tags distintos que aparecen en las tarjetas.
        EN: Collect every distinct tag that appears across the cards.  */
    const allTags = new Set();
    cards.forEach(card => {
        (card.dataset.tags || "")
            .split(" ")
            .map(t => t.trim())
            .filter(Boolean)
            .forEach(t => allTags.add(t));
    });
    const sortedTags = [...allTags].sort();

    /*  ES: Construimos el desplegable: boton (con contador) +
            panel con buscador interno + lista de checkboxes.
        EN: Build the dropdown: toggle button (with counter) +
            panel with internal search + checkbox list.  */
    let toggleBtn, countBadge, panel, tagSearchInput, tagList, clearBtn;

    if (tagFilterRoot) {
        tagFilterRoot.innerHTML = `
            <button type="button" class="tag-filter-toggle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/></svg>
                <span class="tag-filter-toggle-label" data-i18n="catalog.filter.tecno">Tecnologías</span>
                <span class="tag-filter-count"></span>
                <svg class="tag-filter-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div class="tag-filter-panel" hidden>
                <div class="tag-filter-search">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <input type="text" class="tag-filter-search-input" placeholder="Buscar tecnología...">
                </div>
                <div class="tag-filter-list"></div>
                <button type="button" class="tag-filter-clear">Limpiar filtros</button>
            </div>
        `;

        toggleBtn = tagFilterRoot.querySelector(".tag-filter-toggle");
        countBadge = tagFilterRoot.querySelector(".tag-filter-count");
        panel = tagFilterRoot.querySelector(".tag-filter-panel");
        tagSearchInput = tagFilterRoot.querySelector(".tag-filter-search-input");
        tagList = tagFilterRoot.querySelector(".tag-filter-list");
        clearBtn = tagFilterRoot.querySelector(".tag-filter-clear");

        /*  ES: Pintamos una opcion (checkbox) por cada tag encontrado.
            EN: Render one checkbox option per tag found.  */
        sortedTags.forEach(tag => {
            const option = document.createElement("label");
            option.className = "tag-filter-option";
            option.innerHTML = `<input type="checkbox" value="${tag}"><span>${tag}</span>`;
            const checkbox = option.querySelector("input");
            checkbox.addEventListener("change", () => {
                if (checkbox.checked) {
                    activeTags.add(tag);
                } else {
                    activeTags.delete(tag);
                }
                updateCount();
                applyFilters();
            });
            tagList.appendChild(option);
        });

        /*  ES: Abrir / cerrar el panel.
            EN: Open / close the panel.  */
        toggleBtn.addEventListener("click", () => {
            const isOpen = !panel.hidden;
            panel.hidden = isOpen;
            toggleBtn.classList.toggle("open", !isOpen);
        });

        /*  ES: Cerrar al hacer click fuera.
            EN: Close when clicking outside.  */
        document.addEventListener("click", e => {
            if (!tagFilterRoot.contains(e.target)) {
                panel.hidden = true;
                toggleBtn.classList.remove("open");
            }
        });

        /*  ES: Buscador interno - filtra las opciones visibles de la lista.
            EN: Internal search - filters the visible options in the list.  */
        tagSearchInput.addEventListener("input", () => {
            const q = tagSearchInput.value.trim().toLowerCase();
            tagList.querySelectorAll(".tag-filter-option").forEach(opt => {
                const label = opt.textContent.trim().toLowerCase();
                opt.style.display = label.includes(q) ? "" : "none";
            });
        });

        /*  ES: Limpiar todos los filtros de tag activos.
            EN: Clear all active tag filters.  */
        clearBtn.addEventListener("click", () => {
            activeTags.clear();
            tagList.querySelectorAll("input[type=checkbox]").forEach(cb => cb.checked = false);
            updateCount();
            applyFilters();
        });

        function updateCount() {
            if (activeTags.size > 0) {
                countBadge.textContent = activeTags.size;
                countBadge.style.display = "";
            } else {
                countBadge.style.display = "none";
            }
        }
    }

    /*  ES: Aplica busqueda de texto + tags activos, oculta lo que no encaje.
        EN: Applies text search + active tags, hides anything that doesn't match.  */
    function applyFilters() {
        let visibleCount = 0;
        cards.forEach(card => {
            const tags = (card.dataset.tags || "").toLowerCase().split(" ");
            const text = card.textContent.toLowerCase();

            const matchesTags =
                activeTags.size === 0 ||
                [...activeTags].some(tag => tags.includes(tag.toLowerCase()));

            const matchesQuery = !query || text.includes(query);

            const visible = matchesTags && matchesQuery;
            card.style.display = visible ? "" : "none";
            if (visible) visibleCount++;
        });

        if (emptyState) {
            emptyState.style.display = visibleCount === 0 ? "flex" : "none";
        }
    }

    if (searchInput) {
        searchInput.addEventListener("input", e => {
            query = e.target.value.trim().toLowerCase();
            applyFilters();
        });
    }

    /*  ES: Reordena las tarjetas en el DOM segun data-date.
        EN: Reorders the cards in the DOM based on data-date.  */
    if (sortSelect) {
        sortSelect.addEventListener("change", () => {
            const order = sortSelect.value; // "newest" | "oldest"
            const sorted = cards.slice().sort((a, b) => {
                const da = a.dataset.date || "";
                const db = b.dataset.date || "";
                return order === "newest" ? db.localeCompare(da) : da.localeCompare(db);
            });
            sorted.forEach(card => grid.appendChild(card));
        });
    }

    applyFilters();
}
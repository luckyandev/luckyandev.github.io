# Lucas Gimeno - Portfolio
<p align="left">
    <a href="./README.md"><strong>⬅️ Volver</strong></a>
</p>

Portfolio personal de **Lucas Gimeno**, desarrollador backend especializado en Java. Sitio web estático desarrollado completamente con **HTML, CSS y JavaScript Vanilla**, sin frameworks ni herramientas de compilación.

🔗 **Demo:** _Añade aquí el enlace cuando publiques el portfolio (GitHub Pages, Vercel, Netlify...)_

# ✨ Características
- 🌍 **Bilingüe (ES/EN)** con traducción instantánea mediante `data-i18n`.
- 🌙 **Modo claro y oscuro** con cambio manual mediante un botón.
- 📱 **Diseño totalmente responsive**, adaptado a escritorio, tablet y móvil.
- 📂 **Catálogo de proyectos y certificados** con buscador, filtros y ordenación.
- ⚡ **Sin dependencias externas** ni procesos de compilación.

# 🛠️ Stack
| Capa | Tecnología |
|---|---|
| Estructura | HTML5 |
| Estilos | CSS3 |
| Lógica | JavaScript (ES6) |
| Iconos | Font Awesome + SVG |
| Tipografía | Inter + JetBrains Mono |

# 📁 Estructura del proyecto
```text
portfolio/
├── index.html
├── projects.html
├── certificates.html
│
├── data/
│   ├── content-es.js
│   └── content-en.js
│
├── scripts/
│   ├── theme.js
│   ├── language.js
│   ├── navbar.js
│   ├── animations.js
│   ├── typing.js
│   └── catalog-filter.js
│
├── styles/
│   ├── variables.css
│   ├── globals.css
│   ├── animations.css
│   ├── navbar.css
│   ├── hero.css
│   ├── about.css
│   ├── experience.css
│   ├── projects.css
│   ├── skills.css
│   ├── contact.css
│   ├── catalog.css
│   └── responsive.css
│
└── assets/
    ├── icons/
    └── images/
```

# 🌍 Sistema de idiomas
Todos los textos utilizan el atributo `data-i18n`.

El archivo `language.js` actualiza automáticamente el contenido utilizando los diccionarios:

- `content-es.js`
- `content-en.js`

Añadir un nuevo idioma únicamente requiere crear un nuevo diccionario con las mismas claves.

# 🎨 Sistema de temas
Toda la paleta de colores está centralizada en `styles/variables.css` mediante CSS Custom Properties.

Esto permite cambiar completamente el aspecto de la web modificando un único archivo.

# ⚠️ Orden de carga
Los archivos CSS deben cargarse en este orden:

1. variables.css
2. globals.css
3. resto de estilos
4. responsive.css (siempre el último)

Esto garantiza que las reglas responsive puedan sobrescribir correctamente el resto de estilos.

## 🚀 Ejecutar en local
No requiere instalación ni dependencias.

Clona o descarga el repositorio y abre `index.html` en tu navegador.

Opcionalmente, puedes servir el proyecto con un servidor estático:

```bash
npx serve .
```

o

```bash
python3 -m http.server
```

# 📬 Contacto
- GitHub: **@luckyandev**
- LinkedIn: **lucasgimeno**
- Email: **lucasgimeno007@gmail.com**
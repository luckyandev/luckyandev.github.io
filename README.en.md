# Lucas Gimeno - Portfolio
<p align="left">
    <a href="./README.md"><strong>⬅️ Back</strong></a>
</p>

Personal portfolio of **Lucas Gimeno**, a Backend Developer specialized in Java. Built entirely with **HTML, CSS and Vanilla JavaScript**, without frameworks or build tools.

🔗 **Live Demo:** _Add your portfolio URL here (GitHub Pages, Vercel, Netlify...)_

# ✨ Features
- 🌍 **Bilingual (Spanish / English)** with real-time language switching using `data-i18n`.
- 🌙 **Light & Dark Mode** with manual theme switching.
- 📱 **Fully responsive** across desktop, tablet and mobile devices.
- 📂 **Projects & Certificates catalog** with search, filters and sorting.
- ⚡ **No dependencies or build process** required.

# 🛠️ Tech Stack
| Layer | Technology |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 |
| Logic | Vanilla JavaScript (ES6) |
| Icons | Font Awesome + SVG |
| Typography | Inter + JetBrains Mono |

# 📁 Project Structure
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

# 🌍 Internationalization
Every visible text uses the `data-i18n` attribute.

The `language.js` script dynamically replaces the content using:

- `content-es.js`
- `content-en.js`

Adding a new language only requires creating another dictionary with the same translation keys.

# 🎨 Theme System
All colors are defined as CSS Custom Properties inside `styles/variables.css`.

This makes it easy to redesign the entire website by editing a single file.

# ⚠️ CSS Loading Order
The CSS files are intentionally loaded in this order:

1. variables.css
2. globals.css
3. remaining stylesheets
4. responsive.css (always last)

This ensures responsive rules properly override previous styles.

## 🚀 Running Locally
This project has no build process or external dependencies.

Simply clone or download the repository and open `index.html` in your browser.

Alternatively, you can serve it using any static web server:

```bash
npx serve .
```

or

```bash
python3 -m http.server
```

# 📬 Contact
- GitHub: **@luckyandev**
- LinkedIn: **lucasgimeno**
- Email: **lucasgimeno007@gmail.com**
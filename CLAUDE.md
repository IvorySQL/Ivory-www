# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Official website for **IvorySQL** (https://ivorysql.org) — open source Oracle-compatible PostgreSQL. Built with **Docusaurus 3** (v3.9.2), React 18, and plain CSS. Deployed to **Netlify** on every push to `main`.

## Essential Commands

```bash
yarn              # Install dependencies
yarn start        # Dev server with hot reload (port 3000)
yarn build        # Generate static site to build/
yarn serve        # Serve the production build locally
yarn swizzle      # Copy a theme component to src/theme/ for customization
yarn clear        # Clear .docusaurus/ build cache
```

There is **no linting or test framework** configured. Development is edit-and-preview via the Docusaurus dev server.

## Codebase Architecture

```
src/
  clientModules/    # Browser-level modules (e.g. lang-redirect.js for locale detection)
  components/       # Reusable React components (e.g. HomepageFeatures)
  css/              # Global styles (custom.css)
  data/             # Data utilities (contributors.js)
  pages/            # Route-level pages (JS, MDX, MD)
    index.js        # Homepage — large file with inline data for features, customers, ecosystem
    community-page.md
    contribution-guidelines.md
    contributors.js      # Dynamic page fetching contributor data
    download-page.mdx
    releases-page.mdx
    roadmap-page.md
    vulnerability-management.md
    partners-page.mdx
    customer-stories-page.mdx
    events/            # ~20 event pages (MDX)
    news/              # Release and certification announcements (MDX)
  theme/               # Swizzled Docusaurus theme overrides
    BlogListPage/
    BlogPostItem/
    BlogPostPaginator/
blog/               # Standard Docusaurus blog posts (date-prefixed directories)
docs/               # Documentation (currently just intro.md)
i18n/               # Internationalization (en, zh-CN)
static/             # Static assets (images, fonts, PDFs, Netlify _headers/_redirects)
svg/                # SVG graphics for homepage and components
```

### Key architectural notes

- **Homepage** (`src/pages/index.js`, 64KB) is the largest file — it embeds extensive inline data (features, trusted customers, ecosystem tools) rather than fetching externally.
- **Blog vs News** are separate: `/blog` uses Docusaurus blog (`blog/` dir), while `/news` is a custom page module (`src/pages/news/`).
- **i18n**: Full English/Chinese support. `src/clientModules/lang-redirect.js` auto-redirects Chinese browser locales to `/zh-CN/`. Locale files live in `i18n/zh-CN/`.
- **Pages are mixed formats**: `.js` (React components with dynamic data), `.mdx` (Markdown + JSX), and `.md` (plain Markdown).
- **No TypeScript** — all code is JavaScript/JSX.
- **Environment variables**: Uses `docusaurus-plugin-dotenv` loading from `.env` for `BOT_ID` and `TOKEN`.
- **Search**: Uses `@easyops-cn/docusaurus-search-local` (local, no external service). Configured in `docusaurus.config.js`.
- **Theme swizzling**: Three theme components are overridden (`BlogListPage`, `BlogPostItem`, `BlogPostPaginator`). Use `yarn swizzle` to add more.

## Common Development Tasks

### Adding a blog post
Create a new directory under `blog/` with date-prefixed naming: `blog/YYYY-MM-DD-slug-title/index.md`. Add frontmatter (title, authors, date, tags, cover_image).

### Adding a news article
Create a new MDX file under `src/pages/news/`.

### Adding a static page
Create a `.mdx` or `.js` file under `src/pages/`. The filename (minus extension) becomes the route. For MDX pages, the content renders directly; for JS pages, export a React component as default.

### Modifying the navbar or footer
Edit `docusaurus.config.js` under `themeConfig.navbar` or `themeConfig.footer`.

### Adding custom styles
Add to `src/css/custom.css` (loaded globally) or use CSS modules alongside components.

### Swizzling a theme component
Run `yarn swizzle @docusaurus/theme-classic <ComponentName>` and select "eject" to copy to `src/theme/`.

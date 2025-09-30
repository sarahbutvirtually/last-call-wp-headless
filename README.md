## Last Call – WP Headless

Headless portfolio site scaffold built with Next.js App Router. The repo name reflects the planned WordPress headless data source, but no WP integration is wired up yet.

### Tech stack
- Next.js 15 (App Router) with Turbopack for dev and build
- React 19
- Sass/SCSS for global styles and CSS Modules
- ESLint 9 with `next/core-web-vitals` config (flat config)
- `next/font` (Geist and Geist Mono) for optimized font loading

### Project structure
```
src/
	app/
		layout.js         # Root layout + <html>/<body> and next/font setup
		globals.scss      # Global styles and CSS variables
		page.js           # Home route
		page.module.scss  # Scoped styles for the home route (empty starter)
public/               # Static assets (favicons, images, etc.)
eslint.config.mjs     # Flat ESLint config extending next/core-web-vitals
jsconfig.json         # Path alias: @/* -> ./src/*
next.config.mjs       # Next.js config (currently minimal)
```

---

## Getting started

Prerequisites
- Node.js 18.18+ or 20+ (recommended: Node 20)
- A package manager: npm, pnpm, yarn, or bun

Install dependencies
```bash
npm install
```

Run the dev server
```bash
npm run dev
```
Then open http://localhost:3000

Lint the code
```bash
npm run lint
```

Build and start production
```bash
npm run build
npm run start
```

Notes
- Dev and build scripts use Turbopack (`--turbopack`). You can remove the flags if you prefer the classic builder.
- React 19 is enabled. Some third‑party libraries may still be catching up; pin compatible versions as needed.

---

## App and routing
- Uses the App Router (`src/app`). The home page lives at `src/app/page.js`.
- Global HTML shell, metadata, and font variables are set in `src/app/layout.js`.
- Add new routes by creating files/folders under `src/app` (e.g., `src/app/about/page.js`).

## Styling
- Global styles: `src/app/globals.scss` (CSS variables, resets, base styles).
- Route/page styles: co-locate with the route using CSS Modules, e.g., `page.module.scss`.
- Sass is already configured via the `sass` dependency; just import `.scss` files.

## Fonts
`next/font` loads Geist and Geist Mono and exposes CSS variables:
- `--font-geist-sans`
- `--font-geist-mono`

These are applied on `<body>` in `layout.js`. Use them in CSS with `var(--font-geist-sans)` etc.

## Path aliases
`jsconfig.json` provides `@/*` → `src/*`.
Example:
```js
import Button from "@/components/Button";
```

## Configuration
`next.config.mjs` is currently minimal. Add settings here for images, redirects, headers, experimental flags, etc.

Environment variables
- None are required yet. For future WordPress integration you’ll likely add:
	- `NEXT_PUBLIC_WP_API_URL` (REST) or `NEXT_PUBLIC_WP_GRAPHQL_URL` (WPGraphQL)
	- Server-only secrets prefixed without `NEXT_PUBLIC_` as needed

Create a `.env.local` and restart the dev server when adding env vars.

## Deployment
This app can be deployed to any platform that supports Next.js 15. Common options:
- Vercel (zero-config, recommended)
- Node server (run `npm run build && npm run start`)

If deploying to Vercel, add any environment variables in the Vercel project settings.

## Troubleshooting
- Port already in use: stop other dev servers or set `PORT=3001 npm run dev`.
- Sass not compiling: ensure the `sass` package is installed (it is in package.json), then restart the dev server.
- ESLint errors: run `npm run lint` to see details; the config ignores `.next`, `node_modules`, and build outputs.
- React 19 compatibility: if a dependency isn’t ready, consider pinning an earlier compatible version or using an alternative.

## Scripts
- `dev`   – Start Next.js in dev mode with Turbopack
- `build` – Production build with Turbopack
- `start` – Run the production server
- `lint`  – Run ESLint using the flat config

## Roadmap (WP headless)
Planned but not implemented yet:
- Connect to WordPress (REST API or WPGraphQL) for content
- Data fetching via Next.js server components and route handlers
- Content modeling and caching strategy

---

Maintainer: Sarah Floyd (@sarahbutvirtually)

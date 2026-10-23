# Wasla — Arabic Job Search Frontend

An Arabic-first, right-to-left marketing website presenting **Wasla (وصلة)**, a job-search assistant concept. Built with Next.js, React, and TypeScript, with locally hosted fonts and a layered design system.

> **Scope:** This is the frontend marketing experience. Authentication, job matching, and application workflows are not implemented in this repository. Account links lead to an external Wasla demo service.

## Highlights

- Six pages: Home, Journey, Pricing, FAQ, Trust, and Autopilot.
- Arabic RTL layout, responsive navigation, and custom brand assets.
- Animated product storytelling and interactive FAQ accordions.
- Reusable UI components and feature-oriented source organization.
- Static export for deployment without a Node.js production server.
- Bundled fonts with their original license notices.

## Technology

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Radix UI · Lucide icons

## Getting started

Use **Node.js 22.13 or newer** and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000. No environment variables are required by the current source.

## Validation and static export

```bash
npm run typecheck
npm run build
npm run preview
```

The build produces `out/`. Serve that directory using a static host with directory-index support. `npm run start` is intended for server builds and is not used with this project's static-export configuration. Root-relative asset paths assume deployment at the domain root; a GitHub Pages project subpath requires additional base-path configuration.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Product introduction and landing experience |
| `/journey/` | Guided product journey |
| `/pricing/` | Plans and credit presentation |
| `/faq/` | Frequently asked questions |
| `/trust/` | Trust and approval messaging |
| `/autopilot/` | Autopilot concept preview |

## Project structure

| Directory | Responsibility |
| --- | --- |
| `src/app/` | App Router pages and root layout |
| `src/features/` | Product sections, motion hooks, and feature styles |
| `src/components/` | Shared branding and reusable UI |
| `src/data/` | Pricing and display content |
| `src/design-system/` | Design tokens, typography, and themes |
| `src/lib/` | Shared utilities |
| `src/vendor/` | Bundled vendor stylesheet |
| `public/` | Fonts, license notices, icons, and media |
| `docs/` | Architecture and development notes |

See [architecture](docs/ARCHITECTURE.md) for rendering, stylesheet layering, and service boundaries.

## Source and licensing

Prepared from the supplied Wasla Frontend v40 archive. Original visual assets and font license notices are retained. No open-source license has been assigned to the project source. Review asset rights before redistribution.

## GitHub Pages

Public frontend URL after Pages deployment: https://elmlahym-wq.github.io/wasla-frontend/

The Pages workflow builds all six routes with `NEXT_PUBLIC_BASE_PATH=/wasla-frontend`, adjusts public font URLs, and deploys the static export. Enable **Settings → Pages → Source → GitHub Actions** once. Local/root hosting continues to work without the environment variable.

The repository contains the marketing frontend only. Existing `/app` calls to action still open the separately hosted workspace demo; deploying this repository does not migrate that application.

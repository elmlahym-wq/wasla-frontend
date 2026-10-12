# Architecture

## Routing and rendering

Next.js App Router renders six Arabic, right-to-left marketing routes. `src/app/layout.tsx` sets document language, direction, metadata, font preloads, and first-paint animation handling. Static export is enabled in `next.config.ts`; the deployment artifact is `out/`.

## Source boundaries

- `src/app/`: route entry points and global stylesheet imports.
- `src/features/marketing/`: landing sections, navigation, and interaction hooks.
- `src/components/common/`: shared branding, link handling, and motion helpers.
- `src/components/ui/`: reusable Radix-based UI primitives.
- `src/data/`: display content, including pricing.
- `src/design-system/`: tokens, typography, base rules, and Arabic theme.
- `src/features/`: also retains supporting styles from the original v40 design.
- `src/lib/`: shared utility functions.
- `src/vendor/`: bundled third-party stylesheet.
- `public/`: fonts, font licenses, icons, and brand media.

CSS import order is intentional: later campaign and theme layers override shared rules. Supporting CSS is retained to preserve the original presentation.

## Interaction and service boundary

Client components implement navigation menus, accordions, section activation, and animated storytelling. `SiteLink` forwards `/app` links to the existing external Wasla demo service. This repository contains no authentication, backend, job matching engine, or application submission implementation. Marketing copy and pricing are presentation content, not a guarantee of implemented service behavior.

## Assets

Fonts are served locally. Keep their accompanying license files when redistributing assets. Project source has no newly assigned open-source license; third-party font licenses apply to their respective font files.

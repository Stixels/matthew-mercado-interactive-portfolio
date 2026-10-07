# Matthew Mercado — Interactive Portfolio

An interactive software engineering portfolio. It opens on a "game master camera feed" hero where visitors sweep a UV light across an escape-room floor plan to uncover real project results, then hands off to case files, about, experience, and contact sections in matching light and dark themes.

## Local development

**Prerequisites:** Node.js 20+

1. Install dependencies: `pnpm install`
2. Start the dev server: `pnpm dev` (Next.js 16 uses [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) by default for `dev` and `build`)

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description           |
| --------------- | --------------------- |
| `pnpm dev`   | Development server    |
| `pnpm build` | Production build      |
| `pnpm start` | Run production build  |
| `pnpm lint`  | ESLint                |
| `pnpm clean` | Remove `.next` output |

## Stack

Next.js, React, Motion, Tailwind CSS.

The hero's flashlight writes its position to CSS custom properties and reveals the hidden layer with a radial mask, so it needs no canvas or 3D library. Themes are CSS tokens on `:root`, following the system setting until a visitor picks one with the nav toggle.

Case study content lives in `content/portfolio/projects.ts`; each entry's brief, metrics, and build decisions drive its page under `/projects/[id]`.

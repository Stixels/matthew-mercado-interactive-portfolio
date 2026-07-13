# Matthew Mercado — Interactive Portfolio

A scroll-driven software engineering portfolio centered on a procedural 3D application architecture. The opening sequence follows one web application through its frontend, full-stack services, AI layer, and real-world integrations before handing off to accessible project case studies and experience details.

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

Next.js, React, React Three Fiber, Three.js, Motion, Tailwind CSS, Zustand.

The 3D scene is procedural—there is no external model download. Motion provides the scroll progress value that drives the React Three Fiber scene, so GSAP is not required for the current choreography.

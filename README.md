# SLICE Robotics Website

This is the Astro website for SLICE Robotics (FRC Team 8738). The pages live in `src/pages/`, reusable site components are in `src/components/`, and images are in `public/images/`.

## Updating the website

See [`contributions.md`](./contributions.md) for a beginner-friendly guide to finding and editing every page, updating images and shared site information, previewing changes, and checking the build.

## Run locally

The project requires Node.js 22.12.0 or newer. From the project folder:

```sh
npm install
npm run dev
```

Open the local address shown in the terminal, usually `http://localhost:4321`. To check the production build, run:

```sh
npm run build
```

The production site is built and deployed to GitHub Pages by the workflow in `.github/workflows/astro.yml` when changes reach `main`.

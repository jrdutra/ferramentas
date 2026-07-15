# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project Overview

**utily.tools** is a collection of developer utility tools built as an Angular 17 SSR application and deployed to Azure Web App. The UI is in English.

## Commands

- `npm run dev` / `ng serve` - dev server (default port 4200)
- `npm run build` / `ng build --configuration production` - production build with SSR + prerendering
- `npm start` / `node dist/server/server.mjs` - run the SSR production server
- `ng test` - run Karma/Jasmine tests

## Architecture

### Standalone Components (no NgModules)

All components use `standalone: true` with direct imports. There is no shared module; each component declares its own Angular Material and other imports.

### Routing

All routes are defined in `src/app/app.routes.ts` as a flat list (no lazy loading). Each tool is a route like `/base64`, `/editor-json`, `/visualizador-jwt`, etc.

### Tool Components

Each tool lives in `src/app/ferramentas/<tool-name>/` with its own component. The home page (`src/app/home/home.component.ts`) defines the tool catalog with groups and metadata; this is where new tools must be registered for display on the homepage.

Navigation is handled by `src/app/menu/menu.component.ts` which also requires updating when adding new tools.

### Services

- `src/app/data.service.ts` - global title state via `BehaviorSubject`, used by all tool components to set the toolbar title on init
- `src/app/services/` - domain logic extracted from components (base64, json, jwt, certificate, ocr, manipula-string, texto-global)

### SSR

Angular SSR is configured with Express in `server.ts`. The app uses `provideClientHydration()` and `CommonEngine`. Components that access browser APIs (`window`, `localStorage`, `document`) must guard with `typeof window === 'undefined'` checks.

### External Integrations

- **Socket.io** - `texto-global` component connects to an Azure-hosted WebSocket server for real-time shared text
- **Azure Cognitive Services** - OCR service calls Azure Computer Vision API
- **QR Code** - `angularx-qrcode` library + `qrcode` for custom rendering with round modules

### Styling

Global theme in `src/styles.css` uses a dark neon aesthetic with CSS custom properties (`--navy-*`, `--aqua`, `--purple`, `--text-main`, etc.). Angular Material purple-green prebuilt theme is the base. Component-specific styles for QR code tool (style cards, modals, sliders) are also in the global stylesheet.

## CI/CD

GitHub Actions workflow (`.github/workflows/main_ferramenta.yml`) builds on push to `main` and deploys to Azure Web App "ferramenta" via `azure/webapps-deploy`. The recommended Azure startup command is `npm start`, or directly `node ./dist/server/server.mjs`.

## Conventions

- TypeScript strict mode is enabled with Angular strict templates
- UI text is in English
- 2-space indentation, single quotes for TypeScript (see `.editorconfig`)
- `ChangeDetectionStrategy.OnPush` is used on some components (AppComponent, HomeComponent)

## Imported Claude Cowork project instructions

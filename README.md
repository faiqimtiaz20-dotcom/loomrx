# LoomRX — Phase 1 MVP UI

React + TypeScript + Vite + Tailwind CSS implementation of the Phase 1 UI roadmap (`docs/UI_CREATION_ROADMAP.md`).

## Scripts

- `npm run dev` — local dev server (http://localhost:5173)
- `npm run build` — typecheck + production bundle
- `npm run preview` — preview production build

## Environment

Copy `.env.example` to `.env` for local overrides.

- `VITE_API_BASE_URL` — optional; base URL for future API calls (`src/lib/config.ts`).
- `VITE_CIRCLE_PORTAL_URL` / `VITE_CIRCLE_EMBED_URL` — optional Circle handoff + iframe (`src/lib/publicConfig.ts`, Community page).
- `VITE_OPENAI_ENABLED` — optional `true` / `1` shows the AI integration ribbon (`src/lib/publicConfig.ts`).

## Notes

- Auth, billing, AI, and uploads are **UI/demo** flows backed by `localStorage` (`loomrx-app-v2`) via `AppStateProvider`.
- Use **Sign in** with “Skip onboarding…” checked to reach the main app quickly; visit **`/`** for the marketing landing. Use the user menu **Become admin (demo)** to access `/admin/*`.
- Legal pages are placeholders — replace with counsel-approved copy before launch.

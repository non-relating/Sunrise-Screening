# Copilot / AI Agent Instructions for Sunrise-Screening

Purpose: Help AI coding agents become productive quickly by documenting the project's architecture, conventions, workflows, and concrete commands.

Big picture
- This is a Vite + React + TypeScript SPA (see `vite.config.ts` and `tsconfig.json`).
- UI: `src/pages/*` (route entry points) + `src/components/*` (reusable UI). `App.tsx` wires routes and global providers.
- State: centralized via `src/store/index.ts` (Zustand). Key stores: `useAuthStore`, `useServiceRequestsStore`, `useConfigStore`, `useUIStore`.
- Types: canonical shapes live in `src/types/index.ts` (use these for API mocks and schema validation).

Data & side-effect patterns
- Stores often simulate API calls (delays + mock data). Look at `src/store/index.ts` for examples of fetch/create flows and persisted auth using `zustand/persist` -> values are saved to `localStorage` under names like `auth-storage`.
- Network/3rd-party integrations: `@supabase/supabase-js`, `@google-cloud/firestore`, and `firebase-tools` are present — real integrations live under `src/services` when implemented; for now many pieces use environment variables (`VITE_*`) defined in `store.initializeConfig`.
- Environment keys to check: `VITE_API_URL`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_GOOGLE_MAPS_API_KEY`.

Conventions & notable patterns
- Import alias: `@/*` and several `@/` aliases are configured in `tsconfig.json` and `vite.config.ts`. Use `@/components`, `@/hooks`, `@/store`, `@/types`, `@/services`.
- State: keep business logic in `src/store/*` using actions on stores. Components call actions (e.g., `useServiceRequestsStore().fetchRequests()`).
- UI hooks: reusable hooks in `src/hooks/index.ts` (e.g., `useInitializeApp`, `useOnScreen`, `useLocalStorage`). Prefer adding small, focused hooks here.
- Mocking: many stores return mock objects (quotes, requests). When implementing real APIs, follow the existing shapes in `src/types/index.ts` to avoid type drift.
- Styling: Tailwind CSS + PostCSS (`tailwind.config.js`, `postcss.config.js`). Utility-first classes are used across components.

Build / test / lint / run
- Local dev: `npm run dev` (Vite dev server, opens on port 3000 as configured in `vite.config.ts`).
- Build: `npm run build` (runs `tsc` then `vite build`).
- Preview production build: `npm run preview`.
- Type check: `npm run type-check` (strict TypeScript options are enabled).
- Lint: `npm run lint` (ESLint configured to error on warnings; keep fixes minimal and consistent).
- Tests: `npm run test` runs Vitest. `npm run test:ui` starts Vitest UI. Coverage with `npm run test:coverage`.

PR / editing notes for AI agents
- If you change TypeScript types, update `src/types/index.ts` and run `npm run type-check`.
- When adding new stores: follow naming & persist pattern in `src/store/index.ts` and add a `devtools` and optional `persist` wrapper for user-related data.
- Follow the existing pattern for mocking vs real API calls: keep delays and try/catch blocks consistent with surrounding store implementations.

Where to start for common tasks
- Add a new page/route: create `src/pages/NewPage.tsx`, add a `Route` in `App.tsx` and a link in `Header.tsx`.
- Add a new store action: modify `src/store/index.ts` — shape it like `createRequest` or `fetchRequests` and reuse `set({ isLoading })` patterns.
- Wire a new external integration: create `src/services/{service}.ts`, read env vars via `import.meta.env.VITE_*`, and call it from stores.

Examples (concrete snippets to mimic)
- Persisted auth: `persist(..., { name: 'auth-storage', storage: createJSONStorage(() => localStorage) })` in `src/store/index.ts`.
- Path alias import: `import { useConfigStore } from '@/store'` (works because `@` maps to `src`).

Quick checklist before opening a PR
- Run `npm run type-check` and `npm run lint`.
- Run unit tests: `npm run test` and verify affected tests.
- Update `src/types` when changing payload shapes.
- Ensure env var usage is guarded (avoid runtime crashes when `VITE_*` missing).

If something isn't discoverable here
- Ask the maintainers for the intended backend API contracts or for access to staging Supabase/Firestore credentials.

Feedback
- If any section is unclear or you want additional examples (e.g., exact patterns for services or deployment steps), tell me which area to expand.

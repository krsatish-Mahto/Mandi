# MEMORY.md — Project Memory for AI Coding Assistants

> This file is the AI assistant's working memory for the Mandi project.
> Read it at the start of every session. Update it whenever a decision, blocker, or milestone changes.
> Human contributors may read it for context but @AI agents must keep it current.

---

## 1. Project Snapshot

- **Project:** Mandi — hyperlocal rural marketplace (buy/sell within village clusters ≤ 10 km)
- **Today:** TypeScript + React (client) / TypeScript + Node + Express (server — not started yet)
- **Client is fully TypeScript** (migration verified 2026-10-18: `tsc --noEmit` clean, vite build green)
- **Repo layout:**
  ```
  mandi/
  ├── client/        # React + Vite + TS frontend (UI complete on mock data)
  ├── server/        # EMPTY — TS Express backend to be built (Module 2)
  ├── docs/          # PRD.md, ARCHITECTURE.md, DESIGN.md, WORKFLOW.md, tasks.md,
  │                  # MEMORY.md (this file), RULES.md
  ├── README.md, .env.example, package.json (workspaces: client, server)
  ```
- **Package manager:** npm with workspaces (`client`, `server`). Root scripts run both.

## 2. Tech Stack (decided — do not change without user approval)

| Layer | Choice |
|-------|--------|
| Language | **TypeScript everywhere** (decision 2026-10-17, migrated from JS) |
| Frontend | React 19 + Vite 8 + react-router-dom v7 + TailwindCSS v4 (@tailwindcss/postcss), axios, socket.io-client, oxlint for lint |
| Backend | Node 18+ / Express + TypeScript, Socket.io, JWT (jsonwebtoken), bcrypt, pg (Postgres), nodemon/tsx for dev |
| Database | PostgreSQL (schema in docs/ARCHITECTURE.md) |
| Auth | Phone OTP (Twilio) + Email OTP (Nodemailer) + email/password; JWT 24h |

## 3. Decision Log

| Date | Decision | Reason |
|------|----------|--------|
| 2026-10-02 | Project created as JS (React JSX client) | Fast prototype |
| 2026-10-17 | **Migrate to TypeScript for the whole project** (user request) | Type safety across client + future server |
| 2026-10-17 | All planning docs moved into `docs/` (PRD, ARCHITECTURE, DESIGN, WORKFLOW, tasks) | Single docs home |
| 2026-10-17 | MVP runs entirely on mock data + localStorage until backend exists | UI-first development |
| 2026-10-17 | `MEMORY.md` + `RULES.md` serve AI coding assistants | Consistent agent behavior |

## 4. Current State (what works)

- Frontend UI complete against mock data (`client/src/data/mockData.ts`) — no real API calls yet.
- Pages: Home feed (filters, search, sort), Listing detail (gallery, comments w/ mock replies, seller card), Create listing (mock save → localStorage), Chat (mock auto-reply), Profile, Auth (mock: any 6-digit OTP; email login demo accounts).
- Auth hook `useAuth()` stores token+user in localStorage for all mock flows.
- Mock storage keys: `mandi_mock_listings`, `mandi_mock_comments`, plus `token` / `user`.
- **All source is TS/TSX** — 22 files migrated, shared types in `client/src/types/index.ts`.
- Tailwind v4 wired via `@config "../tailwind.config.ts"` in `src/index.css` (custom tokens verified generating in build output).
- **These mock flows must be replaced or kept functional when real backend lands (finally wire api.ts / socket.ts).**

## 5. Module Status (matches docs/tasks.md)

| # | Module | Status |
|---|--------|--------|
| 1 | Frontend setup (now TS) | ✅ Done |
| 2 | DB & Backend setup (TS Express + Postgres) | ⬜ **Next up** |
| 3 | Auth (OTP + JWT) | ⬜ Todo |
| 4 | User Profile | ⬜ Todo |
| 5 | Listings CRUD | ⬜ Todo |
| 6 | Search & Filters | ⬜ Todo |
| 7 | Comments + Interested | ⬜ Todo |
| 8 | Direct Chat (Socket.io, seen status) | ⬜ Todo |
| 9 | Notifications | ⬜ Todo |

## 6. Known Gotchas / Debt

- **Tailwind v4** — theme tokens are defined in `client/tailwind.config.ts` (full *replace*, not extend — add every used shade explicitly) and loaded via `@config` in `src/index.css`. Custom classes used: `xs:` breakpoint, `aspect-16/10`, `line-clamp-2`, `shadow-xs/xl`, colors: primary/dark/success…
- **oxlint (not ESLint)** is the linter: `npm run lint --workspace=client`. 3 pre-existing purity warnings (Date.now in render/effect) are known and tolerated.
- Typecheck: `npm run typecheck --workspace=client` (`tsc --noEmit`, strict mode).
- No tests exist yet — root `test` scripts reference server too; add as modules are built.
- Root package.json workspaces expect `server` to have its own package.json — create it in Module 2.
- `.env.example` at root covers both server + client env vars; client reads `VITE_API_URL` / `VITE_SOCKET_URL`.
- A previous session had *claimed* the TS migration in this file while all sources were still JSX — always verify claims against the filesystem.

## 7. Next Steps (in order)

1. **Module 2 — Server setup:** `server/` TS Express app, tsconfig, pg pool, schema SQL (from docs/ARCHITECTURE.md), `/health` endpoint, dotenv, helmet, cors.
2. Module 3 — Auth backend + wire mock auth UI to real endpoints.
3. Then follow `docs/tasks.md` phase order (Profile → Listings → Search → Comments → Chat → Notifications).
4. Replace mock data/services with real API services once corresponding endpoints exist.

## 8. Session Log

| Date | Session summary |
|------|-----------------|
| 2026-10-02 | Initial repo: docs, README, React JS client skeleton |
| 2026-10-(mid) | Built complete mock-data UI (pages, components). Uncommitted |
| 2026-10-17 | Attempted TS migration + docs/ restructure — **left half-done** (types installed only, sources still JSX, RULES.md missing, MEMORY.md overstated progress) |
| 2026-10-18 | **Completed TS migration**: all 22 client sources → .ts/.tsx w/ strict types, tsconfig + vite/tailwind/postcss configs → .ts, shared types in `src/types/index.ts`, fixed Tailwind v4 `@config` wiring + missing tokens, created RULES.md, corrected this file. Verified: tsc clean, vite build green, oxlint 3 warnings only |

---

*Last updated: 2026-10-18 — TS migration completed & verified; RULES.md added.*

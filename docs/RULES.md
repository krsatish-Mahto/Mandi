# RULES.md — Coding & Collaboration Rules for Mandi

> These rules bind both human contributors and AI coding agents.
> If a rule conflicts with a decision in `docs/MEMORY.md`, MEMORY.md wins — update this file.

---

## 1. Language & Stack (locked)

1. **Everything is TypeScript** — client and (future) server. Never add `.js` / `.jsx` source files.
2. Frontend: React 19 + Vite 8 + react-router-dom v7 + TailwindCSS v4 + axios + socket.io-client.
3. Backend (Module 2+): Node 18+ / Express + TypeScript, Socket.io, JWT, bcrypt, PostgreSQL.
4. **Do not swap libraries or major versions without user approval** (log it in MEMORY.md Decision Log first).

## 2. TypeScript Rules

1. `strict` mode is on — no `any` unless truly unavoidable; prefer `unknown` + narrowing.
2. Shared domain types live in `client/src/types/index.ts`. Add/update types there first, then use them.
3. Every component and handler gets explicit prop/function types. No implicit `any` props.
4. Run `npm run typecheck --workspace=client` before declaring any task done.
5. Env vars are accessed via `import.meta.env.VITE_*` only (typed by `vite/client`).

## 3. Styling Rules (Tailwind v4 specifics)

1. Config is `client/tailwind.config.ts`, loaded via `@config "../tailwind.config.ts"` in `src/index.css`.
   Never remove that `@config` line — custom tokens (primary, dark, xs:, …) silently die without it.
2. Custom tokens are defined by full **replacement**, not extend — when adding a new color shade
   (e.g. `green-300`), add it to the config or the class won't exist.
3. v4 removed `bg-opacity-*`, `ring-opacity-*`, `flex-grow-*` style utilities — use color opacity
   modifiers instead (`bg-primary/90`, `ring-primary/20`).
4. Prefer existing utility classes from `index.css` (`btn-primary`, `input-field`, `card`,
   `container-primary`, `form-label`, …) over re-writing the same styles inline.
5. Keep bilingual copy pattern: English + Hindi in parentheses for user-facing CTAs.

## 4. Mock-Data Rules (until backend exists)

1. The app runs on mock data + localStorage. Storage keys:
   `mandi_mock_listings`, `mandi_mock_comments`, `token`, `user`.
2. All mock access must go through `client/src/data/mockData.ts` functions — never read
   localStorage directly in components.
3. When a real endpoint lands for a module, replace the corresponding mock function's internals
   with an `api.ts` call — keep the function signature so components don't change twice.

## 5. Git & Workflow Rules

1. Branch naming: `features/*`, `fix/*`, `docs/*` off `main`.
2. Commit style: `feat(client): …`, `fix(server): …`, `docs: …` (conventional commits).
3. Never commit secrets, `.env` files, or `node_modules` / `dist`.
4. Update `docs/MEMORY.md` in the same change whenever a decision, milestone, or gotcha changes.
5. `docs/tasks.md` is the single source of module order — don't start a later module early
   without user approval.

## 6. AI-Agent Rules

1. Start every session by reading `docs/MEMORY.md` (and `docs/tasks.md` if doing module work).
2. **Never trust MEMORY.md's "done" claims blindly** — verify with the filesystem/build
   (an earlier session marked the TS migration done when it wasn't).
3. Ask before large scope changes; small fixes inside the current task don't need approval.
4. Finish with: typecheck + lint + build passing, and MEMORY.md updated.

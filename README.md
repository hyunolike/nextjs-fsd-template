# Next.js FSD Template

A Next.js 16 (App Router) template organized with
[Feature-Sliced Design](https://feature-sliced.design), demonstrating a
working auth + CRUD flow end to end: httpOnly-cookie refresh tokens, an
axios client with automatic silent refresh, TanStack Query for server
state, Zustand for the one bit of state that's genuinely global, React Hook
Form + Zod for forms, and a `steiger`-enforced architecture.

It was built by studying
[seungmanchoi/nextjs-fsd-agent-template](https://github.com/seungmanchoi/nextjs-fsd-agent-template)
for the layer layout and tech-stack shape, and
[toss/frontend-fundamentals](https://github.com/toss/frontend-fundamentals)
for the code-quality bar (readability, predictability, cohesion, coupling)
applied inside each slice. See [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)
for the full write-up, including which "recent trend" choices were made
deliberately and why.

## Stack

| Concern              | Choice                                                  |
| -------------------- | ------------------------------------------------------- |
| Framework            | Next.js 16 (App Router, Turbopack, React 19)            |
| Language             | TypeScript 5, strict                                    |
| Styling              | Tailwind CSS 4                                          |
| Server state         | TanStack Query 5                                        |
| Client state         | Zustand 5 (auth status only)                            |
| Forms                | React Hook Form 7 + Zod 4                               |
| HTTP                 | axios, with a refresh-token interceptor                 |
| Env vars             | `@t3-oss/env-nextjs`                                    |
| Architecture lint    | `steiger` (official FSD linter)                         |
| Unit/component tests | Vitest + Testing Library                                |
| E2E tests            | Playwright                                              |
| Formatting           | Prettier + `prettier-plugin-tailwindcss`                |
| Git hooks            | Husky + lint-staged + commitlint (Conventional Commits) |
| Package manager      | pnpm                                                    |

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Sign in at `/login`
with the pre-filled demo credentials (`demo@example.com` /
`password123`) — they're served by mock API routes in `src/app/api/**`
backed by an in-memory store (`src/shared/server`), so the app runs with
zero external services.

## Scripts

| Script                              | What it does                              |
| ----------------------------------- | ----------------------------------------- |
| `pnpm dev`                          | Start the dev server                      |
| `pnpm build` / `pnpm start`         | Production build / serve                  |
| `pnpm typecheck`                    | `tsc --noEmit`                            |
| `pnpm lint`                         | ESLint                                    |
| `pnpm lint:fsd`                     | `steiger` — FSD layer/public-API rules    |
| `pnpm format` / `pnpm format:check` | Prettier                                  |
| `pnpm test` / `pnpm test:watch`     | Vitest                                    |
| `pnpm test:e2e`                     | Playwright (builds + boots the app first) |

## Folder structure

```
src/
├── app/        Next.js routes + API route handlers (thin composition only)
├── core/       Global providers, session bootstrap, global styles
├── widgets/    Composed UI blocks (Header, TodoBoard)
├── features/   One user action per slice (login-form, logout,
│                create/toggle/delete todo)
├── entities/   Domain nouns (user, session, todo)
└── shared/     UI kit, HTTP client, env config, generic utils — zero
                 domain knowledge
```

Full rules (import direction, public-API discipline, why `core/` exists
instead of FSD's usual `app/` layer) are in
[`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md). Contribution workflow and
code-quality expectations are in [`CONTRIBUTING.md`](./CONTRIBUTING.md).

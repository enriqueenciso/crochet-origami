# PRD — Crochet & Origami Content Platform

## Problem Statement

A senior developer proficient in Angular wants to master React by building a real, production-quality application from scratch. Generic tutorials and isolated exercises do not build the muscle memory required to write React code confidently without tooling assistance — which is the exact constraint imposed by technical coding assessments (e.g., CodeSignal). The developer needs a meaningful project that progressively introduces React concepts (component composition, props, state, routing, global state, data fetching, auth, i18n) in a context that mirrors real-world expectations.

At the same time, there is a genuine product need: a community platform for crochet and origami enthusiasts that supports content publishing — with no existing solution tailored to this niche.

## Solution

Build a full-stack content platform for crochet and origami enthusiasts. The platform behaves as a hybrid between Pinterest (visual feed, categorised content) and a blog (articles, rich text). It supports role-based access control and internationalisation from day one.

The project serves a dual purpose:
1. **Learning vehicle** — each feature is developed guided, with the developer hand-crafting the code to build React intuition.
2. **Deployable product** — the end result is a real service that could be hosted and used by the crochet and origami community.

Two content sections exist at launch: **Crochet** and **Origami**. The architecture must support adding more sections in the future without structural changes.

## User Stories

### Guest (unauthenticated)

1. As a guest, I want to browse the public feed, so that I can explore crochet and origami content without creating an account.
2. As a guest, I want to filter the feed by section (Crochet / Origami), so that I can see only content relevant to my interest.
3. As a guest, I want to view a full post, so that I can read tutorials and content in detail.
4. As a guest, I want to register for an account, so that I can interact with the platform.
5. As a guest, I want to log in with my email and password, so that I can access my account.
6. As a guest, I want to see the platform in my preferred language (English or Spanish), so that I can use it comfortably.
7. _(v2)_ As a guest, I want to register or log in using my Google account, so that I can get started without creating a password.
8. _(v2)_ As a guest, I want to register or log in using my GitHub account, so that I have an alternative social login option.

### Regular User

1. As a regular user, I want to view my profile page, so that I can see my account details and activity.
2. As a regular user, I want to update my display name and avatar, so that I can personalise my presence on the platform.
3. As a regular user, I want to save posts to a personal collection, so that I can revisit content I like.
4. As a regular user, I want to change my account language preference, so that the UI updates to my selected locale.
5. As a regular user, I want to log out of my account, so that my session is ended securely.
6. _(v2)_ As a regular user, I want to link a social account (Google or GitHub) to my existing profile, so that I can log in with either method.
7. _(Lower priority)_ As a regular user, I want to comment on a post, so that I can share my thoughts or ask questions.
8. _(v1 stretch goal)_ As a regular user, I want to see new comments appear in real time without refreshing the page, so that conversations feel live.
9. _(v1 stretch goal)_ As a regular user, I want to receive a real-time notification when someone replies to my comment, so that I can follow the conversation.

### Premium User

> Premium is an admin-assigned role in v1. No benefits are defined yet — the role exists to support future feature work (e.g. exclusive content, pattern downloads, priority commissions). No Premium-specific user stories are in scope for v1.

### Seller

1. As a seller, I want to create a new post as a draft, so that I can work on it before making it public.
2. As a seller, I want to assign a post to a section (Crochet or Origami), so that it appears in the correct feed when published.
3. As a seller, I want to publish a draft post, so that it becomes visible in the feed.
4. As a seller, I want to edit an existing post regardless of its state, so that I can correct or update my content.
5. As a seller, I want to revert a published post to draft, so that I can temporarily remove it from the feed without deleting it.
6. As a seller, I want to delete a post permanently, so that I can remove content I no longer want to share.
7. As a seller, I want to upload images and videos to posts via Supabase Storage, so that rich media is embedded in my content.
8. _(Lower priority)_ As a seller, I want to reply to comments on my posts, so that I can engage with my audience.

### System Admin


1. As a system admin, I want to assign or change user roles (Regular, Premium, Seller, Admin), so that I can control access levels.
2. As a system admin, I want to view all posts regardless of publish status, so that I can moderate content.

> _(Deferred to v2)_ View all registered users, deactivate accounts, delete any post, manage sections, platform metrics.

## Implementation Decisions

### Tech Stack

- **Frontend**: React 19 + Vite (TypeScript) — pure SPA, deployed to Vercel as static files
- **Backend**: Express + TypeScript — REST API deployed to Vercel via the `@vercel/node` adapter. The Express app is exported as a single serverless function handler; `vercel.json` routes all `/api/*` requests to it. Express routing and middleware are preserved as-is.
- **Deployment**: single Vercel project for both client and server. `vercel.json` at the repo root configures the build output directory for the frontend and the API entry point for the backend.
- **Monorepo layout**: `/client` (Vite SPA), `/server` (Express API), `/shared` (Zod schemas and inferred TypeScript types used by both). Run together locally via `concurrently`.
- **Routing**: React Router v6 — `BrowserRouter`, nested routes, layout routes, protected routes via wrapper components
- **Global State**: Redux Toolkit — store slices for `auth`, `feed`; async operations via `createAsyncThunk`
- **Feed pagination**: two-phase approach for learning purposes.
  - **Phase 1 (mocked data)**: offset-based pagination — `?page=1&limit=10`, simple `skip` + `take` in Prisma. Used when the Feed is first built against mocked/seeded data. Known limitation: offsets shift when new posts are inserted, producing duplicates or gaps.
  - **Phase 2 (real data)**: cursor-based pagination — feed API accepts an optional `after` cursor (post ID) and returns `{ posts, nextCursor, hasMore }`. Prisma's `cursor` + `take` + `skip: 1` implements this. Introduced as a dedicated refactor once the Feed is working and tested, replacing offset pagination entirely.
- **Validation**: Zod — schemas defined in `/shared`, used on the server for request validation and on the client for form validation; API response types inferred from the same schemas.
- **ORM**: Prisma — declarative schema, type-safe queries, migration system (lives in `/server`)
- **Database (dev)**: SQLite via Prisma for local development speed
- **Database (prod)**: PostgreSQL via Supabase
- **Rich text editor**: Tiptap — ProseMirror-based editor; Post body stored as Tiptap JSON (`Json` type in Prisma). Media is uploaded to Supabase Storage and the URL is embedded as a node in the document.
- **Media Storage**: Supabase Storage — images and videos uploaded directly from the editor; URLs embedded in the Tiptap JSON document
- **Auth**: Supabase Auth — handles all credential management (email/password hashing, session tokens, JWT refresh). The Prisma `User` table stores profile data and role only, linked to Supabase's `auth.users` by UUID. On login, a `/api/me` call fetches the enriched profile (including `role`) and populates the Redux `auth` slice. Supabase owns the session token; Redux owns the enriched profile.
- **Styling**: Tailwind CSS v4 + shadcn/ui (Radix primitives)
- **Translations**: react-i18next — `en` and `es` locales from day one; JSON translation files per locale
- **Testing**: Vitest + React Testing Library
- **Linting/Formatting**: ESLint + Prettier
- **Git hooks**: Husky + lint-staged (lint and format on commit)
- _(v2)_ **OAuth providers**: Google and GitHub via Supabase Auth — plugs into the same auth system with no schema changes
- _(v1 stretch goal)_ **Real-time**: Supabase Realtime — Postgres Changes subscriptions for live comment feeds. Studied last, after all other v1 foundations are solid. WebSockets may appear in CodeSignal assessments and are worth covering, but are not a priority.

### Architecture Decisions

- **Monorepo structure**: three packages at the root — `/client`, `/server`, `/shared`. No workspace tooling in v1; each has its own `package.json` and they are run together locally via `concurrently`.
- **Feature-based folder structure**: both `/client` and `/server` are organised by feature domain (`auth`, `feed`, `admin`), not by file type. On the client, each feature owns its components, hooks, and slice. On the server, each feature owns its routes and service logic.
- **Protected routes**: a `ProtectedRoute` wrapper component reads auth state from Redux and redirects unauthenticated users. Role-based guards are composed on top of this. Admin UI lives at `/admin/*` inside the same React app — no separate admin build.

- **Prisma datasource switching**: a single `schema.prisma` with environment-driven `DATABASE_URL` — SQLite locally, PostgreSQL in production. A seed script (`db:seed`) populates realistic fixture data for development and testing.
- **Supabase client**: a singleton Supabase client is initialised once and shared across the app. Media upload logic lives in a dedicated `lib/supabase.ts` module.
- **i18n initialisation**: i18next is initialised before the React tree mounts. Language preference is persisted to localStorage and synced to user profile on login.
- **Redux store shape**:
  ```
  store
  ├── auth   { id, displayName, avatarUrl, role, locale, status }
  └── feed   { posts, filters, nextCursor, hasMore, status }
  ```
  The `feed` slice is introduced when Redux enters the learning order (after data fetching). The `auth` slice is added at the auth milestone — it cannot be meaningfully populated until Supabase is wired in.

### Role Permissions Matrix

| Action | Guest | Regular | Premium | Seller | Admin |
|---|---|---|---|---|---|
| Browse feed | ✓ | ✓ | ✓ | ✓ | ✓ |
| View post | ✓ | ✓ | ✓ | ✓ | ✓ |
| Save post | — | ✓ | ✓ | ✓ | ✓ |
| Create post | — | — | — | ✓ | ✓ |
| Manage own posts | — | — | — | ✓ | ✓ |
| Manage all content | — | — | — | — | ✓ |
| Manage users | — | — | — | — | ✓ |

### Prisma Schema (key models — no file paths, conceptual only)

- `User` — id (matches Supabase auth.users UUID), email, displayName, avatarUrl, role (enum), locale, createdAt
- `Post` — id, title, body (Json — Tiptap document), section (enum: CROCHET, ORIGAMI), isPublished, publishedAt, authorId (→ User)
- `SavedPost` — userId (→ User), postId (→ Post), savedAt
- _(Lower priority)_ `Comment` — id, body, postId (→ Post), authorId (→ User), createdAt

## Testing Decisions

A good test verifies **external behavior** — what a component renders and how it responds to user interaction — not implementation details like internal state or which hooks are called.

### Modules to test

- **Auth flows**: login form submission, validation errors, redirect on success, role-based route guard behaviour
- **Feed**: renders posts, filters by section, handles empty state, handles loading state
- **Post management**: Seller can create, edit, unpublish, and delete their own posts
- **Protected routes**: unauthenticated users are redirected, role-mismatched users see a forbidden state
- **i18n**: components render translated strings; language toggle switches locale

### Testing approach

- Components are tested by rendering them inside a minimal Redux `Provider` + `MemoryRouter` wrapper — no mocking of internal hooks.
- Async operations (data fetching) are tested by mocking the Prisma client or Supabase client at the boundary, not inside components.
- Forms are tested by firing real user events (`userEvent.type`, `userEvent.click`) and asserting on rendered output, not on state.

## Out of Scope

- **Commission flow and Stripe payments** — full commission request lifecycle, status management, and payment processing deferred to v2
- **Saved post organisation** — named collections (Spotify-style) or hashtag-based grouping deferred to v2; v1 is a single flat saved list per user
- **Merchandise shop / Product listings** — fixed-price item listings and cart flow deferred to v2
- **Seller directory** — no dedicated page for browsing or searching Sellers; deferred to v2 alongside the commission flow
- **Email notifications** — no transactional email in v1
- **Mobile app** — web-only; responsive design is in scope
- **Advanced analytics dashboard** — basic admin metrics only
- **SEO / SSR** — Vite SPA only; no server-side rendering in v1
- **Additional content sections beyond Crochet and Origami** — architecture supports it, but not implemented in v1
- **Subscription billing** — recurring premium subscriptions deferred to v2

## Further Notes

- The project doubles as a **React learning vehicle**. Features are developed in increasing complexity order: routing → local state → data fetching → global state (Redux) → auth → i18n. Testing (Vitest + React Testing Library) is not introduced on the first feature — the routing and layout shell is built without tests. Testing enters on the second feature (Feed with data fetching), where there is something meaningful to test and React fundamentals already feel familiar. Each GitHub issue will be preceded by a component diagram and guided walkthrough before implementation begins (via the `teach-react` skill, to be built).
- **Seed script** is a first-class concern — it should produce a complete, realistic dataset: multiple users per role and posts in both sections (some published, some draft).
- **i18n from day one** — all user-facing strings must go through `t()`. Hard-coded UI strings are treated as a bug.
- The `teach-react` custom skill (to be created via `skill-creator`) will read a GitHub issue, produce a Mermaid component diagram, and outline the work plan before any code is written.

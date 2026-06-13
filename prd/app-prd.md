# PRD — Crochet & Origami Content Platform

## Problem Statement

A senior developer proficient in Angular wants to master React by building a real, production-quality application from scratch. Generic tutorials and isolated exercises do not build the muscle memory required to write React code confidently without tooling assistance — which is the exact constraint imposed by technical coding assessments (e.g., CodeSignal). The developer needs a meaningful project that progressively introduces React concepts (component composition, props, state, routing, global state, data fetching, auth, payments, i18n) in a context that mirrors real-world expectations.

At the same time, there is a genuine product need: a community platform for crochet and origami enthusiasts that supports content publishing, merchandise sales, and commission requests — with no existing solution tailored to this niche.

## Solution

Build a full-stack content management platform for crochet and origami enthusiasts. The platform behaves as a hybrid between Pinterest (visual feed, categorised content) and a blog (articles, rich text). It supports merchandise listings, a commission request flow with payment verification, and role-based access control.

The project serves a dual purpose:
1. **Learning vehicle** — each feature is developed guided, with the developer hand-crafting the code to build React intuition.
2. **Deployable product** — the end result is a real service that could be hosted and used by the crochet and origami community.

Two content sections exist at launch: **Crochet** and **Origami**. The architecture must support adding more sections in the future without structural changes.

## User Stories

### Guest (unauthenticated)

1. As a guest, I want to browse the public feed, so that I can explore crochet and origami content without creating an account.
2. As a guest, I want to filter the feed by section (Crochet / Origami), so that I can see only content relevant to my interest.
3. As a guest, I want to view a full article, so that I can read tutorials and posts in detail.
4. As a guest, I want to browse the shop listings, so that I can discover merchandise available for purchase.
5. As a guest, I want to view a product detail page, so that I can see pricing, images, and description before deciding to buy.
6. As a guest, I want to register for an account, so that I can interact with the platform.
7. As a guest, I want to log in with my email and password, so that I can access my account.
8. As a guest, I want to see the platform in my preferred language (English or Spanish), so that I can use it comfortably.
9. _(Lower priority)_ As a guest, I want to register or log in using my Google account, so that I can get started without creating a password.
10. _(Lower priority)_ As a guest, I want to register or log in using my GitHub account, so that I have an alternative social login option.

### Regular User

9. As a regular user, I want to view my profile page, so that I can see my account details and activity.
10. As a regular user, I want to update my display name and avatar, so that I can personalise my presence on the platform.
11. As a regular user, I want to save posts to a personal collection, so that I can revisit content I like.
12. As a regular user, I want to submit a commission request form, so that I can request a custom crochet or origami piece.
13. As a regular user, I want to complete payment for a commission request via Stripe, so that my request is confirmed.
14. As a regular user, I want to view the status of my commission requests, so that I know where they stand.
15. As a regular user, I want to change my account language preference, so that the UI updates to my selected locale.
16. As a regular user, I want to log out of my account, so that my session is ended securely.
17. _(Lower priority)_ As a regular user, I want to link a social account (Google or GitHub) to my existing profile, so that I can log in with either method.
18. _(Lower priority)_ As a regular user, I want to comment on a post, so that I can share my thoughts or ask questions.
19. _(Lower priority)_ As a regular user, I want to see new comments appear in real time without refreshing the page, so that conversations feel live.
20. _(Lower priority)_ As a regular user, I want to receive a real-time notification when my commission status changes, so that I am immediately aware of updates.
21. _(Lower priority)_ As a regular user, I want to receive a real-time notification when someone replies to my comment, so that I can follow the conversation.

### Premium User

17. As a premium user, I want to access exclusive premium content, so that I get value from my subscription.
18. As a premium user, I want to download pattern files attached to premium posts, so that I can use them offline.
19. As a premium user, I want to see a badge on my profile indicating my premium status, so that the community recognises my membership.
20. As a premium user, I want to submit commission requests with elevated priority, so that my requests are handled faster.

### Seller

21. As a seller, I want to create a new merchandise listing with title, description, price, and images, so that I can sell products on the platform.
22. As a seller, I want to edit an existing listing, so that I can update prices, descriptions, or images.
23. As a seller, I want to unpublish a listing, so that I can temporarily remove it from the shop without deleting it.
24. As a seller, I want to delete a listing permanently, so that I can remove products I no longer offer.
25. As a seller, I want to create a new article post with rich text and media, so that I can share tutorials and inspiration.
26. As a seller, I want to assign a post to a section (Crochet or Origami), so that it appears in the correct feed.
27. As a seller, I want to mark a post as premium, so that only premium users can access the full content.
28. As a seller, I want to upload images and videos to posts via Supabase Storage, so that rich media is embedded in my content.
29. As a seller, I want to review incoming commission requests assigned to me, so that I can accept or decline them.
30. As a seller, I want to update the status of a commission (accepted, in progress, completed), so that the requesting user stays informed.
31. _(Lower priority)_ As a seller, I want to receive a real-time notification when a new commission request comes in, so that I can respond promptly.
32. _(Lower priority)_ As a seller, I want to reply to comments on my posts, so that I can engage with my audience.

### System Admin

31. As a system admin, I want to view a list of all registered users, so that I can manage the user base.
32. As a system admin, I want to assign or change user roles (Regular, Premium, Seller, Admin), so that I can control access levels.
33. As a system admin, I want to deactivate a user account, so that I can remove bad actors without permanently deleting their data.
34. As a system admin, I want to view all posts regardless of publish status, so that I can moderate content.
35. As a system admin, I want to delete any post or listing, so that I can enforce community guidelines.
36. As a system admin, I want to view all commission requests and their statuses, so that I have full operational visibility.
37. As a system admin, I want to manage content sections (view, potentially add new ones), so that the platform can expand in the future.
38. As a system admin, I want to view platform-level metrics (total users, posts, commissions), so that I can monitor platform health.

## Implementation Decisions

### Tech Stack

- **Framework**: React 19 + Vite (TypeScript)
- **Routing**: React Router v6 — `BrowserRouter`, nested routes, layout routes, protected routes via wrapper components
- **Global State**: Redux Toolkit — store slices for `auth`, `feed`, `shop`, `commissions`; async operations via `createAsyncThunk`
- **Validation**: Zod — all form inputs and API response shapes validated at system boundaries
- **ORM**: Prisma — declarative schema, type-safe queries, migration system
- **Database (dev)**: SQLite via Prisma for local development speed
- **Database (prod)**: PostgreSQL via Supabase
- **Media Storage**: Supabase Storage — images and videos stored in buckets; replaces the need for a separate NoSQL database
- **Styling**: Tailwind CSS v4 + shadcn/ui (Radix primitives)
- **Translations**: react-i18next — `en` and `es` locales from day one; JSON translation files per locale
- **Payments**: Stripe — commission request flow triggers a Stripe checkout session
- **Testing**: Vitest + React Testing Library
- **Linting/Formatting**: ESLint + Prettier
- **Git hooks**: Husky + lint-staged (lint and format on commit)
- _(Lower priority)_ **OAuth providers**: Google and GitHub via Supabase Auth OAuth integration — no custom OAuth server needed; Supabase handles the provider flow and maps to the existing `User` model
- _(Lower priority)_ **Real-time**: Supabase Realtime — Postgres Changes subscriptions for live comment feeds and a notification channel for commission status updates

### Architecture Decisions

- **Feature-based folder structure**: code is organised by feature domain (`auth`, `feed`, `shop`, `commissions`, `admin`), not by file type. Each feature owns its components, hooks, and slice.
- **Protected routes**: a `ProtectedRoute` wrapper component reads auth state from Redux and redirects unauthenticated users. Role-based guards are composed on top of this.
- **Prisma datasource switching**: a single `schema.prisma` with environment-driven `DATABASE_URL` — SQLite locally, PostgreSQL in production. A seed script (`db:seed`) populates realistic fixture data for development and testing.
- **Supabase client**: a singleton Supabase client is initialised once and shared across the app. Media upload logic lives in a dedicated `lib/supabase.ts` module.
- **i18n initialisation**: i18next is initialised before the React tree mounts. Language preference is persisted to localStorage and synced to user profile on login.
- **Redux store shape**:
  ```
  store
  ├── auth          { user, role, status }
  ├── feed          { posts, filters, pagination, status }
  ├── shop          { listings, selectedListing, status }
  ├── commissions   { items, status }
  └── notifications { items, unreadCount }   ← lower priority
  ```

### Role Permissions Matrix

| Action | Guest | Regular | Premium | Seller | Admin |
|---|---|---|---|---|---|
| Browse feed | ✓ | ✓ | ✓ | ✓ | ✓ |
| View article | ✓ (public) | ✓ (public) | ✓ (all) | ✓ (all) | ✓ |
| Submit commission | — | ✓ | ✓ (priority) | ✓ | ✓ |
| Create post/listing | — | — | — | ✓ | ✓ |
| Manage own listings | — | — | — | ✓ | ✓ |
| Manage all content | — | — | — | — | ✓ |
| Manage users | — | — | — | — | ✓ |

### Prisma Schema (key models — no file paths, conceptual only)

- `User` — id, email, passwordHash, displayName, avatarUrl, role (enum), locale, oauthProvider, oauthProviderId, createdAt
- `Post` — id, title, body, section (enum: CROCHET, ORIGAMI), isPremium, publishedAt, authorId (→ User)
- `Media` — id, url, type (IMAGE/VIDEO), postId (→ Post), supabasePath
- `Product` — id, title, description, price, isPublished, sellerId (→ User)
- `Commission` — id, requesterId (→ User), sellerId (→ User), description, status (enum), stripeSessionId, createdAt
- _(Lower priority)_ `Comment` — id, body, postId (→ Post), authorId (→ User), createdAt
- _(Lower priority)_ `Notification` — id, userId (→ User), type (enum: COMMISSION_UPDATE, COMMENT_REPLY), referenceId, read, createdAt

## Testing Decisions

A good test verifies **external behavior** — what a component renders and how it responds to user interaction — not implementation details like internal state or which hooks are called.

### Modules to test

- **Auth flows**: login form submission, validation errors, redirect on success, role-based route guard behaviour
- **Feed**: renders posts, filters by section, handles empty state, handles loading state
- **Commission form**: field validation (via Zod), submission triggers correct Redux action, Stripe redirect
- **Protected routes**: unauthenticated users are redirected, role-mismatched users see a forbidden state
- **i18n**: components render translated strings; language toggle switches locale

### Testing approach

- Components are tested by rendering them inside a minimal Redux `Provider` + `MemoryRouter` wrapper — no mocking of internal hooks.
- Async operations (data fetching) are tested by mocking the Prisma client or Supabase client at the boundary, not inside components.
- Forms are tested by firing real user events (`userEvent.type`, `userEvent.click`) and asserting on rendered output, not on state.

## Out of Scope

- **Email notifications** — no transactional email in v1
- **Mobile app** — web-only; responsive design is in scope
- **Advanced analytics dashboard** — basic admin metrics only
- **SEO / SSR** — Vite SPA only; no server-side rendering in v1
- **Additional content sections beyond Crochet and Origami** — architecture supports it, but not implemented in v1
- **Subscription billing** — Stripe one-time payments for commissions only; recurring premium subscriptions are v2

## Further Notes

- The project doubles as a **React learning vehicle**. Features are developed in increasing complexity order: routing → local state → global state (Redux) → data fetching → auth → payments. Each GitHub issue will be preceded by a component diagram and guided walkthrough before implementation begins (via the `teach-react` skill, to be built).
- **Seed script** is a first-class concern — it should produce a complete, realistic dataset: multiple users per role, posts in both sections (some premium), at least one listing per seller, and commission requests in various statuses.
- **i18n from day one** — all user-facing strings must go through `t()`. Hard-coded UI strings are treated as a bug.
- The `teach-react` custom skill (to be created via `skill-creator`) will read a GitHub issue, produce a Mermaid component diagram, and outline the work plan before any code is written.

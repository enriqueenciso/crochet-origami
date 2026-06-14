# Monorepo cross-package resolution via `file:` dependencies, not npm workspaces

The three packages (`client`, `server`, `shared`) are independent — each has its own `package.json`, its own `node_modules`, and is run locally via `concurrently` from the repo root. The `shared` package (Zod schemas and inferred TypeScript types) is referenced by both `client` and `server` using a `"@crochet/shared": "file:../shared"` entry in each consumer's `package.json`.

The alternative — npm workspaces — was set up during initial scaffolding but removed. Workspaces hoist `node_modules` to the repo root, link packages automatically, and let consumers reference workspace packages by name without a `file:` entry. However, they introduce implicit coupling: a single `npm install` at the root installs everything at once, which obscures what each package actually depends on and makes the dependency graph harder to reason about for a developer who is new to the project. The PRD explicitly rules out workspace tooling in v1 for this reason.

The `file:` approach preserves the same ergonomics at import time (`import { ... } from '@crochet/shared'` works in both consumers) while keeping each package's install surface explicit and self-contained. The only operational difference is that each package requires its own `npm install`; the root `dev` script handles running them together via `concurrently`.

One implication: `shared/package.json` points `main` to `./src/index.ts` (TypeScript source). This works for the server because `tsx` resolves and runs TypeScript directly, and for the client because Vite's bundler handles TypeScript imports. It would not work for a plain `node` runtime consuming the compiled output — but that scenario does not arise in this project.

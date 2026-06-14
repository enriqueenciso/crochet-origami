# Client tooling: Tailwind v4 via Vite plugin, shadcn/ui foundation, i18n pre-installed, `@/` path alias

Four client-side tooling decisions were made at scaffold time rather than deferring them to the first feature that needs them.

**Tailwind CSS v4 via `@tailwindcss/vite`**
Tailwind v4 replaces PostCSS-based configuration with a dedicated Vite plugin (`@tailwindcss/vite`). There is no `tailwind.config.js` — design tokens are declared in CSS using `@theme` blocks when needed. `index.css` contains only `@import "tailwindcss"`. The old approach (v3 with a PostCSS config and `@tailwind` directives) was not used because v4 is the current major version and the simpler Vite-native setup removes an entire config file from the project.

**shadcn/ui foundation installed upfront**
The shadcn/ui peer dependencies (`clsx`, `tailwind-merge`, `class-variance-authority`, `lucide-react`) and the `cn` utility (`src/lib/utils.ts`) are present from day one. `components.json` is configured so the shadcn CLI (`npx shadcn add <component>`) knows where to place generated component files. Individual Radix primitives are not pre-installed — they arrive on demand when a component is added. The alternative — installing shadcn only when the first component is needed — would mean the first feature issue also has to carry the setup ceremony, mixing tooling work with React learning work.

**`react-i18next` and `i18next` installed at scaffold time**
The PRD and `CLAUDE.md` both require all user-facing strings to go through `t()` from the very first component. Installing the i18n libraries at scaffold time satisfies that constraint without blocking Issue #1. The initialisation file (`i18n.ts`) and translation JSON files are not created here — they are the developer's first task in the i18n milestone. Only the packages are present.

**`@/` path alias**
Both `vite.config.ts` (runtime resolution via `path.resolve`) and `tsconfig.app.json` (`paths` + `baseUrl`) are configured with `@/ → src/`. This is required for shadcn-generated components, which import utilities as `@/lib/utils`. It also prevents `../../../` chains as the feature folder structure grows. `@types/node` is installed in `devDependencies` so `path.resolve(__dirname, ...)` in `vite.config.ts` type-checks correctly.

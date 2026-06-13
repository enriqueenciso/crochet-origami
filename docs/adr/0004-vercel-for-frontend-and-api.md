# Vercel for both frontend and API deployment

Both the Vite SPA (`/client`) and the Express API (`/server`) deploy to a single Vercel project. The Express app is exported as a handler and wrapped by `@vercel/node`, with `vercel.json` routing all `/api/*` requests to it. This preserves Express routing and middleware unchanged — the deployment target is the only thing that changes.

The alternative was Railway for the Express API (persistent Node.js server) with Vercel for the frontend. That keeps a true long-running server but adds a second platform to manage, separate env var configuration, and CORS setup between two different domains.

## Key differences from a traditional Express server to be aware of

- **Stateless invocations**: each request is handled by a fresh function invocation. In-memory state does not persist between requests. This app has no in-memory state (everything is in the database), so this is a non-issue in practice.
- **Cold starts**: the first request after a period of inactivity incurs a cold start (~200–400ms on Vercel's hobby tier). Acceptable for a side project; not for a latency-sensitive production API.
- **No persistent connections from the server**: the server cannot hold open WebSocket connections. Supabase Realtime is unaffected because it runs client-side, not through the Express server.
- **SQLite cannot be used in production**: Vercel's serverless filesystem is read-only. The dev/prod database split (SQLite locally, PostgreSQL via Supabase in production) is already the plan — this constraint reinforces it.
- **Execution time limit**: Vercel functions time out at 10s (hobby tier). Long-running operations (bulk imports, heavy queries) are not suitable for this deployment target.

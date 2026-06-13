# Supabase Auth handles all authentication

Supabase Auth manages all credential concerns — email/password hashing, session tokens, JWT issuance and refresh, and OAuth provider flows (Google, GitHub). The Prisma `User` table stores only application data (display name, avatar, role, locale) and is linked to Supabase's `auth.users` by the same UUID primary key. There is no `passwordHash` or OAuth provider field in the application schema.

The alternative — DIY auth via Prisma with a `passwordHash` column, bolting Supabase Auth on only for OAuth — would result in two separate identity systems that must be reconciled on every login path and make session management significantly more complex. Since Supabase is already in the stack for the database and storage, delegating auth to it costs nothing and removes an entire security-sensitive surface area from the application code.

# Hybrid auth: Supabase owns the session, Redux owns the enriched profile

Supabase Auth is the source of truth for the session token and credential lifecycle. Redux is the source of truth for the enriched user profile — the fields Supabase doesn't know about: `displayName`, `avatarUrl`, `role`, and `locale`, which live in the Prisma `User` table.

On login (or app load with an existing session), the app calls a `/api/me` endpoint that reads the Supabase JWT, looks up the corresponding Prisma `User` record, and returns the enriched profile. This is dispatched into the Redux `auth` slice. The rest of the app reads role and profile data from Redux, never directly from Supabase.

The alternative — making Supabase the sole source of truth — would require storing `role` and profile fields in Supabase's `user_metadata`, mixing application concerns into the auth provider and making role management dependent on Supabase's API rather than a straightforward Prisma update. The alternative in the other direction — Redux as sole source of truth with no Supabase session — would require reimplementing token refresh and persistence that Supabase already handles correctly.

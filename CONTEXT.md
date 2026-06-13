# Crochet & Origami Content Platform

A community platform for crochet and origami enthusiasts. Users browse and publish content in two sections — Crochet and Origami — with role-based access controlling who can create and manage posts. A commission flow (allowing users to request custom work from Sellers) is planned for v2 and is not implemented in v1.

## Language

### Roles

**Seller**:
A User who has been granted permission to create Posts and receive Commission requests. Any authenticated User can be promoted to Seller by an Admin.
_Avoid_: Creator, artist, vendor

**Regular User**:
An authenticated User with no elevated permissions. Can browse content, save Posts, and submit Commission requests.
_Avoid_: Member, customer, buyer

**Premium User**:
An admin-assigned role reserved for future feature work. Carries no special behaviour in v1.
_Avoid_: Subscriber, paid user

**Guest**:
An unauthenticated visitor. Can browse the feed and read Posts but cannot submit Commission requests.
_Avoid_: Anonymous user, visitor

**Admin**:
The highest-privilege role on the platform. An Admin can view all content regardless of publish state, assign or revoke any role (including Seller and Admin itself), and manage all user accounts. The role hierarchy ends here — no role above Admin exists or should be introduced.
_Avoid_: Superuser, root, owner, superadmin

### Content

**Post**:
A piece of content authored by a Seller — rich text with optional embedded media, assigned to exactly one Section. A Post is either a **draft** (visible only to its author and Admins) or **published** (visible in the Feed to all users). Reverting a published Post returns it to draft; there is no separate "unpublished" state.
_Avoid_: Article, entry, piece

**Section**:
A top-level content category. Two sections exist at launch: Crochet and Origami.
_Avoid_: Category, tag, topic, channel

**Feed**:
The paginated, filterable list of published Posts visible to all users.
_Avoid_: Timeline, stream, home page

### Account

**Profile**:
The authenticated User's view of their own account data — display name, avatar, and locale preference. In v1, Profile is not a separate data concept; it reads directly from the User record. Richer public-facing content (bio, social links, post history) is deferred to v2.
_Avoid_: Account page, settings page, dashboard

### Saved Content

**Saved Post**:
A Post bookmarked by an authenticated User for later reference. Stored as a join between User and Post.
_Avoid_: Bookmark, favourite, like

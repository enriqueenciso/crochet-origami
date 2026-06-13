# Crochet & Origami Content Platform

A community platform for crochet and origami enthusiasts. Users browse and publish content, and authenticated users can request custom work from Sellers via the commission flow.

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

### Saved Content

**Saved Post**:
A Post bookmarked by an authenticated User for later reference. Stored as a join between User and Post.
_Avoid_: Bookmark, favourite, like

# Tiptap JSON for Post body

Post body is stored as a Tiptap/ProseMirror JSON document (`Json` type in Prisma). The Tiptap editor runs on the frontend; the serialised document is sent to the API and stored as-is.

Media (images, videos) is uploaded to Supabase Storage directly from the editor. The resulting URL is embedded as a node in the Tiptap document — no separate `Media` database table is maintained in v1. This keeps the schema simple at the cost of not being able to query or clean up uploaded files independently of their posts.

Markdown was rejected because it has no standard for embedded media nodes and would require a custom extension or a separate upload flow. HTML was rejected because storing raw HTML is a persistent XSS surface and difficult to render safely and consistently. Tiptap JSON is structured, safe to store, and the format the editor produces natively.

## Phased introduction

The Tiptap editor is deferred until after React fundamentals are established. In the first implementation of Post creation, a plain `<textarea>` is used and its value is wrapped in a minimal Tiptap-compatible envelope before being sent to the API:

```json
{ "type": "doc", "content": [{ "type": "paragraph", "text": "..." }] }
```

The Prisma schema does not change when Tiptap is introduced — only the client-side input widget is swapped.

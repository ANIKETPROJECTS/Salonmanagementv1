---
name: Backend PORT fix
description: api-server crashes on startup if PORT env var is missing; defaulted to 8080
---

The rule: `artifacts/api-server/src/index.ts` must not throw when PORT is absent.

**Why:** The Replit workflow runner does not inject PORT automatically. When the "API Server" workflow runs `pnpm run dev` without `PORT=8080` in the environment, the server throws immediately and the workflow fails silently.

**How to apply:** Keep the default in `src/index.ts`: `const rawPort = process.env["PORT"] ?? "8080"` and keep `PORT=8080` in the `dev` script in `package.json`.

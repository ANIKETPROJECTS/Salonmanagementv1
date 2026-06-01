---
name: Artifact workflow conflict
description: Replit-managed artifact workflows cannot be overridden; create separate named workflows instead
---

The rule: never try to `configureWorkflow` over an artifact-managed workflow (name starts with "artifacts/...").

**Why:** Replit locks artifact workflows — `configureWorkflow` returns PROHIBITED_ACTION. The artifact workflow "artifacts/api-server: API Server" also does not pass PORT, so it always crashes. The working solution is a separately created workflow named "API Server" running the same command with PORT baked in.

**How to apply:** If the backend workflow shows "failed" and is named "artifacts/api-server: API Server", ignore it and ensure the "API Server" workflow (non-artifact) is running instead.

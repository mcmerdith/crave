# Crave Public API Surface

Do not use import aliases (e.g. `@/server/api/trpc`) in API files

Doing so will break module resolution when import from `@crave/api`

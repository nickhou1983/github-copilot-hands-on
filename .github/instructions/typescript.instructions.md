---
applyTo: "**/*.ts,**/*.tsx"
description: "Use when writing or reviewing TypeScript code. Covers type safety, naming, module structure, error handling, and async patterns."
---

# TypeScript Coding Standards

## Type Safety

- Enable `strict: true` in tsconfig. Never use `any` — prefer `unknown` with type guards.
- Use explicit return types on exported functions.
- Prefer `interface` for object shapes, `type` for unions/intersections.

```ts
// Good
interface UserProfile {
  id: string;
  name: string;
  email?: string;
}

// Good — union type
type Status = "active" | "inactive" | "pending";
```

## Naming

- **Files**: kebab-case (`user-profile.ts`)
- **Interfaces/Types**: PascalCase, no `I` prefix (`UserProfile`, not `IUserProfile`)
- **Functions/variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE for true constants, camelCase for derived values
- **Enums**: PascalCase members (`enum Direction { Up, Down }`)

## Functions

- Keep functions short (< 30 lines). Extract early if growing.
- Use named parameters via destructured objects when > 2 params.
- Prefer `readonly` arrays and objects where mutation is not needed.

```ts
// Good — named params
function createUser({ name, email, role }: CreateUserOptions): User {
  // ...
}
```

## Error Handling

- Use typed errors or discriminated unions — not string throws.
- Handle errors at system boundaries; let them propagate internally.

```ts
type Result<T> = { ok: true; data: T } | { ok: false; error: string };
```

## Async

- Always use `async/await` over raw Promises.
- Handle concurrent operations with `Promise.all` or `Promise.allSettled`.
- Never fire-and-forget — always await or explicitly handle the promise.

## Imports

- Use named exports; avoid default exports.
- Group imports: node builtins → external packages → internal modules → relative.
- Use path aliases from tsconfig (`@/` prefix) when available.

## Avoid

- `enum` with string values that duplicate the key — use union types instead.
- Nested ternaries — use early returns or `if/else`.
- `as` type assertions — use type guards or narrowing.
- `console.log` in production code — use a structured logger.

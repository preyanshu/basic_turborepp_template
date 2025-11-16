# Multi-Party EdDSA Turbo Repo

A monorepo for Multi-Party EdDSA threshold signature implementation with TypeScript client, Rust core, and Node.js bindings.

## Structure

### Apps

- **`eddsa-core`** - Core Rust implementation of the multi-party EdDSA protocol
- **`eddsa-bindings`** - NAPI bindings exposing Rust functionality to Node.js
- **`eddsa-client`** - TypeScript client library with high-level APIs

### Packages

- `@repo/typescript-config` - Shared TypeScript configurations
- `@repo/eslint-config` - Shared ESLint configurations
- `@repo/ui` - Shared UI components (if needed)

## Getting Started

### Prerequisites

- Node.js >= 18
- Bun >= 1.2.20 (or npm/yarn/pnpm)
- Rust (for building native bindings)

### Installation

```bash
bun install
```

### Build

Build all packages:

```bash
bun run build
```

Build specific package:

```bash
bun run build --filter=eddsa-client
```

### Test

Run all tests:

```bash
bun run test
```

Run tests for specific package:

```bash
bun run test --filter=eddsa-client
```

### Development

Start development mode:

```bash
bun run dev
```

### Clean

Clean all build artifacts:

```bash
bun run clean
```

## Package Details

### eddsa-client

TypeScript client library providing:
- `MPCService` - Service for individual parties
- `CoordinatorService` - Service for coordinating the protocol
- `MPCClient` - Low-level client for threshold signatures

### eddsa-bindings

Node.js native bindings built with NAPI-RS, exposing the Rust core functionality.

### eddsa-core

Rust library implementing the multi-party EdDSA threshold signature protocol.

## Scripts

- `bun run build` - Build all packages
- `bun run test` - Run all tests
- `bun run lint` - Lint all packages
- `bun run format` - Format code with Prettier
- `bun run check-types` - Type check all TypeScript packages
- `bun run clean` - Clean all build artifacts

## Remote Caching

This repo uses Turborepo for build caching. To enable remote caching:

```bash
turbo login
turbo link
```

## License

See individual package licenses.

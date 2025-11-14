# Repository Guidelines

## Project Structure & Module Organization

- Next.js App Router routes live in `src/app`, shared UI in `src/components`, hooks in `src/hooks`, and providers in `src/providers`. The contract explorer sits in `src/debug`.
- Soroban smart contracts live under `contracts/*` with `src/lib.rs` for logic and `src/test.rs` for harness tests; they compile through the workspace `Cargo.toml` into `target/`.
- CLI-generated TypeScript clients appear in `packages/*` and should be treated as read-only artifacts. Static assets live in `public/`, while configuration values come from `.env` plus `environments.toml`.

## Build, Test, and Development Commands

- `npm run dev`: runs `stellar scaffold watch --build-clients` and `next dev` for live contract recompiles and hot reload.
- `npm run build`: regenerates clients, then runs `next build`; required before deploys.
- `npm run start` / `npm run preview`: serve the production bundle locally.
- `npm run lint` / `npm run format`: enforce ESLint 9 and Prettier 3 rules. Husky + lint-staged validate staged files.
- `npm run install:contracts`: reinstall workspace dependencies and regenerate `packages/*` whenever contracts or envs change.
- `cargo test [-p crate]`: run Soroban unit tests for the full workspace or a single contract.

## Coding Style & Naming Conventions

- TypeScript uses functional React components with PascalCase names, hooks prefixed with `use`, and camelCase utilities under `src/util`.
- Follow Prettier defaults (2 spaces, semicolons) and ESLint recommendations; do not override formatting manually.
- Keep CLI-generated code untouched; edits belong in source modules instead.

## Testing Guidelines

- Soroban crates rely on the deterministic `soroban-sdk` harness; cover constructor effects, auth checks, and error paths in `src/test.rs`.
- Run `cargo test -p <crate>` while iterating and `cargo test` before shipping backend changes.
- Frontend validation currently relies on linting plus manual walkthroughs via `npm run dev` and `src/app/debug`. If you add Jest/Playwright, colocate tests with components and surface them through `npm test`.

## Commit & Pull Request Guidelines

- Commit subjects follow short imperative verbs (e.g., `wallet: add balance hook`); keep scope tight with descriptive bodies when needed.
- PRs must summarize changes, note risks, link issues (`Closes #42`), and document contract migrations or env tweaks. Attach screenshots or logs for UI/CLI adjustments and confirm `npm run build`, `npm run lint`, and relevant `cargo test` commands before requesting review.

## Environment & Configuration Tips

- Copy `.env.example` to `.env`, set `STELLAR_SCAFFOLD_ENV`, RPC credentials, and keep secrets out of git.
- Whenever you switch networks or alter contracts, rerun `npm run install:contracts` so `packages/*` matches the compiled WASM in `target/wasm32-unknown-unknown/release`.
- Use `src/util/friendbot.ts` to fund accounts during local development and rely on `stellar scaffold watch --build-clients` to avoid stale bindings.

import js from "@eslint/js";
import globals from "globals";
import reactX from "eslint-plugin-react-x";
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";
import prettier from "eslint-config-prettier";
import { globalIgnores } from "eslint/config";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config(
  // 1. Files to ignore
  globalIgnores([
    "dist",
    "packages",
    "src/contracts/*",
    "!src/contracts/util.ts",
    ".next",
    "next-env.d.ts",
    "target",
    "supabase/**/*",
  ]),

  // 2. Base JS rules for all files
  js.configs.recommended,

  // 3. Config for TS/TSX files (with typed linting)
  {
    files: ["**/*.{ts,tsx}"],
    // Apply TS-aware and React/Next rules
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      reactX.configs["recommended-typescript"],
    ],
    plugins: {
      "@next/next": nextPlugin,
      "react-dom": reactDom,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      ...reactDom.configs.recommended.rules,
    },
    languageOptions: {
      globals: { ...globals.browser },
      // Point to your tsconfig for typed rules
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRoot: import.meta.dirname,
      },
    },
  },

  // 4. Config for JS/MJS config files (NO typed linting)
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: { ...globals.node },
    },
  },

  // 5. Prettier (must be last)
  prettier,
);

// @ts-check
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

import pluginAstro from "eslint-plugin-astro";
import pluginSvelte from "eslint-plugin-svelte";
import svelteParser from "svelte-eslint-parser";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  globalIgnores([
    ".wrangler/**/*",
    "worker-configuration.d.ts",
    ".astro/**/*",
    "dist/**/*",
  ]),

  tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },

  pluginAstro.configs["flat/jsx-a11y-recommended"],

  pluginSvelte.configs["flat/recommended"],
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tseslint.parser,
        projectService: true,
        extraFileExtensions: [".svelte"],
      },
    },
  },
]);

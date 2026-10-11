// @ts-check

/** @type {import("prettier").Config} */
export default {
  plugins: [
    "prettier-plugin-astro",
    "prettier-plugin-svelte",
    "prettier-plugin-tailwindcss",
  ],
  tailwindStylesheet: "src/styles/global.css",
  tailwindFunctions: ["cn", "cva", "clsx", "twMerge"],

  overrides: [
    { files: "**/*.astro", options: { parser: "astro" } },
    { files: "**/*.svelte", options: { parser: "svelte" } },
  ],
};

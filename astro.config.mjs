// @ts-check
import { defineConfig } from "astro/config";

import { satteri } from "@astrojs/markdown-satteri";
import externalLinks from "./src/plugins/external-links";

import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://expenstack.sprucepad.net/",
  i18n: {
    defaultLocale: "en",
    locales: ["pt", "en"],
    routing: {
      redirectToDefaultLocale: true,
      prefixDefaultLocale: true,
    },
  },

  integrations: [sitemap(), mdx(), svelte()],
  vite: { plugins: [tailwindcss()] },

  markdown: {
    shikiConfig: {
      themes: {
        dark: "horizon",
        light: "horizon-bright",
      },
    },
    processor: satteri({
      hastPlugins: [externalLinks],
    }),
  },
});

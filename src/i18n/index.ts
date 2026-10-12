import type { GetStaticPathsOptions } from "astro";
import i18next, { type TFunction } from "i18next";

const resources = {
  en: {
    translation: await import("./en/translation.json"),
    home: await import("./en/home.json"),
  },
  pt: {
    translation: await import("./pt/translation.json"),
    home: await import("./pt/home.json"),
  },
} as const;

type Resource = typeof resources.en;
export type Namespace = keyof Resource;

declare module "i18next" {
  interface CustomTypeOptions {
    resources: typeof resources.en;
  }
}

await i18next.init({
  resources,
  fallbackLng: "en",
  supportedLngs: ["en", "pt"],
  interpolation: {
    escapeValue: false,
  },
});

export function createTranslate<
  T extends Namespace | Namespace[] = "translation",
>(locale?: string, ns?: T): TFunction<T> {
  return i18next.getFixedT(locale ?? "en", ns);
}

export function localizeGSP(): (opts: GetStaticPathsOptions) => {
  params: { locale: string };
}[] {
  return () =>
    Object.keys(resources).map((locale) => ({
      params: { locale },
    }));
}

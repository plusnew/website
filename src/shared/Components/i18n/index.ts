import factory from "@plusnew/i18n";
import type base from "./locales/base/en";
import type documentation from "./locales/documentation/en";
import type guides from "./locales/guides/en";
import type about from "./locales/about/en";

export default factory({
  fallbackLanguage: "en",
  translations: {
    base: async (language: string): Promise<typeof base> =>
      (await import(`./locales/base/${language}`)).default,
    guides: async (language: string): Promise<typeof guides> =>
      (await import(`./locales/guides/${language}`)).default,
    documentation: async (language: string): Promise<typeof documentation> =>
      import(`./locales/documentation/${language}`).then(
        (module) => module.default
      ),
    about: async (language: string): Promise<typeof about> =>
      (await import(`./locales/about/${language}`)).default,
  },
});

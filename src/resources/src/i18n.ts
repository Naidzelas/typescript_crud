import { createI18n } from "vue-i18n";
import en from "../lang/en.json";
import lt from "../lang/lt.json";

const messages = {
  en: { ...en },
  lt: { ...lt },
};

export const i18n = createI18n({
  legacy: false,
  locale: "lt",
  fallbackLocale: "en",
  messages,
  globalInjection: true,
});
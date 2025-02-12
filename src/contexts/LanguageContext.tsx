"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { sr } from "@/data/lang/sr";
import { sr_Latn } from "@/data/lang/sr-Latn";
import { ro } from "@/data/lang/ro";
import { sk } from "@/data/lang/sk";
import { gr } from "@/data/lang/gr";
import { be } from "@/data/lang/be";
import { ru } from "@/data/lang/ru";
import { es } from "@/data/lang/es";
import { kr } from "@/data/lang/kr";
import { jp } from "@/data/lang/jp";
import { jp_roman } from "@/data/lang/jp-roman";
import { zh_CN } from "@/data/lang/zh-CN";
import { zh_TW } from "@/data/lang/zh-TW";
import { it } from "@/data/lang/it";
import { fr } from "@/data/lang/fr";
import { de } from "@/data/lang/de";
import { en } from "@/data/lang/en";

export type Language =
  | "sr"
  | "sr_Latn"
  | "ro"
  | "gr"
  | "sk"
  | "be"
  | "ru"
  | "es"
  | "kr"
  | "jp"
  | "jp_roman"
  | "zh_CN"
  | "zh_TW"
  | "it"
  | "fr"
  | "de"
  | "en";
type Translations = typeof sr;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const translations = {
  sr,
  sr_Latn,
  ro,
  gr,
  sk,
  be,
  ru,
  es,
  kr,
  jp,
  jp_roman,
  zh_CN,
  zh_TW,
  it,
  fr,
  de,
  en,
};

export const languageNames = {
  sr: "Српски",
  sr_Latn: "Srpski",
  ro: "Română",
  gr: "Ελληνικά",
  sk: "Slovenčina",
  be: "Беларуская",
  ru: "Русский",
  es: "Español",
  kr: "한국어",
  jp: "日本語",
  jp_roman: "Nihongo",
  zh_CN: "简体中文",
  zh_TW: "繁體中文",
  it: "Italiano",
  fr: "Français",
  de: "Deutsch",
  en: "English",
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("sr");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang && Object.keys(translations).includes(savedLang)) {
      setLanguage(savedLang);
    }
    setMounted(true);
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    document.documentElement.setAttribute("data-language", lang);
  };

  const value = {
    language,
    setLanguage: handleSetLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {mounted ? (
        children
      ) : (
        <div style={{ visibility: "hidden" }}>{children}</div>
      )}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';

import en from '@/locales/en.json';
import hi from '@/locales/hi.json';
import kn from '@/locales/kn.json';

const translations = { en, hi, kn };

type Locale = keyof typeof translations;

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    const storedLocale = localStorage.getItem('locale') as Locale | null;
    if (storedLocale && translations[storedLocale]) {
      setLocale(storedLocale);
    }
  }, []);

  const setLocaleAndStore = useCallback((newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
  }, []);

  const t = useCallback((key: string) => {
    const keys = key.split('.');
    let current = translations[locale] as any;
    for (const k of keys) {
      current = current?.[k];
    }
    return current || key;
  }, [locale]);
  
  const value = useMemo(() => ({
    locale,
    setLocale: setLocaleAndStore,
    t,
  }), [locale, setLocaleAndStore, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Currency = 'USD' | 'EUR' | 'GBP' | 'AUD';
export type Language = 'EN' | 'DE' | 'FR';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  rate: number;
  label: string;
  name: string;
}

export interface LanguageConfig {
  code: Language;
  label: string;
  name: string;
}

export const CURRENCIES: Record<Currency, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', rate: 1.0, label: 'USD ($)', name: 'US Dollar' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92, label: 'EUR (€)', name: 'Euro' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79, label: 'GBP (£)', name: 'British Pound' },
  AUD: { code: 'AUD', symbol: 'A$', rate: 1.53, label: 'AUD (A$)', name: 'Australian Dollar' },
};

export const LANGUAGES: Record<Language, LanguageConfig> = {
  EN: { code: 'EN', label: 'EN', name: 'English' },
  DE: { code: 'DE', label: 'DE', name: 'Deutsch' },
  FR: { code: 'FR', label: 'FR', name: 'Français' },
};

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  language: Language;
  setLanguage: (l: Language) => void;
  formatPrice: (usdAmount: number) => string;
  currencyConfig: CurrencyConfig;
  languageConfig: LanguageConfig;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('USD');
  const [language, setLanguageState] = useState<Language>('EN');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const savedCurrency = localStorage.getItem('lanka_memo_currency') as Currency;
      if (savedCurrency && CURRENCIES[savedCurrency]) {
        setCurrencyState(savedCurrency);
      }
      const savedLang = localStorage.getItem('lanka_memo_lang') as Language;
      if (savedLang && LANGUAGES[savedLang]) {
        setLanguageState(savedLang);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem('lanka_memo_currency', c);
    } catch {
      // Ignore storage errors
    }
  };

  const setLanguage = (l: Language) => {
    setLanguageState(l);
    try {
      localStorage.setItem('lanka_memo_lang', l);
    } catch {
      // Ignore storage errors
    }
  };

  const currencyConfig = CURRENCIES[currency] || CURRENCIES.USD;
  const languageConfig = LANGUAGES[language] || LANGUAGES.EN;

  const formatPrice = (usdAmount: number): string => {
    if (!usdAmount || isNaN(usdAmount)) return `${currencyConfig.symbol}0`;
    const converted = Math.round(usdAmount * currencyConfig.rate);
    return `${currencyConfig.symbol}${converted.toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        language,
        setLanguage,
        formatPrice,
        currencyConfig,
        languageConfig,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    // Graceful fallback for non-provider usage
    return {
      currency: 'USD' as Currency,
      setCurrency: () => {},
      language: 'EN' as Language,
      setLanguage: () => {},
      formatPrice: (usdAmount: number) => `$${Math.round(usdAmount || 0).toLocaleString()}`,
      currencyConfig: CURRENCIES.USD,
      languageConfig: LANGUAGES.EN,
    };
  }
  return context;
}

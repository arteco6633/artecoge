import React, { createContext, useContext, useState, useEffect } from 'react';
import ru from './ru';
import en from './en';
import ka from './ka';

const translations = { ru, en, ka };

const LangContext = createContext();

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('arteco_lang') || 'ru';
  });

  const t = translations[lang] || translations.ru;

  const changeLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem('arteco_lang', newLang);
  };

  return (
    <LangContext.Provider value={{ lang, t, changeLang }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);

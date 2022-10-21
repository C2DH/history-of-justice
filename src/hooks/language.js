import React, { useState, useContext, useEffect } from 'react';
import i18n from 'i18next'
import moment from 'moment'
import intersection from 'lodash/intersection';
import { Helmet } from 'react-helmet-async';
import { initReactI18next, useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import translations from '../translations'
import {
  Languages,
  LanguageCodes,
  DefaultLanguage,
  DefaultLanguageCode
} from '../constants'


const getStartLanguage = pathname => {

  let startLangShort = pathname.split('/')[1];

  if (!startLangShort || !LanguageCodes.includes(startLangShort)) {

    // get default short language from browser
    const browserLangsShort     = window.navigator?.languages ?? [];
    const availablesLangsShort  = intersection(browserLangsShort, LanguageCodes);

    console.info('browser languages detected:', browserLangsShort);

    startLangShort = availablesLangsShort.length > 0
      ? availablesLangsShort[0]
      : DefaultLanguageCode
  }

  return {
    languageCode: startLangShort,
    language: Languages.find(l => l.indexOf(startLangShort) === 0)
  }
}


const initializeI18next = pathname => {

  const { languageCode, language } = getStartLanguage(pathname)

  console.info('start language:', languageCode, language)

  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources: translations,
      lng: language,
      defaultLanguage: DefaultLanguage,
      interpolation: {
        escapeValue: false, // react already safes from xss
        format: function(value, format, lng) {
            if(value instanceof Date) {
              if (format === 'fromNow') {
                return moment(value).fromNow()
              }
              return moment(value).format(format)
            } else if (typeof value === 'number') {
              // adapt number
              return new Intl.NumberFormat(lng, { maximumFractionDigits: format }).format(value)
            }
            return value;
        }
      }
    });

  return { languageCode, language };
}


const LanguageContext = React.createContext();

const WithLanguage = ({ children }) => {

  const { pathname }          = useLocation();
  const [lang, setLanguage]   = useState(_ => initializeI18next(pathname).languageCode);
  const [mlPaths, setMLPaths] = useState();
  const { i18n }              = useTranslation();

  useEffect(_ => {
    const lang = pathname.split('/')[1];

    if(lang && LanguageCodes.includes(lang)) {

      //  Build paths for each languages
      const path = pathname.slice(3);
      setMLPaths(LanguageCodes.map(l => ({
        lang:   l,
        path:   `/${l}${path}`,
        active: l === lang
      })));

      setLanguage(lang);
    }
  }, [pathname]);

  useEffect(_ => {
    const language = Languages.find(l => l.indexOf(lang) === 0);
    if(language) {
      console.log('setLanguage :' + language);
      i18n.changeLanguage(language);
    }
  }, [lang, i18n]);

  return (
    <LanguageContext.Provider value={{ lang, mlPaths }}>
      <Helmet>
        <html lang={lang} />
      </Helmet>

      {children}
    </LanguageContext.Provider>
  );
}

const useLanguage = _ => {

  const context = useContext(LanguageContext);

  if (context === undefined) {
    throw new Error('useLanguage must be used within a WithLanguage component');
  }

  return context;
}

export {
  WithLanguage,
  useLanguage
}

import i18n from 'i18next'
import moment from 'moment'
import intersection from 'lodash/intersection'
import { initReactI18next, useTranslation } from 'react-i18next'
import { matchPath } from 'react-router'
import { useParams } from 'react-router-dom'
import translations from '../translations'
import {
  Languages, LanguageCodes, LanguageRoutePattern,
  DefaultLanguageCode
} from '../constants'


const getLanguage = () => {
  const langMatch = matchPath(window.location.pathname, {
    path: LanguageRoutePattern,
    exact: false,
    strict: false,
  })
  let startLangShort = langMatch?.params?.lang
  if (!startLangShort || !LanguageCodes.includes(startLangShort)) {
    // get default short language from browser
    const browserLangsShort = window.navigator?.languages ?? []
    console.info('browser languages detected:', browserLangsShort)
    const availablesLangsShort = intersection(browserLangsShort, LanguageCodes)
    startLangShort = availablesLangsShort.length > 0
      ? availablesLangsShort[0]
      : DefaultLanguageCode
  }
  return {
    languageCode: startLangShort,
    language: Languages.find(l => l.indexOf(startLangShort) === 0)
  }
}


const initializeI18next = () => {
  const { languageCode, language } = getLanguage()
  console.info('start language:', languageCode, language)
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources: translations,
      lng: language,
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
    })
  return { languageCode, language }
}


function namespacePath(path, lang) {
  let pathWithLang = `/${lang}`
  if (path[0] === '/') {
    pathWithLang += path
  } else {
    pathWithLang += `/${path}`
  }
  return pathWithLang
}

const useToWithLang = (to) => {
  const { i18n } = useTranslation()
  let { lang } = useParams()
  if (!lang) {
    // NOTE: Workaround when no lang in current path
    // fallback to current i81n language ...
    lang = i18n.language.split('-')[0]
  }

  if (typeof to === 'string') {
    return namespacePath(to, lang)
  } else {
    return {
      ...to,
      pathname: namespacePath(to.pathname, lang),
    }
  }
}

export {
  initializeI18next,
  useToWithLang
}

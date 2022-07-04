import { useLanguage } from '../hooks/language';


export const useDate = () => {

  const { lang } = useLanguage();

  return {
    parseDate: (dateStr, long = false) => {

      if(!dateStr) return null;

      const date      = new Date(dateStr);
      const dateItems = dateStr.split('-');

      return date.toLocaleString(lang, {
        day: dateItems.length > 1 ? "numeric" : undefined,
        month: dateItems.length > 0 ? (long ? "long" : "short") : undefined,
        year: "numeric"
      });
    }
  }
};

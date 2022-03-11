import { useLocation } from 'react-router-dom';
import _ from 'lodash';

import { AllRoutes } from './constants';
import { useLanguage } from './logic/language';


export const useActiveRoute = () => {
    const { pathname } = useLocation();
    return _.find(AllRoutes, route => pathname.includes(route.to));
}

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

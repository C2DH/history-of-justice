import { useTranslation } from 'react-i18next';
import {
  Miller,
  useStories,
  useInfiniteDocuments,
  useDocumentsFacets
} from '@c2dh/react-miller';
import { QueryClient } from 'react-query'
import { find, pull, orderBy } from 'lodash';

import { lang2Field } from '../utils';
import { Languages, MillerAPI } from '../constants';


const CLIENT = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnMount: false,
      staleTime: Infinity,
      retry: false,
      suspense: false,
      keepPreviousData: true
    }
  }
});

const FIELD_PREFIX        = 'data__';
const TITLE_FIELD         = 'title';


/**
 * Hook to get stories
 */
const THEMES_PARAMS = {
  filters: {
    tags: 1
  }
};
export const useThemes = () => {
  const [data, meta] = useStories({ params: THEMES_PARAMS, suspense: false });
  return [data?.results, meta];
}


/**
 * Hook to get paginated list of medias
 * @param   type    type of the media to get
 * @param   orderBy name of the field used to sort documents
 */
export const useMedias = (type, orderBy) => {

  const { i18n } = useTranslation();

  orderBy = orderBy || `${TITLE_FIELD}__${lang2Field(i18n.language)}`;

  const params = {
    filters: {
      type__in: ['image', 'pdf'],
      data__type: type
    },
    limit: 50,
    orderby: FIELD_PREFIX + orderBy
  };

  const [data, meta] = useInfiniteDocuments({ params });

  return [
    data?.pages.reduce((results, page) => results.concat(page.results), []),
    meta
  ];
}


/**
 * Hook to get type facets of medias
 */
const MEDIA_FACETS_PARAMS = { facets: 'data__type' };
export const useMediaFacets = () => {

  const [data = {}]         = useDocumentsFacets({ params: MEDIA_FACETS_PARAMS });
  const { facets, count }   = data;
  let mediaTypeFacets       = facets?.data__type || [];

  mediaTypeFacets = orderBy(mediaTypeFacets, 'count', 'desc');

  //  Move other to the end
  const otherType = find(mediaTypeFacets, { data__type: 'other' });
  if (otherType)
    pull(mediaTypeFacets, otherType).push(otherType);

  return { mediaTypeFacets, count };
}


export const WithMiller = ({ children }) => {

  const { i18n } = useTranslation();

  return (
    <Miller
      client={CLIENT}
      apiUrl={MillerAPI}
      langs={Languages.map(lang2Field)}
      lang={lang2Field(i18n.language)}
    >
      {children}
    </Miller>
  );
}

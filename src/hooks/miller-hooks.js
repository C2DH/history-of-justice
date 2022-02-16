import { useTranslation } from 'react-i18next';
import { useDocuments } from '@c2dh/react-miller';
import { find, pull, orderBy } from 'lodash';

import { lang2Field } from '../utils';


/**
 * Hook to get paginated list of medias
 * @param   offset  offset of the current page to load
 * @param   type    type of the media to get
 */
export function useMedias(offset = 0, type, orderBy) {

  const { i18n } = useTranslation();

  const params = {
    filters: {
      type__in: ['image', 'pdf'],
      data__type: type
    },
    limit: 50,
    offset: offset,
    orderby: orderBy,
    facets: 'type'
  };

  const config = {
    language: lang2Field(i18n.language),
    defaultLanguage: lang2Field(i18n.options.defaultLanguage),
    paginated: true,
    translated:  true,
    cached: true
  };

  console.log(config);

  return useDocuments(params, config, false);

}

/**
 * Hook to get type facets of medias
 */
const mediaFacetsParams =
  {
    limit: 1,
    facets: 'data__type'
  };
export function useMediaFacets() {

  const [,, { facets, count }]  = useDocuments(mediaFacetsParams, { cached: true });
  let mediaTypeFacets         = facets?.data__type || [];

  mediaTypeFacets = orderBy(mediaTypeFacets, 'count', 'desc');

  //  Move other to the end
  const otherType = find(mediaTypeFacets, { data__type: 'other' });
  if (otherType)
    pull(mediaTypeFacets, otherType).push(otherType);

  return { mediaTypeFacets, count };
}

import { useTranslation } from 'react-i18next';
import { useStories, useDocument, useDocuments } from '@c2dh/react-miller';
import { find, pull, orderBy } from 'lodash';

import { lang2Field } from '../utils';


const FIELD_PREFIX    = 'data__';
const TITLE_FIELD     = 'title';

/**
 * Hook to get stories
 */
const themesParams = {
  filters: {
    tags: 1
  }
};
export function useThemes() {

  const { i18n } = useTranslation();

  const config = {
    language: lang2Field(i18n.language),
    defaultLanguage: lang2Field(i18n.options.defaultLanguage),
    cached: false
  };

  return useStories(themesParams, config);
}

/**
 * Hook to get a media identified by its id from the backend
 * @param   id  id or slug of the media to get
 */
export function useMedia(id) {

  const { i18n } = useTranslation();

  const config = {
    language: lang2Field(i18n.language),
    defaultLanguage: lang2Field(i18n.options.defaultLanguage),
    cached: true
  };

  return useDocument(id, config);

}

/**
 * Hook to get paginated list of medias
 * @param   offset  offset of the current page to load
 * @param   type    type of the media to get
 * @param   orderBy name of the field used to sort documents
 */
export function useMedias(offset = 0, type, orderBy) {

  const { i18n } = useTranslation();

  orderBy = orderBy || `${TITLE_FIELD}__${lang2Field(i18n.language)}`;

  const params = {
    filters: {
      type__in: ['image', 'pdf'],
      data__type: type
    },
    limit: 50,
    offset: offset,
    orderby: FIELD_PREFIX + orderBy,
    facets: 'type'
  };

  const config = {
    language: lang2Field(i18n.language),
    defaultLanguage: lang2Field(i18n.options.defaultLanguage),
    paginated: true,
    translated:  true,
    cached: true
  };

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

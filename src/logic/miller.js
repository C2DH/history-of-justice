import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Miller,
  useStory,
  useStories,
  useDocument,
  useDocuments,
  useInfiniteDocuments,
  useDocumentsFacets
} from '@c2dh/react-miller';
import { QueryClient } from 'react-query'
import { find, findIndex, pull, orderBy, sortBy } from 'lodash';

import { lang2Field } from '../utils';
import {
  Languages,
  MillerAPI,
  CrimesThemeId
} from '../constants';


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

const ASCENDING_ORDER     = 'asc';
const SPEAKER_GROUP       = 'speaker';
const TOPIC_GROUP         = 'topic';

const ALL_RECORDS         = 10000;


/**
 * Hook to get stories
 */
const THEMES_PARAMS = {
  filters: {
    tags: 1
  },
  exclude: {
    slug: CrimesThemeId
  }
};
export const useThemes = () => {
  const [data, meta] = useStories({ params: THEMES_PARAMS, suspense: false });
  return [data?.results, meta];
}


/**
 * Hook to get crimes
 * @param   order   order to sort crimes
 */
export const useCrimes = (order = ASCENDING_ORDER) => {

  const [data, meta] = useStory(CrimesThemeId);

  let crimes = data?.data.chapters.map(id => find(data.stories, ['id', id]));
  crimes = orderBy(crimes, 'data.abstract', order);

  return [crimes, meta];
}


/**
 * Hook to get interviews taxonomy terms
 * @param   vocabulary   Vocabulary of the terms to get (speaker or topic)
 */
const useInterviewsTaxonomy = (vocabulary) => {

  const params = {
    filters: {
      data__type: vocabulary
    },
    orderby: 'data__num_position',
    limit: ALL_RECORDS
  }

  const [ data, meta ]  = useDocuments({ params });
  return [data?.results || [], meta];
}


/**
 * Hook to get topics
 * The list is filtered to keep only topics with an available interview for the specified speaker
 * @param   speakerId   Id of the speaker used to filter the topic list
 */
export const useTopics = speakerId => {

  const [ interviews ]     = useInterviews();
  const [ topics, meta ]   = useInterviewsTaxonomy(TOPIC_GROUP);

  // Keep only topics with an available interview for the speaker
  const filteredTopics = useMemo(() => topics.filter(
    topic => findIndex(interviews,
      item => item.speaker.slug === speakerId && item.topic.slug === topic.slug
    ) !== -1
  ), [interviews, topics, speakerId]);

  return [filteredTopics, meta];
}


/**
 * Hook to get speakers
 * The list is filtered to keep only speakers with an available interview for the specified topic
 * @param   topicId   Id of the topic used to filter the speaker list
 */
export const useSpeakers = topicId => {

  const [ interviews ]      = useInterviews();
  const [ speakers, meta ]  = useInterviewsTaxonomy(SPEAKER_GROUP);

  // Keep only speakers with an available interview for the topic
  const filteredSpeakers = useMemo(() => speakers.filter(
    speaker => findIndex(interviews,
      item => item.topic.slug === topicId && item.speaker.slug === speaker.slug
    ) !== -1
  ), [interviews, speakers, topicId]);

  return [filteredSpeakers, meta];
}


/**
 * Hook to get an interview by its id
 * @param   id    id or slug of the interview to get
 */
export const useInterview = id => {
  const [ interview, meta ] = useDocument(id);

  if(interview) {
    for(const related of interview?.documents) {
      interview[related.data.type] = related;
    }
  }

  return [interview, meta];
}


/**
 * Hook to get the list of interviews with speaker and topic data
 */
const INTERVIEWS_PARAMS = {
  filters: {
    data__type: 'interview'
  },
  limit: ALL_RECORDS,
  detailed: true
}
export const useInterviews = () => {

  const [ data, meta ]    = useDocuments({ params: INTERVIEWS_PARAMS });

  //  Sort grouped interviews
  const interviews = useMemo(() => data?.results.map(interview => {
    for(const related of interview.documents) {
      interview[related.data.type] = related;
    }

    return interview;
  }), [data]);

  return [ interviews || [], meta ];
}


/**
 * Hook to get interviews sorted and grouped by speaker or topic
 * @param   groupBy   Vocabulary used to group interviews (speaker or topic)
 */
export const useGroupedInterviews = (groupBy = SPEAKER_GROUP) => {

  const [ interviews, meta ]  = useInterviews();
  let [ groups ]              = useInterviewsTaxonomy(groupBy);

  groups = useMemo(() => {

    // Sort interviews by topic or speaker position
    const sortedInterviews = sortBy(interviews, groupBy === SPEAKER_GROUP ? 'data.topic_position' : 'data.speaker_position');
    const groupedInterviews = {};

    // Group interviews
    for(const interview of sortedInterviews) {
      const slug = groupBy === SPEAKER_GROUP ? interview.speaker.slug : interview.topic.slug;
      groupedInterviews[slug] = groupedInterviews[slug] ?? [];
      groupedInterviews[slug].push(interview);
    }

    for(const group of groups) {
      group.interviews = groupedInterviews[group.slug];
    }

    return groups;
  }, [groups, interviews, groupBy]);

  return [ groups, meta ];
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
const MEDIA_FACETS_PARAMS = {
  facets: 'data__type',
  exclude: {
   type: 'entity'
  }
};
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
      client  = {CLIENT}
      apiUrl  = {MillerAPI}
      langs   = {Languages.map(lang2Field)}
      lang    = {lang2Field(i18n.language)}
    >
      {children}
    </Miller>
  );
}

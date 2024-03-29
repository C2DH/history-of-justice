export const HomeRoute = { to:'./', label: 'navigation.home'}
export const HistoryOfJusticeSystemRoute = {
  to:     'histoire-organisation-judiciaire',
  label:  'navigation.history-of-justice-system',
  type:   'text'
}
export const MagistrateJobRoute = {
  to:     'magistrate-job',
  label:  'navigation.magistrate-job',
  type:   'interview'
}
export const CrimesAndTrialsRoute = {
  to:     'crimes-and-trials',
  label:  'navigation.crimes-and-trials',
  type:   'text'
}
export const CollectionRoute = {
  to:     'collection',
  label:  'navigation.collection',
  type:   'search'
}
export const MediaRoute = { to: 'collection/media', label: 'navigation.media' }
export const AboutRoute = { 
  to:     'about', 
  label:  'navigation.about',
  id:     'about' 
}
export const TermsOfUseRoute = { 
  to:     'terms-of-use', 
  label:  'navigation.terms-of-use',
  id:     'terms-of-use'
}

export const PrimaryRoutes = [
  HistoryOfJusticeSystemRoute,
  MagistrateJobRoute,
  CrimesAndTrialsRoute,
  CollectionRoute,
  AboutRoute
];

export const HomeRoutes = [
  HistoryOfJusticeSystemRoute,
  MagistrateJobRoute,
  CrimesAndTrialsRoute,
  CollectionRoute
];

export const FooterRoutes = [
  TermsOfUseRoute,
  AboutRoute,
  HomeRoute
];

//  Use to get the active route. HomeRoute must be the last item
export const AllRoutes = [
  MediaRoute,
  HistoryOfJusticeSystemRoute,
  MagistrateJobRoute,
  CrimesAndTrialsRoute,
  CollectionRoute,
  AboutRoute,
  TermsOfUseRoute,
  HomeRoute
];

export const Languages = (process.env.REACT_APP_LANGUAGES ?? 'en-GB,fr-FR,de-DE').split(',');
export const LanguageCodes = Languages.map((l) => l.split('-')[0]);
export const LanguageRoutePattern = `/:lang(${LanguageCodes.join('|')})`;
export const DefaultLanguage = process.env.REACT_APP_DEFAULT_LANGUAGE ?? 'en-GB';
export const DefaultLanguageCode = DefaultLanguage.split('-')[0];
export const MillerAPI = process.env.REACT_APP_MILLER_API ?? '/api';

export const CrimesThemeId = process.env.REACT_APP_CRIMES_THEME_ID ?? 'crimes';

export const TRUNCATE_DESCRIPTION_OPTIONS = {
  length: 200,
  omission: '.',
  separator: '.'
}
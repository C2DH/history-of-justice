export const HomeRoute = { to:'/', label: 'navigation.home'}
export const HistoryOfJusticeSystemRoute = { to:'history-of-justice-system', label: 'navigation.history-of-justice-system'}
export const MagistrateJobRoute = { to:'magistrate-job', label: 'navigation.magistrate-job'}
export const CrimesAndTrialsRoute = { to:'crimes-and-trials', label: 'navigation.crimes-and-trials'}
export const CollectionRoute = { to: 'references', label: 'navigation.collection' }
export const AboutRoute = { to: 'about', label: 'navigation.about' }
export const TermsOfUseRoute = { to:'terms-of-use', label: 'navigation.terms-of-use'}

export const PrimaryRoutes = [
  HistoryOfJusticeSystemRoute,
  MagistrateJobRoute,
  CrimesAndTrialsRoute,
  CollectionRoute,
  AboutRoute
]
//  Use to get the active route. HomeRoute must be the last item
export const AllRoutes = [
  HistoryOfJusticeSystemRoute,
  MagistrateJobRoute,
  CrimesAndTrialsRoute,
  CollectionRoute,
  AboutRoute,
  TermsOfUseRoute,
  HomeRoute
];

export const Languages = (process.env.REACT_APP_LANGUAGES ?? 'en-GB,fr-FR,de-DE').split(',')
export const LanguageCodes = Languages.map((l) => l.split('-')[0])
export const LanguageRoutePattern = `/:lang(${LanguageCodes.join('|')})`
export const DefaultLanguage = process.env.REACT_APP_DEFAULT_LANGUAGE ?? 'en-GB'
export const DefaultLanguageCode = DefaultLanguage.split('-')[0]

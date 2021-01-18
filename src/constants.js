export const HomeRoute = { to:'/', label: 'navigationHome'}
export const CollectionRoute = { to: '/references', label: 'navigationCollection' }
export const StoriesRoute = { to: '/stories', label: 'navigationStories' }
export const AboutRoute = { to: '/about', label: 'navigationAbout' }
export const TermsOfUseRoute = { to:'/terms', label: 'navigationTermsOfUse'}
export const PrimaryRoutes = [
  HomeRoute,
  CollectionRoute,
  AboutRoute
]

export const Languages = (process.env.REACT_APP_LANGUAGES ?? 'en-GB,fr-FR,de-DE').split(',')
export const LanguageCodes = Languages.map((l) => l.split('-')[0])
export const LanguageRoutePattern = `/:lang(${LanguageCodes.join('|')})`
export const DefaultLanguage = process.env.REACT_APP_DEFAULT_LANGUAGE ?? 'en-GB'
export const DefaultLanguageCode = DefaultLanguage.split('-')[0]

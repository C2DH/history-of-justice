import React, { Suspense, lazy, useEffect } from 'react'
import { Switch, Route, Redirect, useRouteMatch, useLocation } from "react-router-dom"
import ReactGA from 'react-ga'
import AppRouteLoading from './pages/AppRouteLoading'
import { LanguageRoutePattern } from './constants'

/* Pages */
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const TermsOfUse = lazy(() => import('./pages/TermsOfUse'))
const NotFound = lazy(() => import('./pages/NotFound'))
/* Pages routing by language */
const LangRoutes = () => {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Route exact path={`${path}`}>
        <Home />
      </Route>
      <Route exact path={`${path}/about`}>
        <About />
      </Route>
      <Route exact path={`${path}/about`}>
        <TermsOfUse />
      </Route>
      <Route path={`${path}*`}>
        <NotFound />
      </Route>
    </Switch>
  )
}

const usePageViews = ({ enableGA }) => {
  let location = useLocation()

  useEffect(
    () => {
      const url = [location.pathname, location.search].join('')
      if (enableGA) {
        console.info('ReactGA.pageview:', url)
        ReactGA.pageview(url)
      } else {
        console.info('ReactGA.pageview disabled:', url)
      }
    },
    [location, enableGA]
  )
}

const AppRoutes = ({enableGA=false, startLanguageCode='en'}) => {
  usePageViews({ enableGA })

  return (
    <Suspense fallback={<AppRouteLoading/>}>
    <Switch>
      <Redirect from="/" exact to={startLanguageCode} />
      <Route path={LanguageRoutePattern}>
        <LangRoutes />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
    </Suspense>
  )
}

export default AppRoutes

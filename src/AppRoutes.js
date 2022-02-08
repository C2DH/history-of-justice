import React, { Suspense, lazy, useEffect } from 'react';
import ReactGA from 'react-ga';
import { QueryParamProvider } from 'use-query-params';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate
} from "react-router-dom";

import Layout from './Layout';
import AppRouteLoading from './pages/AppRouteLoading';
import { LanguageCodes } from './constants';
import { useLanguage } from './logic/language';

import {
  HistoryOfJusticeSystemRoute,
  MagistrateJobRoute,
  CrimesAndTrialsRoute,
  CollectionRoute,
  AboutRoute,
  TermsOfUseRoute
} from './constants';

/* Pages */
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const TermsOfUse = lazy(() => import('./pages/TermsOfUse'));
const NotFound = lazy(() => import('./pages/NotFound'));


const GA = ({ enabled = false }) => {

  let location = useLocation();

  useEffect(
    () => {
      const url = [location.pathname, location.search].join('')
      if (enabled) {
        console.info('ReactGA.pageview:', url)
        ReactGA.pageview(url)
      } else {
        console.info('ReactGA.pageview disabled:', url)
      }
    },
    [location, enabled]
  )

  return null;
}


const ScrollToTop = _ => {
  let location = useLocation();
  useEffect(_ => window.scrollTo(0, 0), [location]);
  return null;
}


/**
 * This is the main thing you need to use to adapt the react-router v6
 * API to what use-query-params expects.
 *
 * Pass this as the `ReactRouterRoute` prop to QueryParamProvider.
 */
const RouteAdapter = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const adaptedHistory = React.useMemo(
    () => ({
      replace(location) {
        navigate(location, { replace: true, state: location.state });
      },
      push(location) {
        navigate(location, { replace: false, state: location.state });
      },
    }),
    [navigate]
  );
  return children({ history: adaptedHistory, location });
};


/* Pages routing by language */
const LangRoutes = _ => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path={HistoryOfJusticeSystemRoute.to} element={<About />} />
      <Route path={MagistrateJobRoute.to} element={<About />} />
      <Route path={CrimesAndTrialsRoute.to} element={<About />} />
      <Route path={CollectionRoute.to} element={<About />} />
      <Route path={AboutRoute.to} element={<About />} />
      <Route path={TermsOfUseRoute.to} element={<TermsOfUse />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);


const AppRoutes = ({ enableGA=false }) => {

  const { lang } = useLanguage();

  return (
    <React.Fragment>
      <GA enabled={enableGA} />
      <ScrollToTop />
      <Suspense fallback={<AppRouteLoading/>}>
        <QueryParamProvider ReactRouterRoute={RouteAdapter}>
          <Routes>
            {LanguageCodes.map(lang =>
              <Route path={`${lang}/*`} element={<LangRoutes />} key="lang" />
            )}
            <Route path="/" element={<Navigate to={`/${lang}`} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </QueryParamProvider>
      </Suspense>
    </React.Fragment>
  );
}

export default AppRoutes

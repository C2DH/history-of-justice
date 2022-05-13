import React, { lazy, useEffect, Suspense } from 'react';
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
import { useModal } from './logic/modal';
import { LanguageCodes } from './constants';
import { useLanguage } from './logic/language';
import AppRouteLoading from './pages/AppRouteLoading';

import {
  HistoryOfJusticeSystemRoute,
  MagistrateJobRoute,
  CrimesAndTrialsRoute,
  CollectionRoute,
  MediaRoute,
  AboutRoute,
  TermsOfUseRoute
} from './constants';

/* Pages */
const Home = lazy(() => import('./pages/Home'));
const Story = lazy(() => import('./pages/Story'));
const MagistrateJob = lazy(() => import('./pages/MagistrateJob'));
const Interview = lazy(() => import('./pages/Interview'));
const CrimesAndTrials = lazy(() => import('./pages/CrimesAndTrials'));
const Crime = lazy(() => import('./pages/Crime'));
const Collection = lazy(() => import('./pages/Collection'));
const Media = lazy(() => import('./pages/Media'));
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
const LangRoutes = () => {

  const location                = useLocation();
  const { backgroundLocation }  = useModal();

  return (
    <Layout>
      <Suspense fallback={<AppRouteLoading/>}>
        <Routes location={backgroundLocation || location}>
          <Route index element={<Home />} />
          <Route path={HistoryOfJusticeSystemRoute.to}>
            <Route index element={<Navigate to="la-naissance-du-systeme-judiciaire-contemporain-au-19e-siecle" />} />
            <Route path=":storySlug" element={<Story />}>
            </Route>
          </Route>
          <Route path={MagistrateJobRoute.to} element={<MagistrateJob />}>
            <Route path=":interviewSlug" element={<Interview />} />
          </Route>
          <Route path={CrimesAndTrialsRoute.to} element={<CrimesAndTrials />}>
            <Route path=":crimeSlug" element={<Crime />} />
          </Route>
          <Route path={CollectionRoute.to} element={<Collection />} />
          <Route path={`${MediaRoute.to}/:mediaSlug`} element={<Media />} />
          <Route path={AboutRoute.to} element={<About />} />
          <Route path={TermsOfUseRoute.to} element={<TermsOfUse />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        {backgroundLocation &&
          <Routes>
            <Route path={`${MediaRoute.to}/:mediaSlug`} element={<Media />} />
          </Routes>
        }
      </Suspense>
    </Layout>
  );
}


const AppRoutes = ({ enableGA=false }) => {

  const { lang } = useLanguage();
  const location = useLocation();

  return (
    <React.Fragment>
      <GA enabled={enableGA} />
      <QueryParamProvider ReactRouterRoute={RouteAdapter}>
        <Routes>
          {LanguageCodes.map(lang =>
            <Route path={`${lang}/*`} element={<LangRoutes />} key="lang" />
          )}
          <Route path="*" element={<Navigate to={`/${lang}${location.pathname}`} />} />
        </Routes>
      </QueryParamProvider>
    </React.Fragment>
  );
}

export default AppRoutes

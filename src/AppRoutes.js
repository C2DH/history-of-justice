import React, { lazy, useEffect, Suspense } from 'react';
import ReactGA from 'react-ga';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate
} from "react-router-dom";
import { useTransition, animated } from 'react-spring';

import Layout from './Layout';
import { useModal } from './hooks/modal';
import { useActiveRoute } from './hooks/route';
import { useLanguage } from './hooks/language';
import { LanguageCodes } from './constants';
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
const HistoryOfJusticeSystem = lazy(() => import('./pages/HistoryOfJusticeSystem'));
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


/* Pages routing by language */
const LangRoutes = ({ location }) => {

  const { backgroundLocation }  = useModal();

  return (
    <Layout>
      <Suspense fallback={<AppRouteLoading/>}>
        <Routes location={backgroundLocation || location}>
          <Route index element={<Home />} />
          <Route path={HistoryOfJusticeSystemRoute.to} element={<HistoryOfJusticeSystem />}>
            <Route index element={<Navigate to="la-naissance-du-systeme-judiciaire-contemporain-au-19e-siecle" />} />
            <Route path=":storySlug" element={<Story />} />
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

  const { lang }                = useLanguage();
  const location                = useLocation();
  const { backgroundLocation }  = useModal();
  const activeRoute             = useActiveRoute(backgroundLocation || location);

  const transitions             = useTransition(location, {
    key: location => activeRoute.to,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 500 },
    trail: 500
  });

  return (
    <React.Fragment>
      <GA enabled={enableGA} />
      <QueryParamProvider adapter={ReactRouter6Adapter}>

        {transitions(({ opacity }, location) =>
          <animated.div style={{ opacity }} className="h-100 w-100 position-absolute">
            <Routes location={location}>
              {LanguageCodes.map(lang =>
                <Route path={`${lang}/*`} element={<LangRoutes location={location} />} key="lang" />
              )}
              <Route path="*" element={<Navigate to={`/${lang}${location.pathname}`} />} />
            </Routes>
          </animated.div>
        )}

      </QueryParamProvider>
    </React.Fragment>
  );
}

export default AppRoutes

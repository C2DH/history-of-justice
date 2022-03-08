import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import AppRouteLoading from './pages/AppRouteLoading';
import Header from './components/Header';


const Layout = _ => (
  <React.Fragment>
    <Header />
    <main className="h-100 position-relative">
      <Suspense fallback={<AppRouteLoading/>}>
        <Outlet />
      </Suspense>
    </main>
  </React.Fragment>
);

export default Layout;

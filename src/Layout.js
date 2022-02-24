import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './components/Header';


const Layout = _ => (
  <React.Fragment>
    <Header />
    <main className="h-100 position-relative">
      <Outlet />
    </main>
  </React.Fragment>
);

export default Layout;

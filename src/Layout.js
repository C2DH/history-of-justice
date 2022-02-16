import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './components/Header';


const Layout = _ => (
  <React.Fragment>
    <Header />
    <main className="mt-3 h-100">
      <Outlet />
    </main>
  </React.Fragment>
);

export default Layout;

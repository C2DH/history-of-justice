import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './components/Header';


const Layout = _ => (
  <React.Fragment>
    <Header />
    <main>
      <Outlet />
    </main>
  </React.Fragment>
);

export default Layout;

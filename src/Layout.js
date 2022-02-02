import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from './components/Footer';


const Layout = _ => (
  <React.Fragment>
    <main className="mt-5">
      <Outlet />
    </main>
    <Footer />
  </React.Fragment>
);

export default Layout;

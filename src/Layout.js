import React from 'react';

import Header from './components/Header';


const Layout = ({ children }) => (
  <React.Fragment>
    <Header />
    <main className="h-100 position-relative">
        {children}
    </main>
  </React.Fragment>
);

export default Layout;

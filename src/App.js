import AppRoutes from './AppRoutes';
import { BrowserRouter } from "react-router-dom";

import { WithLanguage } from './hooks/language';
import { WithMiller } from './hooks/miller';
import { WithMediaQuery } from './hooks/mediaQuery';
import { HelmetProvider } from 'react-helmet-async';


const App = () => (
  <BrowserRouter>
    <HelmetProvider>
      <WithLanguage>
        <WithMiller>
          <WithMediaQuery>
            <AppRoutes />
          </WithMediaQuery>
        </WithMiller>
      </WithLanguage>
    </HelmetProvider>
  </BrowserRouter>
);

export default App;

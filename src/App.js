import AppRoutes from './AppRoutes';
import { BrowserRouter } from "react-router-dom";

import { WithLanguage } from './hooks/language';
import { WithMiller } from './hooks/miller';
import { WithMediaQuery } from './hooks/mediaQuery';


const App = () => (
  <BrowserRouter>
    <WithLanguage>
      <WithMiller>
        <WithMediaQuery>
          <AppRoutes />
        </WithMediaQuery>
      </WithMiller>
    </WithLanguage>
  </BrowserRouter>
);

export default App;

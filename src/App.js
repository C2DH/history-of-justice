import AppRoutes from './AppRoutes';
import { BrowserRouter } from "react-router-dom";

import { WithLanguage } from './logic/language';
import { WithMiller } from './logic/miller';


const App = () => (
  <BrowserRouter>
    <WithLanguage>
      <WithMiller>
        <AppRoutes />
      </WithMiller>
    </WithLanguage>
  </BrowserRouter>
);

export default App;

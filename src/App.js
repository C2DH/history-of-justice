import AppRoutes from './AppRoutes';
import { BrowserRouter } from "react-router-dom";

import { WithLanguage } from './logic/language';
import { WithMiller } from './logic/miller';
import { WithBreakpoint } from './logic/breakpoint';


const App = () => (
  <BrowserRouter>
    <WithLanguage>
      <WithMiller>
        <WithBreakpoint>
          <AppRoutes />
        </WithBreakpoint>
      </WithMiller>
    </WithLanguage>
  </BrowserRouter>
);

export default App;

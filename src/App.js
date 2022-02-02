import AppRoutes from './AppRoutes';
import { BrowserRouter } from "react-router-dom"

import { WithLanguage } from './logic/language';


const App = _ => (
  <BrowserRouter>
    <WithLanguage>
      <AppRoutes />
    </WithLanguage>
  </BrowserRouter>
);

export default App;

import { useLocation } from 'react-router-dom';
import _ from 'lodash';

import { AllRoutes, HomeRoute } from '../constants';


export const useActiveRoute = (location) => {
    const { pathname } = useLocation();
    console.log(location?.pathname);
    return _.find(AllRoutes, route => (location?.pathname || pathname).includes(route.to)) || HomeRoute;
}

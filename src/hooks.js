import { useLocation } from 'react-router-dom';
import _ from 'lodash';

import { AllRoutes } from './constants';


export const useActiveRoute = () => {
    const { pathname } = useLocation();
    return _.find(AllRoutes, route => pathname.includes(route.to));
}

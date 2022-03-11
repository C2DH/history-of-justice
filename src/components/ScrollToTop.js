import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = ({ target = window }) => {

  let location = useLocation();

  useEffect(_ => target.scrollTo(0, 0), [location, target]);
  return null;
}

export default ScrollToTop;

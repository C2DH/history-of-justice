import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';


export const LinkModal = ({
  children,
  useBackground = false,
  ...props
}) => {

  const location = useLocation();

  return (
    <Link {...props} state={{ modalLocation: location, useBackground: useBackground }}>
      {children}
    </Link>
  );
}


export const useModal = () => {

  const { state } = useLocation();
  const navigate  = useNavigate();

  return {
    backgroundLocation: state?.useBackground ? state?.modalLocation : undefined,
    exitLink: state?.modalLocation,
    isModal: !!state?.modalLocation,
    navigate: to => navigate(to, { state })
  }
}

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';


export const LinkModal = ({
  children,
  useBackground = false,
  state = {},
  ...props
}) => {

  const location = useLocation();
  location.state = { ...location.state, isBackground: useBackground};

  return (
    <Link {...props} state={{ ...state, modalLocation: location, useBackground: useBackground }}>
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
    isBackground: !!state?.isBackground,
    navigate: to => navigate(to, { state }),
    state
  }
}

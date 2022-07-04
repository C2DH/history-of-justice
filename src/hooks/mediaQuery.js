import React, { useContext, useMemo } from 'react';
import useMedia from 'use-media';

interface Props {

	children: React.ReactNode;
}

const MEDIA_QUERIES = {
	mobile: '(max-width: 767px)'
}

export const MediaQueryContext = React.createContext();

const WithMediaQuery = ({ children }: Props) => {

	const isMobile 	= useMedia(MEDIA_QUERIES.mobile);
	const value 		= useMemo(() => ({isMobile}), [isMobile]);

  return (
    <MediaQueryContext.Provider value={value}>
      {children}
    </MediaQueryContext.Provider>
  );
}


const useMediaQueryContext = () => {

  const context = useContext(MediaQueryContext);

  if (context === undefined) {
    throw new Error('useMediaQueryContext must be used within a WithMediaQuery component');
  }

	return context;
}


export {
  WithMediaQuery,
  useMediaQueryContext
}

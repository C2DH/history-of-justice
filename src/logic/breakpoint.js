import React, { useState, useContext, useEffect } from 'react';
import debounce from 'debounce';


export const SIZE_XS = 'xs';
export const SIZE_SM = 'sm';
export const SIZE_MD = 'md';
export const SIZE_LG = 'lg';
export const SIZE_XL = 'xl';
export const SIZE_XXL = 'xxl';

/**
 * @param {number} width
 * @returns {Breakpoint}
 */
const resolveBreakpoint = ( width ) => {
	if ( width < 576 ) {
		return SIZE_XS;
	} else if ( width >= 576 && width < 768 ) {
		return SIZE_SM;
	} else if ( width >= 768 && width < 992 ) {
		return SIZE_MD;
	} else if ( width >= 992 && width < 1200 ) {
		return SIZE_LG;
	} else if ( width >= 1200 && width < 1440 ) {
		return SIZE_XL;
	} else if ( width >= 1440 ) {
		return SIZE_XXL;
	}
};


const BreakpointContext = React.createContext();

const WithBreakpoint = ({ children }) => {

  const [size, setSize] = useState(() => resolveBreakpoint(window.innerWidth));

  useEffect(() => {
    const calcInnerWidth = debounce(function () {
      setSize(resolveBreakpoint(window.innerWidth));
    }, 200);

		window.addEventListener('resize', calcInnerWidth);
		return () => window.removeEventListener('resize', calcInnerWidth);
	}, []);

  return (
    <BreakpointContext.Provider value={{ size }}>
      {children}
    </BreakpointContext.Provider>
  );
}

const useBreakpoint = _ => {

  const context = useContext(BreakpointContext);

  if (context === undefined) {
    throw new Error('useBreakpoint must be used within a WithBreakpoint component');
  }

  context.isXXL = context.size === SIZE_XXL;
  context.isUpXL = context.isXXL || context.size === SIZE_XL;
  context.isUpLG = context.isUpXL || context.size === SIZE_LG;
  context.isUpMD = context.isUpLG || context.size === SIZE_MD;
  context.isUpSM = context.isUpMD || context.size === SIZE_SM;

  return context;
}

export {
  WithBreakpoint,
  useBreakpoint
}

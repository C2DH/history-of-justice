import React, { useRef, useContext }  from 'react';


const ScrollElContext = React.createContext();


export const useScrollEl = _ => {
  const context = useContext(ScrollElContext);
  return context || { scrollEl: window };
}


const ScrollContainer = ({ as :Component = 'div', children, ...props }) => {

  const scrollEl = useRef();

  return (
    <Component ref={scrollEl} {...props} style={{ overflowY: 'auto', height: '100%' }}>
      <ScrollElContext.Provider value={{ scrollEl: scrollEl.current }}>
        {children}
      </ScrollElContext.Provider>
    </Component>
  );
}

export default ScrollContainer;

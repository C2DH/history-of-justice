import React, { useRef, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

const ScrollingText = ({
  scrolling = false,
  delay     = 0,
  speed     = 5,
  children
}) => {

  const textEl            = useRef();
  const delayTimeout      = useRef();

  const [styles, api]     = useSpring(() => ({
    transform: 'translateX(0px)',
  }));

  useEffect(() => {
    if(scrolling) {
      delayTimeout.current = setTimeout(() => {
        const shift = Math.max(textEl.current.offsetWidth - textEl.current.parentElement.offsetWidth, 0);
        api.start({
          transform: `translateX(-${shift}px)`,
          config: { duration: shift * speed }
        })
      }, delay);

    } else {
      clearTimeout(delayTimeout.current);
      api.start({
        transform: `translateX(0px)`,
        immediate: true
      });
    }
  }, [scrolling, delay])

  return (
    <animated.div style={{ ...styles }}>
      <span ref={textEl}>
        {children}
      </span>
    </animated.div>
  );
}

export default ScrollingText;
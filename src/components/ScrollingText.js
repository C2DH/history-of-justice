import React, { useRef, useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';

const ScrollingText = ({
  scrolling = false,
  delay     = 0,
  speed     = 5,
  children
}) => {

  const textEl            = useRef();
  const delayTimeout      = useRef();
  const [shift, setShift] = useState(0);

  const [{ x }, api]      = useSpring({x: 0}, []);

  useEffect(() => {
    if(scrolling) {
      delayTimeout.current = setTimeout(() => {
        const shift = Math.max(textEl.current.offsetWidth - textEl.current.parentElement.offsetWidth, 0);
        setShift(shift);
        api.start({
          x:      -shift,
          config: { duration: shift * speed }
        })
      }, delay);

    } else {
      clearTimeout(delayTimeout.current);
      api.start({
        x:      0,
        config: { duration: shift * speed / 2 }
      });
    }
  }, [scrolling, delay, speed, shift, api])

  return (
    <animated.div style={{ x }}>
      <span ref={textEl}>
        {children}
      </span>
    </animated.div>
  );
}

export default ScrollingText;

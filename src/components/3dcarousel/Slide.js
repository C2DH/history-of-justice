import React, { useRef } from "react";
import { animated, Spring } from "react-spring";
import { useDrag } from "react-use-gesture";

import '../../styles/components/3dcarousel/Slide.scss';


const Slide = ({
  content,
  offsetRadius,
  index,
  animationConfig,
  moveSlide,
  scaleFactor,
  opacityFactor,
  shiftDistance
}) => {

  const isDragging        = useRef(false);
  const offsetFromCenter  = index - offsetRadius;
  const totalPresentables = 2 * offsetRadius + 1;
  const distanceFactor    = 1 - Math.abs(offsetFromCenter / (offsetRadius + 1));

  let translateX = -50;

  if(!shiftDistance) {
    if (offsetRadius !== 0) {
      if (index === 0) {
        translateX = 0;
      } else if (index === totalPresentables - 1) {
        translateX = -100;
      }
    }

    const translateXoffset = 50 * (Math.abs(offsetFromCenter) / (offsetRadius + 1));
    if (offsetFromCenter > 0) {
      translateX += translateXoffset;
    } else if (offsetFromCenter < 0) {
      translateX -= translateXoffset;
    }
  }

  const left = shiftDistance ?
    `calc(50% + ${shiftDistance * offsetFromCenter}px)` :
    `${offsetRadius === 0 ? 50 : 50 + (offsetFromCenter * 50) / offsetRadius}%`


  const bind = useDrag(({
    down,
    movement: [mx],
    last
  }) => {

    if(last && isDragging.current)
      setTimeout(() => isDragging.current = false, 2000);

    if(offsetFromCenter === 0 && down && Math.abs(mx) >= 5 && !isDragging.current) {
      isDragging.current = true;
      moveSlide(mx < 0 ? 1 : -1);
    }
  }, {
    enabled: offsetFromCenter === 0
  });


  return (
    <Spring
      transform = {`translateY(-50%) translateX(${translateX}%) scale(${offsetFromCenter === 0 ? 1 : (scaleFactor || distanceFactor)})`}
      left      = {left}
      opacity   = {offsetFromCenter === 0 ? 1 : (opacityFactor || distanceFactor * distanceFactor)}
      config    = {animationConfig}
    >
      {style => (
        <animated.div
          {...bind()}
          className = "Slide"
          style     = {{ ...style, zIndex: Math.abs(Math.abs(offsetFromCenter) - 2) }}
          onClick   = {e => !isDragging.current && moveSlide(offsetFromCenter)}
        >
          {content}
        </animated.div>
      )}
    </Spring>

  );
}

export default Slide;

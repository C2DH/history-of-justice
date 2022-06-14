/**
Forked from https://github.com/gutiguy/react-spring-3d-carousel
and customized to add swipes and some props for opcity, scale and slide distance.
*/

import React, { useState, useEffect, useRef } from "react";
import Slide from "./Slide";

import '../../styles/components/3dcarousel/Carousel.scss';


const DEFAULT_GO_TO_SLIDE_DELAY = 200;
const DEFAULT_ANIMATION_CONFIG = { tension: 120, friction: 14 };


function mod(a, b) {
  return b > 0 ? ((a % b) + b) % b : 0;
}


const Carousel  = ({
  slides          = [],
  offsetRadius    = 2,
  goToSlide       = 0,
  goToSlideDelay  = DEFAULT_GO_TO_SLIDE_DELAY,
  animationConfig = DEFAULT_ANIMATION_CONFIG,
  shiftDistance,
  scaleFactor,
  opacityFactor,
  onSlide
}) => {

  const delay                   = useRef();
  const [index, setIndex]       = useState(0);
  const [target, setTarget]     = useState(goToSlide);
  const [newSlide, setNewSlide] = useState(true);

  useEffect(() => {
    setTarget(mod(goToSlide, slides.length));
  }, [goToSlide, slides]);

  useEffect(() => {
    const getShortestDirection: -1 | 0 | 1 = (from: number, to: number) => {
      if (from > to) {
        if (from - to > slides.length - 1 - from + to) {
          return 1;
        } else return -1;
      } else if (to > from) {
        if (to - from > from + slides.length - 1 - to) {
          return -1;
        } else return 1;
      }
      return 0;
    }

    const handleGoToSlide = () => {
      let direction   = getShortestDirection(index, target);
      setIndex(mod(index + direction, slides.length));
      setNewSlide(false);
    };

    if(index !== target) {
      window.clearTimeout(delay.current);

      if(newSlide)
        handleGoToSlide();
      else
        delay.current = window.setTimeout(handleGoToSlide, goToSlideDelay);
    }
  }, [index, target, newSlide, goToSlideDelay, slides.length]);


  const moveSlide = direction => {
    const target = mod(index + direction, slides.length);
    setTarget(target);
    setNewSlide(true);
    onSlide(target);
  };

  const clampOffsetRadius = offsetRadius => {
    const upperBound = Math.floor((slides.length - 1) / 2);
    return Math.max(Math.min(offsetRadius, upperBound), 0);
  };

  const getPresentableSlides = () => {
    offsetRadius = clampOffsetRadius(offsetRadius);
    const presentableSlides = [];

    if(offsetRadius > 0) {
      for (let i = -offsetRadius; i < 1 + offsetRadius; i++) {
        presentableSlides.push(slides[mod(index + i, slides.length)]);
      }
    }

    return presentableSlides;
  };


  return (
    <div className="Carousel">
      {getPresentableSlides().map((slide, index) => (
        <Slide
          key             = {slide.key}
          content         = {slide.content}
          moveSlide       = {moveSlide}
          offsetRadius    = {clampOffsetRadius(offsetRadius)}
          index           = {index}
          animationConfig = {animationConfig}
          scaleFactor     = {scaleFactor}
          opacityFactor   = {opacityFactor}
          shiftDistance   = {shiftDistance}
        />
      ))}
    </div>
  );
}

export default Carousel;

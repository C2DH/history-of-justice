import React, { useEffect, useState, useMemo } from 'react';
import Carousel from '../3dcarousel/Carousel';
import { findIndex } from 'lodash';

import { useSpeakers } from '../../hooks/miller';
import { useMediaQueryContext } from '../../hooks/mediaQuery';

import '../../styles/components/interview/SpeakerSlider.scss';


const SpeakerSlider = ({
  activeId,
  filterId,
  onSelect
}) => {

  const [ activeIndex, setActiveIndex ] = useState(0);
  const [ speakers ]                    = useSpeakers(filterId);
  const { isMobile }                    = useMediaQueryContext();


  useEffect(() => {
    setActiveIndex(Math.max(findIndex(speakers, ['slug', activeId]), 0));
  }, [activeId, speakers]);


  const carousel_slideHandler = index => {
    onSelect(speakers[index].slug);
  }


  const slides = useMemo(() => speakers.map((speaker, i) => ({
    key: speaker.slug,
    content: <div className="speaker">
                <div>{speaker.data.title}</div>
                <div className="role">{speaker.data.role} ({speaker.data.year})</div>
            </div>
  })), [speakers]);


  return (
    <div className="SpeakerSlider">
      <Carousel
        slides        = {slides}
        goToSlide     = {activeIndex}
        offsetRadius  = {2}
        shiftDistance = {isMobile ? 280 : 400}
        scaleFactor   = {0.9}
        opacityFactor = {0.3}
        onSlide       = {carousel_slideHandler}
      />
    </div>
  );
}

export default SpeakerSlider;

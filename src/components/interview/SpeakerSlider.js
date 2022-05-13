import React, { useEffect, useState } from 'react';
import Carousel from 'react-spring-3d-carousel';
import { findIndex } from 'lodash';

import { useSpeakers } from '../../logic/miller';

import '../../styles/components/interview/SpeakerSlider.scss';


const SpeakerSlider = ({ activeId, onSelect }) => {

  const [ activeIndex, setActiveIndex ] = useState(0);
  const [ speakers ]                    = useSpeakers();


  useEffect(() => {
    setActiveIndex(Math.max(findIndex(speakers, ['slug', activeId]), 0));
  }, [activeId, speakers]);


  const slides = speakers.map((speaker, i) => ({
    key: speaker.slug,
    content: <div id={speaker.slug} className="speaker">
                <div>{speaker.data.title}</div>
                <div className="role">{speaker.data.role} ({speaker.data.year})</div>
            </div>,
    onClick: () => onSelect(speaker.slug)
  }));


  return (
    <div className="SpeakerSlider">
      <Carousel
        slides          = {slides}
        goToSlide       = {activeIndex}
        offsetRadius    = {2}
      />
    </div>
  );
}

export default SpeakerSlider;

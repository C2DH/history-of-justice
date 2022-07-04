import React, { useEffect, useState, useMemo } from 'react';
import Carousel from '../3dcarousel/Carousel';
import { findIndex } from 'lodash';

import { useTopics } from '../../hooks/miller';
import { useMediaQueryContext } from '../../hooks/mediaQuery';

import '../../styles/components/interview/TopicSlider.scss';


const TopicSlider = ({
  activeId,
  filterId,
  onSelect
}) => {

  const [ activeIndex, setActiveIndex ] = useState(0);
  const [ topics ]                      = useTopics(filterId);
  const { isMobile }                    = useMediaQueryContext();


  useEffect(() => {
    setActiveIndex(Math.max(findIndex(topics, ['slug', activeId]), 0));
  }, [activeId, topics]);


  const carousel_slideHandler = index => {
    onSelect(topics[index].slug);
  }


  const slides   = useMemo(() => topics.map(topic => ({
    key: topic.slug,
    content: <div className="topic">{topic.data.title}</div>
  })), [topics]);


  return (
    <div className="TopicSlider">
      <Carousel
        slides        = {slides}
        goToSlide     = {activeIndex}
        offsetRadius  = {1}
        shiftDistance = {isMobile ? 380 : 500}
        scaleFactor   = {0.7}
        onSlide       = {carousel_slideHandler}
      />
    </div>
  );
}

export default TopicSlider;

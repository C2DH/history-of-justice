import React, { useEffect, useState } from 'react';
import Carousel from 'react-spring-3d-carousel';
import { findIndex } from 'lodash';

import { useTopics } from '../../logic/miller';

import '../../styles/components/interview/TopicSlider.scss';


const TopicSlider = ({ activeId, onSelect }) => {


  const [ activeIndex, setActiveIndex ] = useState(0);
  const [ topics ]                      = useTopics();


  useEffect(() => {
    setActiveIndex(Math.max(findIndex(topics, ['slug', activeId]), 0));
  }, [activeId, topics]);


  const slides   = topics.map(topic => ({
    key: topic.slug,
    content: <div className="topic">{topic.data.title}</div>,
    onClick: () => onSelect(topic.slug)
  }));


  return (
    <div className="TopicSlider">
      <Carousel
        slides          = {slides}
        goToSlide       = {activeIndex}
        offsetRadius    = {1}
      />
    </div>
  );
}

export default TopicSlider;

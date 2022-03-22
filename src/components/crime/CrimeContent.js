import React, { useState } from 'react';
import { useStory } from '@c2dh/react-miller';
import { useSpringCarousel } from 'react-spring-carousel';

import CrimeModule from './CrimeModule';

import { ReactComponent as LeftIcon } from '../../images/icons/left.svg';
import { ReactComponent as RightIcon } from '../../images/icons/right.svg';

import '../../styles/components/crime/CrimeContent.scss';


const DRAG_MIN_DISTANCE           = 50;
const ON_SLIDE_START_CHANGE_EVENT = 'onSlideStartChange';
const ON_DRAG_EVENT               = 'onDrag';


const CrimeContent = ({
  crimeId,
  onSlideAfterEnd = () => {},
  onSlideBeforeStart = () => {}
}) => {

  const [ activeSlide, setActiveSlide ] = useState(0);
  const [ crime ] = useStory(crimeId);
  const {
    carouselFragment,
    slideToPrevItem,
    slideToNextItem,
    useListenToCustomEvent
  } = useSpringCarousel({
    items: (crime?.contents?.modules.map((module, i) => ({
      id: i,
      renderItem: <CrimeModule module={module} documents={crime.documents} />
    })) || [{}])
  })

  const left_clickHandler = () => activeSlide === 0 ? onSlideBeforeStart() : slideToPrevItem();
  const right_clickHandler = () => activeSlide >= crime.data.count_modules - 1 ? onSlideAfterEnd() : slideToNextItem();

  useListenToCustomEvent(({
    eventName,
    nextItem,
    slideActionType,
    distance
  }) => {

    switch(eventName) {
    case ON_SLIDE_START_CHANGE_EVENT: setActiveSlide(nextItem.id); break;
    case ON_DRAG_EVENT:
      if(slideActionType === 'prev' && activeSlide === 0 && distance[0] > DRAG_MIN_DISTANCE)
        onSlideBeforeStart();
      if(slideActionType === 'next' && activeSlide >= crime.data.count_modules - 1 && distance[0] > DRAG_MIN_DISTANCE)
        onSlideAfterEnd();
      break;
    default:
    }

  });

  return (
    <div className="CrimeContent">
      <div className="navigation">
        <LeftIcon role="button" onClick={left_clickHandler} />
        <RightIcon role="button" onClick={right_clickHandler} />
      </div>
      {carouselFragment}
      <div className="tile-bar">
        {crime?.contents?.modules.map((_, i) =>
          <div className={`tile ${activeSlide === i ? 'active' : ''}`} key={i.toString()} />
        )}
      </div>
    </div>
  );
}

export default CrimeContent;

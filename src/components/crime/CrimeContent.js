import React, { useState } from 'react';
import { useStory } from '@c2dh/react-miller';
import { useSpringCarousel } from 'react-spring-carousel';
import { Helmet } from 'react-helmet-async';
import { truncate, findIndex } from 'lodash';

import CrimeModule from './CrimeModule';
import { TRUNCATE_DESCRIPTION_OPTIONS } from '../../constants';

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
  const [ crime ]                       = useStory(crimeId);
  const firstImageIndex                 = findIndex(crime?.contents?.modules, ['module', 'object']);

  const {
    carouselFragment,
    slideToPrevItem,
    slideToNextItem,
    useListenToCustomEvent
  } = useSpringCarousel({
    items: (crime?.contents?.modules.map((module, i) => ({
      id: i,
      renderItem: <CrimeModule 
                    module    = {module} 
                    documents = {crime.documents}
                    meta      = {i === firstImageIndex} 
                  />
    })) || [{}])
  })

  const left_clickHandler   = () => activeSlide === 0 ? onSlideBeforeStart() : slideToPrevItem();
  const right_clickHandler  = () => activeSlide >= crime.data.count_modules - 1 ? onSlideAfterEnd() : slideToNextItem();
  const description         = truncate(crime?.contents?.modules[0]?.text?.content, TRUNCATE_DESCRIPTION_OPTIONS);

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

      <Helmet>
        <meta name="description" content={description}></meta>
        <meta property="og:description" content={description} />
      </Helmet>
    </div>
  );
}

export default CrimeContent;

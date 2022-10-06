import React from 'react';
import { last } from 'lodash';

import { LinkModal } from '../../hooks/modal';

import '../../styles/components/interview/InterviewCard.scss';


const InterviewCard = ({
  interview,
  group,
  isActive = true,
  onActiveGroup
 }) => {

  const isLast            = last(group.interviews) === interview;

  const mouseEnterHandler = () => onActiveGroup(group);
  const mouseLeaveHandler = () => onActiveGroup();

  return (
    <LinkModal
      to            = {interview.slug}
      className     = {`InterviewCard ${isActive ? 'active' : ''} ${isLast ? 'last' : ''}`}
      style         = {{ width: `${100 + interview.data.duration / 5}px` }}
      state         = {{ playlist: group.interviews }}
      onMouseEnter  = {mouseEnterHandler}
      onMouseLeave  = {mouseLeaveHandler}
    >
      <figure>
        <img src={interview.data.resolutions?.thumbnail.url} alt={interview.title} />
        <figcaption>{interview[group.data.type === 'topic' ? 'speaker' : 'topic' ]?.data.title}</figcaption>
      </figure>
    </LinkModal>
  );
}

export default InterviewCard;

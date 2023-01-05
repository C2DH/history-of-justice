import React from 'react';

import '../../styles/components/interview/GroupHeaderCard.scss';


const GroupHeaderCard = ({
  group,
  onActiveGroup
 }) => {

  const mouseEnterHandler = () => onActiveGroup && onActiveGroup(group);
  const mouseLeaveHandler = () => onActiveGroup && onActiveGroup();

  return (
    <div
      className     = {`GroupHeaderCard ${!group ? 'empty' : ''}`}
      onMouseEnter  = {mouseEnterHandler}
      onMouseLeave  = {mouseLeaveHandler}
    >
      <div>{group?.data.title}</div>
      {group?.data.role &&
        <div className="role">
          {group.data.role} 
          {group.data.year && 
            <span> ({group.data.year})</span>
          }
        </div>
      }
    </div>
  );
}

export default GroupHeaderCard;

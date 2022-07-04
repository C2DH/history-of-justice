import React from 'react';
import { useParams } from 'react-router-dom';
import { find } from 'lodash';

import { StoryChapter } from '../components/story';
import { useThemes } from '../hooks/miller';


const Story = () => {

  const { storySlug: slug }   = useParams();
  const [ themes ]            = useThemes();
  const theme                 = find(themes, { slug });

  return (
    <div>
      {theme?.data.chapters?.map((chapterId, i) =>
        <StoryChapter
          id    = {chapterId}
          index = {i}
          key   = {chapterId.toString()}
        />
      )}
    </div>
  )
}

export default Story;

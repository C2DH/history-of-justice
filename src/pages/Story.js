import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { find, truncate } from 'lodash';

import { StoryChapter } from '../components/story';
import { useThemes } from '../hooks/miller';
import { HistoryOfJusticeSystemRoute, TRUNCATE_DESCRIPTION_OPTIONS } from '../constants';


const Story = () => {

  const { t }                 = useTranslation();
  const { storySlug: slug }   = useParams();
  const [ themes ]            = useThemes();
  const theme                 = find(themes, { slug });

  const description           = truncate(theme?.data.abstract, TRUNCATE_DESCRIPTION_OPTIONS);
  const cover                 = theme?.covers[0];

  return (
    <div>
      {theme &&
        <Helmet titleTemplate="%s | HistJust.lu">
          <title>{theme.data.title}</title>
          <meta name="description" content={description}></meta>
          <meta property="og:title" content={theme.data.title} />
          <meta property="og:description" content={description} />
          {cover &&
            <meta property="og:image" content={cover.data.resolutions?.preview.url} />
          }
        </Helmet>
      }

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

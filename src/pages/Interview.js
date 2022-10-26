import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { find, findIndex } from 'lodash';
import Player from 'react-player';
import debounce from 'debounce';

import { TopicSlider, SpeakerSlider } from '../components/interview';
import { useModal } from '../hooks/modal';
import { useInterview, useInterviews } from '../hooks/miller';

import { ReactComponent as CloseIcon } from '../images/icons/close.svg';

import '../styles/pages/Interview.scss';


const Interview = () => {

  const { interviewSlug } = useParams();
  const [ interview ]     = useInterview(interviewSlug);
  const [ interviews ]    = useInterviews();
  const {
    exitLink,
    navigate,
    state = {}
  } = useModal();
  const playlist          = state?.playlist || [];

  const loadInterview = debounce((slug) => navigate(`../${slug}`), 1000);

  const topic_selectHandler = slug => {
    const newInterview = find(interviews, item => item.topic?.slug === slug && item.speaker?.slug === interview.speaker.slug);
    if(newInterview) loadInterview(newInterview.slug);
  }

  const speaker_selectHandler = slug => {
    const newInterview = find(interviews, item => item.speaker?.slug === slug && item.topic?.slug === interview.topic.slug);
    if(newInterview) loadInterview(newInterview.slug);
  }

  const player_onEnd = () => {
    const index = findIndex(playlist, interview);
    if(index !== -1 && index < playlist.length - 1)
      loadInterview(playlist[index + 1].slug);
  }


  return (
    <Container fluid className="Interview">
      <InterviewHelmet interview={interview} />

      <Link to={exitLink || '..'} className="close-icon">
        <CloseIcon />
      </Link>

      <TopicSlider
        activeId  = {interview?.topic.slug}
        filterId  = {interview?.speaker.slug}
        onSelect  = {topic_selectHandler}
      />
      <div className="player">
        <Player
          url       = {interview?.data.url}
          playing   = {true}
          controls  = {true}
          width     = "100%"
          height    = "100%"
          onEnded   = {player_onEnd}
        />
      </div>
      <SpeakerSlider
        activeId  = {interview?.speaker.slug}
        filterId  = {interview?.topic.slug}
        onSelect  = {speaker_selectHandler}
      />

    </Container>
  );
}


const InterviewHelmet = ({ interview }) => {

  const { t }       = useTranslation();

  if(!interview) return null;

  const description = t('page.interview.description', { 
    speaker: interview.speaker.data.title,
    topic: interview.topic.data.title 
  });
  
  return (
    <Helmet titleTemplate="%s | HistJust.lu">
      <title>{interview.data.title}</title>
      <meta name="description" content={description}></meta>
      <meta property="og:title" content={interview.data.title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={interview.data.resolutions?.preview.url} />
      <meta property="og:type" content="video.other" />
      <meta property="og:video" content={interview.data.url} />
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "VideoObject",
          "name": "${interview.data.title} | HistJust.lu",
          "description": "${description}",
          "thumbnailUrl": "${interview.data.resolutions?.thumbnail.url}",
          "uploadDate": "2022-10-22",
          "duration": "PT${Math.floor(interview.data.duration / 60)}M${interview?.data.duration % 60}S",
          "embedUrl": "${interview.data.url}",
        }
      `}</script>
    </Helmet>
  );

}


export default Interview;

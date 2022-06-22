import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Player from 'react-player';
import { find, findIndex } from 'lodash';
import debounce from 'debounce';

import { TopicSlider, SpeakerSlider } from '../components/interview';
import { useModal } from '../logic/modal';
import { useInterview, useInterviews } from '../logic/miller';

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
    const newInterview = find(interviews, item => item.topic.slug === slug && item.speaker.slug === interview.speaker.slug);
    if(newInterview) loadInterview(newInterview.slug);
  }

  const speaker_selectHandler = slug => {
    const newInterview = find(interviews, item => item.speaker.slug === slug && item.topic.slug === interview.topic.slug);
    if(newInterview) loadInterview(newInterview.slug);
  }

  const player_onEnd = () => {
    const index = findIndex(playlist, interview);
    if(index !== -1 && index < playlist.length - 1)
      loadInterview(playlist[index + 1].slug);
  }


  return (
      <Container fluid className="Interview">
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


export default Interview;

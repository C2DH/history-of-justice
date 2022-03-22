import React from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { find } from 'lodash';

import ScrollContainer from '../components/ScrollContainer';
import { StoryMenu, StoryChapter } from '../components/story';
import { useThemes } from '../logic/miller';

import '../styles/pages/Story.scss';


const Story = () => {

  const { storySlug: slug }   = useParams();
  const [ themes ]            = useThemes();
  const theme                 = find(themes, { slug });
  const cover                 = theme?.covers[0];


  return (
    <React.Fragment>
      <ScrollContainer className="Story">

        {cover?.snapshot &&
          <div className="bg-image" style={{ backgroundImage: `url(${cover.snapshot})` }} />
        }

        <Container className="intro">
          <Row>
            <Col lg>
              <h1>{theme?.data.title}</h1>
            </Col>
            <Col>
              <span>{theme?.data.abstract}</span>
            </Col>
          </Row>
        </Container>

        <StoryMenu themes={themes} />

        {theme?.data.chapters?.map((chapterId, i) =>
          <StoryChapter
            id    = {chapterId}
            index = {i}
            key   = {chapterId.toString()}
          />
        )}
      </ScrollContainer>

      <Outlet />
    </React.Fragment>
  )
}

export default Story;

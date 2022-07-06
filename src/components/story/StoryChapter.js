import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useStory } from '@c2dh/react-miller';
import { toRoman } from 'roman-numerals';

import StoryModule from './StoryModule.js';

import '../../styles/components/story/StoryChapter.scss';


const StoryChapter = ({ id, index }) => {

  const [ chapter ] = useStory(id);

  return (
    <Container className="StoryChapter">
      {chapter && index > 0 &&
        <Row>
          <Col md={12}>
            <h2>Partie {toRoman(index)} &ndash; {chapter?.data.title}</h2>
            {chapter?.data.abstract &&
              <p>{chapter.data.abstract}</p>
            }
          </Col>
        </Row>
      }

      {chapter?.contents.modules.map((module, i) =>
        <StoryModule
          module    = {module}
          documents = {chapter.documents}
          index     = {i}
          key       = {i.toString()}
        />
      )}
    </Container>
  );
}

export default StoryChapter;

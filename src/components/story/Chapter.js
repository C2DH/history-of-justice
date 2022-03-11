import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useStory } from '@c2dh/react-miller';
import { toRoman } from 'roman-numerals';

import Module from './Module.js';

import '../../styles/components/story/Chapter.scss';


const Chapter = ({ id, index }) => {

  const [ chapter ] = useStory(id, { suspense: false, keepPreviousData: true });

  return (
    <Container className="Chapter">
      {chapter &&
      <Row>
        <Col md={12}>
          <h2>Partie {toRoman(index + 1)} &ndash; {chapter?.data.title}</h2>
          {chapter?.data.abstract &&
            <p>{chapter.data.abstract}</p>
          }
        </Col>
      </Row>
      }

      {chapter?.contents.modules.map((module, i) =>
        <Module
          module    = {module}
          documents = {chapter.documents}
          index     = {i}
          key       = {i.toString()}
        />
      )}
    </Container>
  );
}

export default Chapter;

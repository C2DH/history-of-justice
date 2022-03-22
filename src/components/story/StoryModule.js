import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { find } from 'lodash';

import MediaCard from './MediaCard';

import '../../styles/components/story/StoryModule.scss';


const StoryModule = ({
  module,
  documents,
  index = 0
}) => {

  const content = module.object || module.gallery;

  return (
    <Row className="StoryModule gx-5">
      <Col md={7}>
        <ReactMarkdown>
          {module.text.content}
        </ReactMarkdown>
      </Col>

      <Col md={5}>
        <div className="media-box">
          {content?.id &&
            <MediaCard doc={find(documents, ['document_id', content.id])} caption={content.caption} />
          }

          {content?.objects && content.objects.map(doc =>
            <MediaCard
              doc     = {find(documents, ['document_id', doc.id])}
              caption = {content.caption}
              key     = {doc.id.toString()}
            />
          )}
        </div>
      </Col>
    </Row>
  );
}

export default StoryModule;

import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { MediaRoute } from '../../constants';

import '../../styles/components/story/MediaCard.scss';


const MediaCard = ({ doc, caption }) => {

  const { t } = useTranslation();

  return (
    <Row className="MediaCard gx-2">
      <Col xl={7} className="mb-1">
        <Link to={`${MediaRoute.to}/${doc.slug}`}>
          <img src={doc.data.resolutions?.medium.url} alt={doc.data.title} />
        </Link>
      </Col>
      <Col xl={5} className="metadata mb-1">
        <span className="type">{t(doc.data.type)}</span>
        <span>{caption || doc.data.caption}</span>
      </Col>
    </Row>
  );
}

export default MediaCard;

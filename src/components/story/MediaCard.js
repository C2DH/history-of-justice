import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { LinkModal } from '../../hooks/modal';
import { MediaRoute } from '../../constants';

import '../../styles/components/story/MediaCard.scss';


const MediaCard = ({ doc, caption }) => {

  const { t } = useTranslation();

  return (
    <Row className="MediaCard gx-2">
      <Col xl={7} className="mb-1">
        <LinkModal to={`../../${MediaRoute.to}/${doc.slug}`} useBackground>
          <img src={doc.data.resolutions?.medium.url} alt={doc.data.title} />
        </LinkModal>
      </Col>
      <Col xl={5} className="metadata mb-1">
        <span className="type">{t(doc.data.type)}</span>
        <span>{caption || doc.data.caption}</span>
      </Col>
    </Row>
  );
}

export default MediaCard;

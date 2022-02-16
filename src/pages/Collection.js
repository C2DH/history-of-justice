import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'
import { Container, Row, Col, Nav, Form } from 'react-bootstrap';
import { useQueryParam, StringParam } from 'use-query-params';

import { useMedias, useMediaFacets } from '../hooks';
import CollectionGrid from '../components/CollectionGrid';
import { lang2Field } from '../utils';

import '../styles/pages/Collection.scss';


const TYPE_FACET_ALL  = 'all';
const TITLE_FIELD     = 'data__title';
const DATE_FIELD      = 'data__start_date';


const Collection = () => {

  const { t, i18n } = useTranslation();

  const [offset,    setOffset]    = useState(0);
  const [queryType, setQueryType] = useQueryParam('type', StringParam);
  const [orderBy, setOrderBy]     = useState(`${TITLE_FIELD}__${lang2Field(i18n.language)}`);

  const { mediaTypeFacets, count }              = useMediaFacets();
  const [medias, { next, hasNext }, { clean }]  = useMedias(offset, queryType, orderBy);

  function mediaTypeFacet_handleSelect(type) {

    if(type === queryType || (type === TYPE_FACET_ALL && !queryType)) return;

    clean();
    setOffset(0);
    setQueryType(type !== TYPE_FACET_ALL ? type : undefined);
  }

  return (
    <Container fluid className="Collection px-5">

      <Row className="position-sticky">
        <Col>
          <Nav
            className         = "media-type-facet"
            defaultActiveKey  = {TYPE_FACET_ALL}
            activeKey         = {queryType}
            onSelect          = {mediaTypeFacet_handleSelect}
          >
            <Nav.Link eventKey={TYPE_FACET_ALL}>{t(TYPE_FACET_ALL)} ({count})</Nav.Link>
            {mediaTypeFacets && mediaTypeFacets.map(facet =>
              <Nav.Link eventKey={facet.data__type} key={facet.data__type}>
                {t(facet.data__type)} ({facet.count})
              </Nav.Link>
            )}
          </Nav>
        </Col>
        <Col sm="auto">
          <Form>
            <Form.Group as={Row}>
              <Form.Label column xs="auto">{t('sort')}</Form.Label>
              <Col sm="auto">
                <Form.Select value={orderBy} onChange={e => setOrderBy(e.target.value)}>
                  <option value={`${TITLE_FIELD}__${lang2Field(i18n.language)}`}>{t('title')}</option>
                  <option value={DATE_FIELD}>{t('date')}</option>
                </Form.Select>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>

      <Row>
        {medias &&
          <CollectionGrid
            items       = {medias}
            canLoadMore = {hasNext}
            loadMore    = {() => setOffset(next.offset)}
          />
        }
      </Row>
    </Container>
  )
}

export default Collection;

import React, { useState, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import { Container, Row, Col, Nav, Form } from 'react-bootstrap';
import { useQueryParam, StringParam } from 'use-query-params';

import { useMedias, useMediaFacets } from '../hooks';
import CollectionGrid from '../components/CollectionGrid';

import '../styles/pages/Collection.scss';


const TYPE_FACET_ALL  = 'all';
const DATE_FIELD      = 'start_date';


const Collection = () => {

  const { t }   = useTranslation();
  const rootEl  = useRef();

  const [offset,    setOffset]    = useState(0);
  const [queryType, setQueryType] = useQueryParam('type', StringParam);
  const [orderBy,   setOrderBy]   = useQueryParam('order', StringParam);

  const { mediaTypeFacets, count }              = useMediaFacets();
  const [medias, { next, hasNext }, { clean }]  = useMedias(offset, queryType, orderBy);


  function mediaTypeFacet_handleSelect(type) {

    if(type === queryType || (type === TYPE_FACET_ALL && !queryType)) return;

    clean();
    setOffset(0);
    setQueryType(type !== TYPE_FACET_ALL ? type : undefined);
  }

  function orderBy_handleSelect(e) {
    clean();
    setOffset(0);
    setOrderBy(e.target.value || undefined);
  }


  return (
    <React.Fragment>
      <Container fluid className="Collection" ref={rootEl}>

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
                  <Form.Select value={orderBy} onChange={orderBy_handleSelect}>
                    <option value="">{t('title')}</option>
                    <option value={DATE_FIELD}>{t('date')}</option>
                  </Form.Select>
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Row>

        <Row className="h-100" style={{ justifyContent: "center" }}>
          <Col className="p-0">
          {medias &&
            <CollectionGrid
              items       = {medias}
              canLoadMore = {hasNext}
              loadMore    = {() => setOffset(next.offset)}
              container   = {rootEl.current}
            />
          }
          </Col>
        </Row>
      </Container>

      <Outlet />
    </React.Fragment>
  )
}

export default Collection;

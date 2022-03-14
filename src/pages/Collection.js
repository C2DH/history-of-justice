import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useQueryParam, StringParam } from 'use-query-params';

import { useMedias, useMediaFacets } from '../logic/miller';
import ScrollContainer from '../components/ScrollContainer';
import {
  CollectionGrid,
  CollectionTypeFacet,
  CollectionOrderByFilter
} from '../components/collection';

import '../styles/pages/Collection.scss';


const Collection = () => {

  const [queryType, setQueryType]   = useQueryParam('type', StringParam);
  const [orderBy,   setOrderBy]     = useQueryParam('order', StringParam);

  const { mediaTypeFacets, count }  = useMediaFacets();
  const [medias, {
    hasNextPage,
    fetchNextPage,
//    remove
  }] = useMedias(queryType, orderBy);


  return (
    <React.Fragment>
      <ScrollContainer as={Container} fluid className="Collection">

        <Row className="position-sticky">
          <Col>
            <CollectionTypeFacet
              value     = {queryType}
              items     = {mediaTypeFacets}
              count     = {count}
              onChange  = {setQueryType}
            />
          </Col>
          <Col sm="auto">
            <CollectionOrderByFilter value={orderBy} onChange={setOrderBy} />
          </Col>
        </Row>

        <Row className="h-100" style={{ justifyContent: "center" }}>
          <Col className="p-0">
          {medias &&
            <CollectionGrid
              items       = {medias}
              canLoadMore = {hasNextPage}
              loadMore    = {fetchNextPage}
            />
          }
          </Col>
        </Row>
      </ScrollContainer>

      <Outlet />
    </React.Fragment>
  )
}

export default Collection;

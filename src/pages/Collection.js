import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useQueryParam, StringParam } from 'use-query-params';

import { useMedias, useMediaFacets } from '../hooks/miller';
import { useModal } from '../hooks/modal';
import ScrollContainer from '../components/ScrollContainer';
import {
  CollectionGrid,
  CollectionTypeFacet,
  CollectionOrderByFilter
} from '../components/collection';

import '../styles/pages/Collection.scss';


const Collection = () => {

  const { isModal }                       = useModal();
  const [ queryType,    setQueryType ]    = useQueryParam('type', StringParam);
  const [ queryOrderBy, setQueryOrderBy ] = useQueryParam('order', StringParam);
  const [ type, setType ]                 = useState(queryType);
  const [ orderBy, setOrderBy ]           = useState(queryOrderBy);
  const { mediaTypeFacets, count }        = useMediaFacets();
  const [medias, {
    hasNextPage,
    fetchNextPage,
    //    remove
  }] = useMedias(type, orderBy);

  useEffect(() => {
    //  Do not update filters if modal
    if(isModal) return;

    setType(queryType);
    setOrderBy(queryOrderBy);
  }, [queryType, queryOrderBy, isModal]);


  return (
    <ScrollContainer as={Container} fluid className="Collection">
      <div className="position-sticky Collection-filters">
      <Row>
        <Col>
          <CollectionTypeFacet
            value     = {type}
            items     = {mediaTypeFacets}
            count     = {count}
            onChange  = {setQueryType}
          />
        </Col>
        <Col sm="auto" className="d-flex align-items-center">
          <CollectionOrderByFilter value={orderBy} onChange={setQueryOrderBy} />
        </Col>
      </Row>
      </div>

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
  )
}

export default Collection;

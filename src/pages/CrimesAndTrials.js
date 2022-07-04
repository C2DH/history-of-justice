import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useQueryParam, StringParam } from 'use-query-params';

import { CrimeCard, CrimeOrderByFilter } from '../components/crime';
import { useModal } from '../hooks/modal';
import { useCrimes } from '../hooks/miller';
import ScrollContainer from '../components/ScrollContainer';

import '../styles/pages/CrimesAndTrials.scss';


const Crimes = () => {

  const { isModal }                 = useModal();
  const [queryOrder, setQueryOrder] = useQueryParam('order', StringParam);
  const [order, setOrder]           = useState(queryOrder);
  const [ crimes ]                  = useCrimes(order);

  //  Not change the order when the modal is opened
  useEffect(() => {
    if(!isModal) setOrder(queryOrder);
  }, [queryOrder, isModal])

  return (
    <React.Fragment>
      <ScrollContainer as={Container} fluid className="CrimesAndTrials">
        <Row className="position-sticky justify-content-end">
          <Col sm="auto">
            <CrimeOrderByFilter value={order} onChange={setQueryOrder} />
          </Col>
        </Row>

        <Row className="justify-content-center">
          {crimes?.map(crime =>
            <Col xs="auto" className="gy-4" key={crime.slug}>
              <CrimeCard crime={crime} width={300} height={500} />
            </Col>
          )}
        </Row>
      </ScrollContainer>

      <Outlet />
    </React.Fragment>
  )
}

export default Crimes;

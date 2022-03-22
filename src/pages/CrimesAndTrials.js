import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useQueryParam, StringParam } from 'use-query-params';

import { CrimeCard, CrimeOrderByFilter } from '../components/crime';
import { useCrimes } from '../logic/miller';
import ScrollContainer from '../components/ScrollContainer';

import '../styles/pages/CrimesAndTrials.scss';


const Crimes = () => {

  const [order, setOrder] = useQueryParam('order', StringParam);
  const [ crimes ]        = useCrimes(order);

  return (
    <React.Fragment>
      <ScrollContainer as={Container} fluid className="CrimesAndTrials">
        <Row className="position-sticky justify-content-end">
          <Col sm="auto">
            <CrimeOrderByFilter value={order} onChange={setOrder} />
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

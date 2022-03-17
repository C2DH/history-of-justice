import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useQueryParam, StringParam } from 'use-query-params';

import CrimeCard from '../components/crime/CrimeCard';
import CrimeOrderByFilter from '../components/crime/CrimeOrderByFilter';
import ScrollContainer from '../components/ScrollContainer';
import { useCrimes } from '../logic/miller';

import '../styles/pages/CrimesAndTrials.scss';


const Crimes = () => {

  const [order, setOrder] = useQueryParam('order', StringParam);
  const [ crimes ]        = useCrimes(order);

  return (
    <ScrollContainer as={Container} fluid className="CrimesAndTrials">
      <Row className="position-sticky justify-content-end">
        <Col sm="auto">
          <CrimeOrderByFilter value={order} onChange={setOrder} />
        </Col>
      </Row>

      <Row className="justify-content-center">
        {crimes?.map(crime =>
          <CrimeCard crime={crime} key={crime.slug} />
        )}
      </Row>
    </ScrollContainer>
  )
}

export default Crimes;

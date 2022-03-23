import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Carousel from 'react-spring-3d-carousel';
import { config } from 'react-spring';
import { findIndex } from 'lodash';

import { CrimeCard } from '../components/crime';
import { useCrimes } from '../logic/miller';

import { ReactComponent as CloseIcon } from '../images/icons/close.svg';

import '../styles/pages/Crime.scss';


const Crime = () => {

  const [ activeSlide, setActiveSlide ] = useState(0);
  const { crimeSlug }                   = useParams();
  const [ crimes ]                      = useCrimes();
  const navigate                        = useNavigate();


  useEffect(() => {
    //  setTmeout to fix an error that occurs at loading time of the page with the carousel
    setTimeout(() => setActiveSlide(findIndex(crimes, ['slug', crimeSlug])));
  }, [crimeSlug, crimes])


  const goToNextSlide = () => goToSlide((activeSlide + 1) % crimes.length);
  const goToPrevSlide = () => goToSlide((activeSlide - 1 + crimes.length) % crimes.length);
  const goToSlide     = slideIndex => {
    const slug = crimes[slideIndex].slug;
    if(crimeSlug !== slug)
      navigate(`../${slug}`);
  }

  //  Initialize carousel slides
  const slides        = crimes.map((crime, i) => ({
    key: crime.slug,
    content:
      <CrimeCard
        crime       = {crime}
        open        = {crimeSlug === crime.slug}
        onNextCard  = {goToNextSlide}
        onPrevCard  = {goToPrevSlide}
      />,
    onClick: () => goToSlide(i)
  }));


  return (
    <Container fluid className="Crime">
      <Link to=".." className="close-icon">
        <CloseIcon />
      </Link>

      <Row className="h-100 py-3">
        <Col>
          <Carousel
            slides          = {slides}
            goToSlide       = {activeSlide}
            animationConfig = {config.gentle}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default Crime;

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';

import Footer from '../components/Footer';
import { usePromotedMedias } from '../hooks/miller';
import { HomeRoutes } from '../constants';

import '../styles/pages/Home.scss';


const PARALLAX_DATA = [
  [0.05, -1.1, false],
  [0.05, -0.5, true],
  [0, -1.5, false],
  [0.5, -0.3, false],
  [1.3, 0.3, false]
];


const Home = () => {

  const { t }   = useTranslation();
  const medias  = usePromotedMedias(PARALLAX_DATA.length);

  return (
    <Parallax pages={2} className="Home">
      {medias.map((media, i) =>
        <React.Fragment key={i.toString()}>
          {media &&
            <ParallaxLayer
              offset      = {PARALLAX_DATA[i][0]}
              speed       = {PARALLAX_DATA[i][1]}
              horizontal  = {PARALLAX_DATA[i][2]}
              className   = "promoted-picture"
              >
                <img src={media.data.resolutions.thumbnail.url} alt={media.data.title} />
            </ParallaxLayer>
          }
        </React.Fragment>
      )}

      <ParallaxLayer offset={0}>
        <Container className="h-100">
          <Row className="h-100 justify-content-center">
            <Col md={8} className="intro">
              <h1 className="main-title">
                <span>Histoire</span>
                <span>de la</span>
                <span>Justice</span>
                <span>au Luxembourg</span>
              </h1>
              <div className="citation">
                “Il apparaît qu’une réflexion d’ordre éthique est indispensable pour différents raisons. Les pouvoirs du magistrat sont liés aux valeurs de la justice, de la verité et de la liberté. Les normes de conduite des magistrats sont les corollaire de ces valeurs er la condtion de la confiance en la justice”
              </div>
            </Col>
          </Row>
        </Container>
      </ParallaxLayer>

      <ParallaxLayer offset={1}>
        <Container className="h-100">
          <Row className="h-100 justify-content-center">
            <Col lg={8} className="h-100 navigation">
              <Nav className="menu">
                {HomeRoutes.map(route =>
                  <Nav.Item key={route.to} className="menu-item">
                    <Nav.Link
                      as        = {NavLink}
                      to        = {route.to}
                      eventKey  = {route.to}
                    >
                      {t(route.label)}
                    </Nav.Link>
                    <div className={`type serif ${route.type}`}>
                      {t(`navigation.type.${route.type}`)}
                    </div>
                  </Nav.Item>
                )}
              </Nav>

              <Footer />
            </Col>
          </Row>
        </Container>
      </ParallaxLayer>

    </Parallax>
  )
}

export default Home

import React, { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import Footer from '../components/Footer';
import ScrollContainer from '../components/ScrollContainer';
import { StoryMenu } from '../components/story';
import { useThemes } from '../hooks/miller';
import { HistoryOfJusticeSystemRoute } from '../constants';

import '../styles/pages/HistoryOfJusticeSystem.scss';


const HistoryOfJusticeSystem = () => {

  const storyEl               = useRef();
  const { t }                 = useTranslation();
  const [ themes ]            = useThemes();

  const storyMenu_clickHandler  = () => setTimeout(() => storyEl.current.scrollIntoView(true), 500);

  return (
    <ScrollContainer className="HistoryOfJusticeSystem">
      <Container className="intro">
        <Row>
          <Col lg>
            <h1>{t(HistoryOfJusticeSystemRoute.label)}</h1>
          </Col>
          <Col>
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.

Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel massa suscipit pulvinar. Nulla sollicitudin. Fusce varius, ligula non tempus aliquam, nunc turpis ullamcorper nibh, in tempus sapien eros vitae ligula. Pellentesque rhoncus nunc et augue. Integer id felis. Curabitur aliquet pellentesque diam. Integer quis metus vitae elit lobortis egestas. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi vel erat non mauris convallis vehicula. Nulla et sapien. Integer tortor tellus, aliquam faucibus, convallis id, congue eu, quam. Mauris ullamcorper felis vitae erat. Proin feugiat, augue non elementum posuere, metus purus iaculis lectus, et tristique ligula justo vitae magna.
            </span>
          </Col>
        </Row>
      </Container>

      <StoryMenu themes={themes} onClick={storyMenu_clickHandler} />

      <div ref={storyEl} className="theme">
        <Outlet />
      </div>

      <Container>
        <Row className="mt-5 mb-5 justify-content-center">
          <Col md={8}>
            <Footer />
          </Col>
        </Row>
      </Container>
    </ScrollContainer>
  )
}

export default HistoryOfJusticeSystem;

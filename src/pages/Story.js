import React, { useRef } from 'react';
import { useParams, NavLink, Outlet } from 'react-router-dom';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { find } from 'lodash';
import { toRoman } from 'roman-numerals';

import Chapter from '../components/story/Chapter';
import { useThemes } from '../logic/miller';

import '../styles/pages/Story.scss';


const Story = () => {

  const { storySlug: slug }   = useParams();
  const [ themes ]            = useThemes();
  const theme                 = find(themes, { slug });
  const cover                 = theme?.covers[0];
  const storyEl               = useRef();

  const storyMenu_clickHandler = () => storyEl.current.scrollTo(0, 0);

  return (
    <React.Fragment>
      <div className="Story" ref={storyEl}>

        {cover?.snapshot &&
          <div className="bg-image" style={{ backgroundImage: `url(${cover.snapshot})` }} />
        }

        <Container className="intro">
          <Row>
            <Col lg>
              <h1>{theme?.data.title}</h1>
            </Col>
            <Col>
              <span>{theme?.data.abstract}</span>
            </Col>
          </Row>
        </Container>

        <Nav className="story-menu">
          {themes?.map((theme, i) =>
            <Nav.Link
              as        = {NavLink}
              onClick   = {storyMenu_clickHandler}
              to        = {`../${theme.slug}`}
              key       = {theme.slug}
              eventKey  = {theme.slug}
              style     = {{ width: `${100 / themes.length}%` }}
            >
              {toRoman(i+1)} &ndash; {theme.data.title}
            </Nav.Link>
          )}
        </Nav>

        {theme?.data.chapters?.map((chapterId, i) =>
          <Chapter
            id    = {chapterId}
            index = {i}
            key   = {chapterId.toString()}
          />
        )}
      </div>

      <Outlet />
    </React.Fragment>
  )
}

export default Story;

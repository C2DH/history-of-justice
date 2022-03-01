import React from 'react'
import { useParams, NavLink } from 'react-router-dom';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap'
import { find } from 'lodash';
import { toRoman } from 'roman-numerals';

import { useThemes } from '../hooks';

import '../styles/pages/story.scss';


const Story = () => {

  const { slug }          = useParams();
  const [ themes ]        = useThemes();
  const theme             = find(themes, { slug });
  const cover             = theme?.covers[0]?.snapshot;

  return (
    <div className="Story h-100 pt-5" >
      {cover &&
        <div className="bg-image" style={{ backgroundImage: `url(${cover})` }} />
      }

      <Container>
        <Row>
          <Col lg>
            <h1>{theme?.data.title}</h1>
          </Col>
          <Col>
            {theme?.data.abstract}
          </Col>
        </Row>
      </Container>

      <Navbar
        fixed             = "bottom"
        expand            = {false}
        bg                = "light"
        className         = "story-menu"
        collapseOnSelect
      >
        {themes?.map((theme, i) =>
            <Nav.Link
              as        = {NavLink}
              to        = {`../${theme.slug}`}
              key       = {theme.slug}
              eventKey  = {theme.slug}
              style     = {{ width: `${100 / themes.length}%` }}
            >
              {toRoman(i+1)} &ndash; {theme.data.title}
            </Nav.Link>
        )}
      </Navbar>
    </div>
  )
}

export default Story;

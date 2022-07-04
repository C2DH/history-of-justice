import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { toRoman } from 'roman-numerals';

import '../../styles/components/story/StoryMenu.scss';


const StoryMenu = ({ themes, onClick = () => null }) => (

  <Nav className="StoryMenu">
    {themes?.map((theme, i) =>
      <Nav.Link
        as        = {NavLink}
        to        = {theme.slug}
        key       = {theme.slug}
        eventKey  = {theme.slug}
        style     = {{ width: `${100 / themes.length}%` }}
        onClick   = {onClick}
      >
        {toRoman(i+1)} &ndash; {theme.data.title}
      </Nav.Link>
    )}
  </Nav>
);

export default StoryMenu;

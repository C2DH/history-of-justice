import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { toRoman } from 'roman-numerals';

import ScrollingText from '../ScrollingText';

import '../../styles/components/story/StoryMenu.scss';


const StoryMenuLink = ({ children, ...props }) => {

  const [hover, setHover] = useState(false);

  return (
    <NavLink
      onMouseEnter  = {() => setHover(true)}
      onMouseLeave  = {() => setHover(false)}
      {...props}
    >
      <ScrollingText scrolling={hover} delay={1000}>
        {children}
      </ScrollingText>
    </NavLink>
  )
};


const StoryMenu = ({ themes, onClick = () => null }) => (

  <Nav className="StoryMenu">
    {themes?.map((theme, i) =>
      <Nav.Link
        as        = {StoryMenuLink}
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

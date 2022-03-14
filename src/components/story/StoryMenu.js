import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { toRoman } from 'roman-numerals';

import { useScrollEl } from '../ScrollContainer';

import '../../styles/components/story/StoryMenu.scss';


const StoryMenu = ({ themes }) => {

  const { scrollEl } = useScrollEl();
  const storyMenu_clickHandler = () => scrollEl.scrollTo(0, 0);

  return (
    <Nav className="StoryMenu">
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
  );
}

export default StoryMenu;

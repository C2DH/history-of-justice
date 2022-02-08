import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { PrimaryRoutes } from '../constants';
import { useActiveRoute } from '../hooks';

import { ReactComponent as MenuIcon } from '../images/icons/menu.svg';
import '../styles/components/Header.scss';


const Header = () => {

  const activeRoute = useActiveRoute();
  const { t }       = useTranslation();

  return (
    <header>
      <Navbar
        className         = "Header mx-5"
        fixed             = "top"
        expand            = {false}
        collapseOnSelect
      >
        <Navbar.Brand
          as        = {Link}
          to        = "/"
          className = "logo"
        >
          <img src="/logo.svg" alt="Logo Histoire de la Justice" />
          <span>History of Justice</span>
        </Navbar.Brand>

        <Navbar.Text className="title">
          {t(activeRoute.label)}
        </Navbar.Text>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="menu-toggler">
          <span>MENU</span>
          <MenuIcon />
        </Navbar.Toggle>

        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Nav className="main-menu">

            {PrimaryRoutes.map(route =>
              <Nav.Link
                as        = {NavLink}
                to        = {route.to}
                key       = {route.to}
                eventKey  = {route.to}
                className = "menu-item"
              >
                {t(route.label)}
              </Nav.Link>
            )}

          </Nav>
        </Navbar.Collapse>

      </Navbar>
    </header>
  );
}

export default Header;

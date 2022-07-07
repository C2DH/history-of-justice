import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  PrimaryRoutes, CollectionRoute,
  EstimatedNumberOfResources
} from '../constants';
import { useActiveRoute } from '../hooks/route';

import { Menu } from 'react-feather';
import Logo from '../images/histjust-logo.svg';
import '../styles/components/Header.scss';


const Header = () => {

  const activeRoute = useActiveRoute();
  const { t }       = useTranslation();

  return (
    <header>
      <Navbar
        className         = "Header px-3 px-sm-3"
        fixed             = "top"
        expand            = {false}
        bg                = "light"
        collapseOnSelect
      >
        <Navbar.Brand
          as        = {Link}
          to        = "."
          className = "logo serif"
        >
          <img src={Logo} alt='logo' className="Header-logo" />
        </Navbar.Brand>

        <Navbar.Text className="title d-none d-sm-block">
          {t(activeRoute.label)}
        </Navbar.Text>
        <div className="d-flex">
          <Nav.Link
            as={NavLink} 
            to={CollectionRoute.to}
            className="border-end border-dark"
          >{t(CollectionRoute.label)}
            <br/>
            <span className="serif small text-50">
              {t('number.resources', {
                n: EstimatedNumberOfResources
              })}
            </span>
          </Nav.Link>

          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="menu-toggler d-flex align-items-center"
          >
            <span>{t('menu')}</span>
            <span><Menu size={20}/></span>
          </Navbar.Toggle>
        </div>
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

import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

import {
  PrimaryRoutes,
  CollectionRoute,
  HomeRoute
} from '../constants';
import { useActiveRoute } from '../hooks/route';
import { useMediasCount } from '../hooks/miller';

import { Menu } from 'react-feather';
import { ReactComponent as Logo } from '../images/histjust-logo.svg';
import '../styles/components/Header.scss';


const Header = () => {

  const activeRoute = useActiveRoute();
  const { t, i18n } = useTranslation();
  const count       = useMediasCount();
  const mode        = activeRoute === HomeRoute ? 'dark' : 'light';

  return (
    <header>
      <Helmet titleTemplate={`%s | ${t('site.name')}`} defaultTitle={t('site.name')}>
        {activeRoute !== HomeRoute &&
          <title>{t(activeRoute.label)}</title>
        }
        <meta property="og:title" content={t(activeRoute.label)} />
        <meta property="og:site_name" content={t('site.name')} />
        <meta property="og:locale" content={i18n.language.replace('-', '_')} />
      </Helmet>

      <Navbar
        className         = "Header px-3"
        fixed             = "top"
        expand            = {false}
        variant           = {mode}
        bg                = {mode}
        collapseOnSelect
      >
        <Navbar.Brand
          as        = {Link}
          to        = {HomeRoute.to}
          className = "logo serif"
        >
          <Logo className="header-logo" />
        </Navbar.Brand>

        {activeRoute !== HomeRoute &&
          <Navbar.Text className="title d-none d-sm-block">
            {t(activeRoute.label)}
          </Navbar.Text>
        }

        <div className="d-flex h-100">
          <Nav className="d-none d-md-block">
            <Nav.Link
              as        = {NavLink}
              to        = {CollectionRoute.to}
              className = "border-end border-gray-400 pe-3"
            >{t(CollectionRoute.label)}
              <br/>
              <span className="serif small text-gray-600">
                {t('number.resources', {
                  n: count
                })}
              </span>
            </Nav.Link>
          </Nav>

          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="menu-toggler d-flex align-items-center"
          >
            <span>{t('menu')}</span>
            <span><Menu size={20}/></span>
          </Navbar.Toggle>
        </div>
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end navbar-menu">
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

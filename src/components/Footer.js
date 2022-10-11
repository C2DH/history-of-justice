import { Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { HomeFooterRoutes } from '../constants';
import { useActiveRoute } from '../hooks/route';

import { ReactComponent as LogoUni } from '../images/logo_unilu.svg';
import '../styles/components/Footer.scss';


const Footer = () => {

  const activeRoute = useActiveRoute();
  const { t }       = useTranslation();

  return (
    <div as="footer" className="Footer">
      <Nav className="footer-menu" defaultActiveKey={activeRoute.to}>
        {HomeFooterRoutes.map(route => 
          <Nav.Link
            as        = {NavLink}
            to        = {route.to}
            key       = {route.to}
            eventKey  = {route.to}
            className = {`menu-item`}
          >
            {t(route.label)}
          </Nav.Link>
        )}
      </Nav>
      <div className="copyright">
        {t('legal notice')}
      </div>
      <a
        href      = "https://wwwfr.uni.lu/"
        target    = "_blank"
        className = "logo"
        rel       = "noreferrer"
        >
        <LogoUni />
      </a>
    </div>
  )
}

export default Footer

import { Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { FooterRoutes, HomeRoute } from '../constants';
import { useActiveRoute } from '../hooks/route';

import { ReactComponent as LogoUni } from '../images/logo_unilu.svg';
import '../styles/components/Footer.scss';


const Footer = () => {

  const activeRoute = useActiveRoute();
  const { t }       = useTranslation();

  return (
    <div as="footer" className="Footer">
      <Nav className="footer-menu">
        {FooterRoutes.map(route => 
          <Nav.Link
            as        = {NavLink}
            to        = {`${activeRoute !== HomeRoute ? '../' : ''}${route.to}`}
            key       = {route.to}
            className = {`menu-item`}
            end
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

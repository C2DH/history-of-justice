import { Container, Row, Col, Nav } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import LangNavLink from './LangNavLink'
import {
  HomeRoute,
  AboutRoute,
  TermsOfUseRoute
} from '../constants'

const now = new Date()

const Footer = ()=> {
  const { t } = useTranslation()

  return (
    <Container>
      <Row>
        <Col>Copyright © <a href="https://www.uni.lu/">University of Luxembourg</a> {now.getFullYear()}</Col>
        <Col>
          <Nav className="flex-column">
            <Nav.Item><LangNavLink to={HomeRoute.to} exact>{t(HomeRoute.label)}</LangNavLink></Nav.Item>
            <Nav.Item><LangNavLink to={AboutRoute.to} exact>{t(AboutRoute.label)}</LangNavLink></Nav.Item>
            <Nav.Item><LangNavLink to={TermsOfUseRoute.to} exact>{t(TermsOfUseRoute.label)}</LangNavLink></Nav.Item>
          </Nav>
        </Col>
        <Col>
          View sourcecode of this version: <a href={`https://github.com/C2DH/popkult60-exhibit/commit/${process.env.REACT_APP_GIT_REVISION}`}>
          {process.env.REACT_APP_GIT_BRANCH}/{process.env.REACT_APP_GIT_REVISION}
          </a>
        </Col>
      </Row>
    </Container>
  )
}

export default Footer

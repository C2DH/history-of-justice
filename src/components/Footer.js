import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom';
import {
  TermsOfUseRoute
} from '../constants'

const now = new Date()

const Footer = ()=> {

  const { t } = useTranslation();

  return (
    <Container as="footer" className="py-5">
      <Row>
        <Col>Copyright © <a href="https://www.uni.lu/">University of Luxembourg</a> {now.getFullYear()}</Col>
        <Col>
          <Link to={TermsOfUseRoute.to}>{t(TermsOfUseRoute.label)}</Link>
        </Col>
        <Col>
          View sourcecode of this version: <a href={`https://github.com/C2DH/legionnaire/commit/${process.env.REACT_APP_GIT_REVISION}`}>
          {process.env.REACT_APP_GIT_BRANCH}/{process.env.REACT_APP_GIT_REVISION}
          </a>
        </Col>
      </Row>
    </Container>
  )
}

export default Footer

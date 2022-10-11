import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import Footer from '../components/Footer';
// import { useTranslation } from 'react-i18next'

const NotFound = () => {
  // const { t } = useTranslation()
  return (
    <Container>
      <Row>
        <Col>
        </Col>
      </Row>

      <Row className="mt-5 justify-content-center">
        <Col md={8}>
          <Footer />
        </Col>
      </Row>

    </Container>
  )
}

export default NotFound

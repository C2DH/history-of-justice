import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const AppRouteLoading = () => {
  const { t } = useTranslation()
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="my-5">{t('pagesAppRouteLoadingTitle')}</h1>
          <p>{t('pagesAppRouteLoadingSubheading')}</p>
        </Col>
      </Row>
    </Container>
  )
}

export default AppRouteLoading

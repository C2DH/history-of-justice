import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const TermsOfUse = () => {
  const { t } = useTranslation()
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="my-5">{t('pagesTermsOfUseTitle')}</h1>
          <p>{t('pagesTermsOfUseSubheading')}</p>
        </Col>
      </Row>
    </Container>
  )
}

export default TermsOfUse

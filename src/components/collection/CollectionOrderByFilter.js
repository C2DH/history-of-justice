import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next'

import { useScrollEl } from '../ScrollContainer';


const DATE_FIELD      = 'start_date';


const CollectionOrderByFilter = ({ value='', onChange }) => {

  const { scrollEl }  = useScrollEl();
  const { t }         = useTranslation();

  function handleSelect(e) {
    scrollEl.scrollTo(0, 0);
    onChange(e.target.value || undefined);
  }

  return (
    <Form>
      <Form.Group as={Row}>
        <Form.Label column xs="auto">{t('sort')}</Form.Label>
        <Col sm="auto">
          <Form.Select value={value} onChange={handleSelect}>
            <option value="">{t('title')}</option>
            <option value={DATE_FIELD}>{t('date')}</option>
          </Form.Select>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default CollectionOrderByFilter;

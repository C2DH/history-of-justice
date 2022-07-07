import React from 'react';
import { Form } from 'react-bootstrap';
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
    <Form className="CollectionOrderByFilter">
      <Form.Group className="d-flex align-items-center">
        <Form.Label
          column
          xs="auto"
          className="CollectionOrderByFilter-label me-2"
        >
          {t('sort')}
        </Form.Label>
        <Form.Select value={value} onChange={handleSelect}>
          <option value="">{t('title')}</option>
          <option value={DATE_FIELD}>{t('date')}</option>
        </Form.Select>
      </Form.Group>
    </Form>
  );
}

export default CollectionOrderByFilter;

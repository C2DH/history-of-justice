import React from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next'

import { useScrollEl } from '../ScrollContainer';

import '../../styles/components/interview/InterviewOrderFilter.scss';


const TOPIC_ORDER         = 'topic';


const InterviewOrderFilter = ({ value, onChange }) => {

  const { scrollEl }  = useScrollEl();
  const { t }         = useTranslation();

  function handleChange(e) {
    if(e.target.checked === value) return;
    scrollEl.scrollTo(0, 0);
    onChange(e.target.checked ? TOPIC_ORDER : undefined);
  }

  return (
    <Form className="InterviewOrderByFilter">
      <Form.Label>{t('sort by')}</Form.Label>
      <Form.Check
        type      = "switch"
        className = "orderByField"
        id        = "orderBy"
      >
        <Form.Check.Label className={value !== TOPIC_ORDER ? 'active' : undefined}>
          {t('interviewee')}
        </Form.Check.Label>
        <Form.Check.Input
          type      = "checkbox"
          checked   = {value === TOPIC_ORDER}
          onChange  = {handleChange}
        />
        <Form.Check.Label className={value === TOPIC_ORDER ? 'active' : undefined}>
          {t('topic')}
        </Form.Check.Label>
      </Form.Check>
    </Form>
  );
}

export default InterviewOrderFilter;

import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next'

import { useScrollEl } from '../ScrollContainer';

import '../../styles/components/crime/CrimeOrderFilter.scss';


const ASCENDING_ORDER = 'asc';
const DESCENDING_ORDER = 'desc';


const CrimeOrderFilter = ({ value = ASCENDING_ORDER, onChange }) => {

  const { scrollEl }  = useScrollEl();
  const { t }         = useTranslation();

  function handleSelect(order) {
    if(order === value) return;
    scrollEl.scrollTo(0, 0);
    onChange(order !== ASCENDING_ORDER ? order : undefined);
  }

  return (
    <Dropdown onSelect={handleSelect} className="CrimeOrderFilter">
      <Dropdown.Toggle>
        {t(value === ASCENDING_ORDER ? 'oldest first' : 'newest first')}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey={ASCENDING_ORDER}>{t('oldest first')}</Dropdown.Item>
        <Dropdown.Item eventKey={DESCENDING_ORDER}>{t('newest first')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default CrimeOrderFilter;

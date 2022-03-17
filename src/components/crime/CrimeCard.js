import React from 'react';
import { Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import '../../styles/components/crime/CrimeCard.scss';


const CrimeCard = ({ crime = {} }) => {

  const { t } = useTranslation();

  return (
    <Col className="CrimeCard" xs="auto">
      <div className="wrapper">

        <div className="year">{crime.data.abstract}</div>
        <h3>{crime.data.title}</h3>

        <button>{t('explore')}</button>
      </div>
    </Col>
  );
}

export default CrimeCard;

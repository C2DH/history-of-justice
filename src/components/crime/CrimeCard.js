import React from 'react';
import { useTranslation } from 'react-i18next';

import { LinkModal } from '../../hooks/modal';
import CrimeContent from './CrimeContent';

import '../../styles/components/crime/CrimeCard.scss';


const CrimeCard = ({
  crime   = {},
  width   = 420,
  height,
  open    = false,
  onNextCard,
  onPrevCard
}) => {

  const { t } = useTranslation();

  return (
    <div className="CrimeCard" style={{ width: `${width}px` }}>
      <div className={`slide ${open ? 'open' : ''}`} style={height && { height: `${height}px` }}>

        <div className="year">{crime.data.abstract}</div>
        {!open &&
          <React.Fragment>
            <h3>{crime.data.title}</h3>

            <LinkModal to={crime.slug} className="explore-button">
              {t('explore')}
            </LinkModal>
          </React.Fragment>
        }

        {open &&
          <CrimeContent
            crimeId             = {crime.id}
            onSlideAfterEnd     = {onNextCard}
            onSlideBeforeStart  = {onPrevCard}
          />
        }
      </div>
      {open &&
        <h3 className="outside">{crime.data.title}</h3>
      }
    </div>
  );
}

export default CrimeCard;

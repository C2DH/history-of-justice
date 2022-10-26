import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

import CrimeContent from './CrimeContent';
import { LinkModal } from '../../hooks/modal';

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
          <>
            <h3>{crime.data.title}</h3>

            <LinkModal to={crime.slug} className="explore-button">
              {t('explore')}
            </LinkModal>
          </>
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
        <>
          <h3 className="outside">{crime.data.title}</h3>

          <Helmet titleTemplate={`%s | ${t('site.name')}`}>
            <title>{crime.data.title}</title>
            <meta property="og:title" content={crime.data.title} />
          </Helmet>
        </>
      }
    </div>
  );
}

export default CrimeCard;

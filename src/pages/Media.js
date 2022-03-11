import React  from 'react';
import { useTranslation } from 'react-i18next'
import { Container, Row, Col } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { useDocument } from '@c2dh/react-miller';

import { ImageViewer, PDFViewer } from '../components/Viewer';
import { useDate } from '../hooks';

import { ReactComponent as BackIcon } from '../images/icons/back.svg';
import '../styles/pages/Media.scss';


const Media = () => {

  const { t }         = useTranslation();
  const { mediaSlug } = useParams();
  const [ media ]     = useDocument(mediaSlug);
  const { parseDate } = useDate();

  return (
    <Container fluid className="Media">
      <Row className="h-100 content">
        <Col md={4} className="metadata mb-3">
          <Link to=".." className="back-icon">
            <BackIcon />
          </Link>
            <h1>
              {media?.data.title}
            </h1>
            <div>
              <span className="label">{t('type')} : </span>{t(media?.data.type)}
            </div>
            {media?.data.year &&
              <div>
                <span className="label">{t('year')} : </span>{t(media.data.year)}
              </div>
            }
            {media?.data.start_date && media.data.start_data !== media.data.year &&
              <div>
                <span className="label">{t('date')} : </span>
                {parseDate(media.data.start_date)}
                {media.data.end_date && media.data.end_date !== media.data.start_date &&
                  <span> - {parseDate(media.data.end_date)}</span>
                }
              </div>
            }
            {media?.data.author &&
              <div>
                <span className="label">{t('author')} : </span>{t(media.data.author)}
              </div>
            }
            {media?.data.photographer &&
              <div>
                <span className="label">{t('photographer')} : </span>{media.data.photographer}
              </div>
            }
            {media?.data.copyright &&
              <div>
                <span className="label">{t('copyright')} : </span>{media.data.copyright}
              </div>
            }
            {media?.data.link &&
              <div>
                <a href={media?.data.link} target="_blank" rel="noreferrer">
                  {media?.data.link}
                </a>
              </div>
            }
        </Col>

        <Col md={8} className="h-100">
          <div className="picture">
            {media?.type === 'image' &&
              <ImageViewer url={media?.snapshot} title={media?.title} />
            }
            {media?.type === 'pdf' &&
              <PDFViewer url={media?.attachment} />
            }
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Media;

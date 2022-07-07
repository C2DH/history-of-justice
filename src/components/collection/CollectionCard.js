import React from 'react';
import { truncate } from 'lodash';
import { useTranslation } from 'react-i18next';
import { LinkModal } from '../../hooks/modal';
import { MediaRoute } from '../../constants';
import DocumentDate from '../DocumentDate';

import '../../styles/components/collection/CollectionCard.scss';

const TRUNCATE_OPTIONS = {
  length: 85,
  separator: /[, ]/
}

const CollectionCard = ({ doc }) => {

  const { t } = useTranslation();

  return (
    <LinkModal
      className     = "CollectionCard mb-2"
      to            = {`../${MediaRoute.to}/${doc.slug}`}
      useBackground
    >
      <div className="picture">
        <div>
          <img src={doc.data.resolutions?.thumbnail.url} alt={doc.title} />
        </div>
      </div>
      <div>
        {truncate(doc.data.title, TRUNCATE_OPTIONS)}
        {doc.data.index &&
          <span> (p. {doc.data.index})</span>
        }
      </div>
      <div>
        <DocumentDate
          doc={doc}
          className="label"
          separator="&middot;"
        />
        <span className="label text-gray-500">
          {t(doc.data.type)}
        </span>
      </div>
    </LinkModal>
  )
};

export default CollectionCard;

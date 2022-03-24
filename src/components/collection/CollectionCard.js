import React from 'react';
import { truncate } from 'lodash';

import { LinkModal } from '../../logic/modal';
import { MediaRoute } from '../../constants';

import '../../styles/components/collection/CollectionCard.scss';

const TRUNCATE_OPTIONS = {
  length: 85,
  separator: /[, ]/
}

const CollectionCard = ({ doc }) => (
  <LinkModal
    className     = "CollectionCard"
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
  </LinkModal>
);

export default CollectionCard;

import React from 'react';
import { Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next'

import { useScrollEl } from '../ScrollContainer';

import '../../styles/components/collection/CollectionTypeFacet.scss';


const TYPE_FACET_ALL  = 'all';


const CollectionTypeFacet = ({
  value   = TYPE_FACET_ALL,
  items   = [],
  count   = 0,
  onChange
}) => {

  const { scrollEl }  = useScrollEl();
  const { t }         = useTranslation();

  function handleSelect(type) {

    if(type === value) return;

    scrollEl.scrollTo(0, 0);
    onChange(type !== TYPE_FACET_ALL ? type : undefined);
  }

  return (
    <Nav
      className         = "CollectionTypeFacet"
      defaultActiveKey  = {TYPE_FACET_ALL}
      activeKey         = {value}
      onSelect          = {handleSelect}
    >
      <Nav.Link eventKey={TYPE_FACET_ALL}>{t(TYPE_FACET_ALL)} ({count})</Nav.Link>
      {items.map(facet =>
        <Nav.Link eventKey={facet.data__type} key={facet.data__type}>
          {t(facet.data__type)} ({facet.count})
        </Nav.Link>
      )}
    </Nav>
  );
}

export default CollectionTypeFacet;

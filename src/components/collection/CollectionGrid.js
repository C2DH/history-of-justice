import React, { useState } from 'react';
import { Grid, WindowScroller, AutoSizer } from 'react-virtualized';

import CollectionCard from './CollectionCard';
import { useScrollEl } from '../ScrollContainer';


const COLUMN_WIDTH = 330;
const COLUMN_HEIGHT = 370;


const CollectionGrid = ({ items, canLoadMore=false, loadMore }) => {

  const [colCount, setColCount] = useState(3);
  const rowCount                = Math.ceil(items.length / colCount);
  const { scrollEl }            = useScrollEl();

  function cellRenderer({ columnIndex, key, rowIndex, style }) {

    const i = rowIndex * colCount + columnIndex
    const item = items[i];

    if (!item) return null;

    return (
      <div key={key} style={{ ...style }}>
        <div style={{ padding: 15, height: '100%' }}>
          <CollectionCard doc={item} />
        </div>
     </div>
    )
  }

  function onResize({ width }) {
    setColCount(Math.max(Math.floor(width / COLUMN_WIDTH), 1));
  }

  function onSectionRendered({ columnStopIndex, rowStopIndex }) {
    const i = rowStopIndex * colCount + columnStopIndex
    if (canLoadMore && i >= items.length - 10)
      loadMore()
  }

  return (
    <WindowScroller scrollElement={scrollEl}>
      {({ height, isScrolling, registerChild, scrollTop }) => (
        <AutoSizer
          disableHeigth
          onResize      = {onResize}
          className     = "w-100"
        >
          {() => (
            <div ref={registerChild}>
              {height &&
                <Grid
                  autoHeight
                  className         = "mx-auto"
                  cellRenderer      = {cellRenderer}
                  columnCount       = {colCount}
                  height            = {height}
                  width             = {colCount * COLUMN_WIDTH}
                  rowCount          = {rowCount}
                  columnWidth       = {COLUMN_WIDTH}
                  rowHeight         = {COLUMN_HEIGHT}
                  scrollTop         = {scrollTop}
                  isScrolling       = {isScrolling}
                  onSectionRendered = {onSectionRendered}
                />
              }
            </div>
          )}
        </AutoSizer>
      )}
    </WindowScroller>
  );

}

export default CollectionGrid;

import React, { useEffect, useRef }  from 'react';
import { TransformWrapper, TransformComponent } from "@kokarn/react-zoom-pan-pinch";

import { useMediaQueryContext } from '../../hooks/mediaQuery';


const ImageViewer = ({ url, title }) => {

  const viewer        = useRef();
  const { isMobile }  = useMediaQueryContext();

  useEffect(() => {
    viewer.current?.centerView(1);
  }, [isMobile]);

  return (
    <TransformWrapper
      wheel     = {{ step: 0.1 }}
      ref       = {viewer}
      disabled  = {isMobile}
    >
      {({ zoomIn, zoomOut, centerView }) => (

        <React.Fragment>
          {!isMobile &&
            <div className="tools">
              <button className="zoomIn" onClick={() => zoomIn()}>+</button>
              <button className="zoomOut" onClick={() => zoomOut()}>-</button>
            </div>
          }

          <TransformComponent>
            <img src={url} alt={title} onLoad={_ => centerView(1)} />
          </TransformComponent>
        </React.Fragment>
      )}
    </TransformWrapper>
  );
}

export default ImageViewer;

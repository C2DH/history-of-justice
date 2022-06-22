import React, { useEffect, useRef }  from 'react';
import { TransformWrapper, TransformComponent } from "@kokarn/react-zoom-pan-pinch";

import { useBreakpoint } from '../../logic/breakpoint';


const ImageViewer = ({ url, title }) => {

  const viewer    = useRef();
  const { isMD }  = useBreakpoint();

  useEffect(() => {
    viewer.current?.centerView(1);
  }, [isMD]);

  return (
    <TransformWrapper wheel={{ step: 0.1 }} ref={viewer} disabled={!isMD}>
      {({ zoomIn, zoomOut, centerView }) => (

        <React.Fragment>
          {isMD &&
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

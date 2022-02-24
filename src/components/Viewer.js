import React  from 'react';
import { TransformWrapper, TransformComponent } from "@kokarn/react-zoom-pan-pinch";


export const ImageViewer = ({ url, title }) => (
  <TransformWrapper wheel={{ step: 0.1 }}>
    {({ zoomIn, zoomOut, centerView }) => (

      <React.Fragment>
        <div className="tools">
          <button className="zoomIn" onClick={() => zoomIn()}>+</button>
          <button className="zoomOut" onClick={() => zoomOut()}>-</button>
        </div>

        <TransformComponent>
          <img src={url} alt={title} onLoad={_ => centerView(1)} />
        </TransformComponent>
      </React.Fragment>
    )}
  </TransformWrapper>
);

export const PDFViewer = ({ url }) => (
  <object width="100%" height="100%" type="application/pdf" data={url}>
    <p>This browser does not support PDFs. Please download the PDF to view it: <a href={url}>Download PDF</a>.</p>
  </object>
);

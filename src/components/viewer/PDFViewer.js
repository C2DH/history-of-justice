import React from 'react';


const PDFViewer = ({ url }) => (
  <object width="100%" height="100%" type="application/pdf" data={url}>
    <p>This browser does not support PDFs. Please download the PDF to view it: <a href={url}>Download PDF</a>.</p>
  </object>
);

export default PDFViewer;

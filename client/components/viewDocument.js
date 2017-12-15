import React, { Component } from 'react';
import { Document, Page } from 'react-pdf/build/entry.noworker';

class ViewDocument extends Component {
  constructor() {
    super()
    this.state = {
      numPages: null,
      pageNumber: 1,
    }
  }

  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  }

  render() {
    const { pageNumber, numPages } = this.state;
    const { fileName } = this.props
    const path = '/files/' + fileName
    return (
      <div>
        <Document
          file={path}
          onLoadSuccess={this.onDocumentLoad}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
      </div>
    );
  }
}

export default ViewDocument

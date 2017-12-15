import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchDocuments, removeDocument } from '../store'
import { Table, Button } from 'semantic-ui-react'
import { SingleDocument, ViewDocument } from '../components'
import PropTypes from 'prop-types'

class AllDocuments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileName: '',
      documentRender: false
    }
    this.viewDocument = this.viewDocument.bind(this)
    this.closeDocument = this.closeDocument.bind(this)
  }

  componentDidMount() {
    let patientId = this.props.patientId
    this.props.loadInitialData(patientId)
  }

  viewDocument(evt) {
    this.setState({ fileName: evt.target.value, documentRender: true })
  }

  closeDocument() {
    this.setState({ fileName: '', documentRender: false })
  }

  render() {
    const { documents, deleteDocument, patientId } = this.props
    let documentRender = this.state.documentRender
    return (
      documents.length > 0
        ? <div>
          <div>
            {documentRender &&
              <div>
                <Button onClick={this.closeDocument}>Close Document</Button>
                <ViewDocument fileName={this.state.fileName} />
                <Button onClick={this.closeDocument}>Close Document</Button>
              </div>
            }
          </div>
          <Table singleLine>
            <Table.Header>
              <Table.Row textAlign="center" >
                <Table.HeaderCell>Document Title</Table.HeaderCell>
                <Table.HeaderCell>File Name</Table.HeaderCell>
                <Table.HeaderCell>Uploaded Date</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {documents.map(singleDocument => {
                return (
                  <SingleDocument singleDocument={singleDocument} key={singleDocument.id} deleteDocument={deleteDocument} viewDocument={this.viewDocument} closeDocument={this.closeDocument} />
                )
              })
              }
            </Table.Body>
          </Table>
        </div>
        : <div><h3>No Documents to Display</h3></div>
    )
  }
}

const mapState = (state) => {
  return {
    documents: state.documents,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData(patientId) {
      dispatch(fetchDocuments(patientId))
    },
    deleteDocument(evt) {
      dispatch(removeDocument(evt.target.value))
    }
  }
}

export default connect(mapState, mapDispatch)(AllDocuments)

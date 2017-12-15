import React from 'react'
import { uploadDocument } from '../store'
import { connect } from 'react-redux'
import { Button, Table, Input } from 'semantic-ui-react'

class UploadDocuments extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChangeText = this.onChangeText.bind(this)
    this.onChangeFile = this.onChangeFile.bind(this)
  }
  onFormSubmit(evt) {
    evt.preventDefault()
    let fileObj = {
      file: this.state.file,
      name: name,
      patientId: this.props.patientId,
      title: this.state.title
    }
    this.props.sendDocument(fileObj)
    this.setState({ file: null })
    this.props.toggleModules(null, 'documents')
  }
  onChangeFile(evt) {
    this.setState({ file: evt.target.files[0] })
  }
  onChangeText(evt) {
    this.setState({ title: evt.target.value })
  }

  render() {
    return (
      <Table singleLine columns="three">
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.HeaderCell>Select Document to Upload</Table.HeaderCell>
            <Table.HeaderCell>Document Title</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row textAlign='center'>
            <Table.Cell> <input type="file" onChange={this.onChangeFile} /></Table.Cell>
            <Table.Cell><Input type="text" onChange={this.onChangeText} required /></Table.Cell>
            <Table.Cell><Button type="submit" value="Upload Image" onClick={this.onFormSubmit}>Upload</Button></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    )
  }
}

const mapState = (state) => {
  return {
    allPatients: state.allPatients,
    appointments: state.docSinglePatAppts
  }
}

const mapDispatch = (dispatch) => {
  return {
    sendDocument(fileObj) {
      dispatch(uploadDocument(fileObj))
    }
  }
}

export default connect(mapState, mapDispatch)(UploadDocuments)

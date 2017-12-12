import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Table, Button } from 'semantic-ui-react'
import { fetchSinglePatient, fetchSinglePatApptsForDoc } from '../store'

class SinglePatient extends Component {
  constructor(patient) {
    super();
  }

  componentDidMount() {
    let patientId = +this.props.match.params.patientId
    let doctorId = this.props.doctorId
    this.props.loadInitialData(patientId, doctorId)
  }

  render() {
    const {patient, docSinglePatAppts} = this.props
    let email = (Object.keys(patient).length > 0) ? patient.user.email : ''
    return (
      <div>
        <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Age</Table.HeaderCell>
            <Table.HeaderCell>E-mail Address</Table.HeaderCell>
            <Table.HeaderCell>Mailing Address</Table.HeaderCell>
            <Table.HeaderCell>City</Table.HeaderCell>
            <Table.HeaderCell>State</Table.HeaderCell>
            <Table.HeaderCell>Zip</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        <Table.Row>
          <Table.Cell>{patient.fullName}</Table.Cell>
          <Table.Cell>{patient.age}</Table.Cell>
          <Table.Cell>{email}</Table.Cell>
          <Table.Cell>{patient.address}</Table.Cell>
          <Table.Cell>{patient.city}</Table.Cell>
          <Table.Cell>{patient.state}</Table.Cell>
          <Table.Cell>{patient.zip}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    patient: state.singlePatient,
    docSinglePatAppts: state.docSinglePatAppts,
    doctorId: state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData(patientId, doctorId) {
      dispatch(fetchSinglePatient(patientId))
      dispatch(fetchSinglePatApptsForDoc(doctorId, patientId))
    }
  }
}

export default connect(mapState, mapDispatch)(SinglePatient)

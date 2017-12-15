import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Form, Button, Message, Input } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { SingleAppointment } from '../components'
import { fetchSinglePatApptsForDoc, fetchAllApptsForPat, docApptRequestResponse } from '../store'

class AllAppointments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showDeclineReason: false,
      responseAppointmentId: 0,
      reason: ''
    }
    this.showDeclineReason = this.showDeclineReason.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    const { doctorId, patientId, isDoctor } = this.props
    this.props.loadInitialData(doctorId, patientId, isDoctor)
  }

  showDeclineReason(response, appointmentId) {
    if (response === 'false') {
      this.setState({
        showDeclineReason: true,
        responseAppointmentId: appointmentId
      })
    } else {
      this.props.respondToRequest('true', appointmentId)
    }
  }
  handleChange(evt) {
    this.setState({ reason: evt.target.value })
  }

  handleSubmit() {
    this.props.respondToRequest('false', this.state.responseAppointmentId, this.state.reason)
    this.setState({
      showDeclineReason: false
    })
  }

  render() {
    let allAppointments = this.props.docAppointments.length > 0 ? this.props.docAppointments : this.props.patAppointments
    return (
      allAppointments.length > 0
      ? <div>
        <div>
          <Table singleLine>
            <Table.Header>
              <Table.Row textAlign='center'>
                <Table.HeaderCell>Appointment Status</Table.HeaderCell>
                <Table.HeaderCell>Appointment Purpose</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Time</Table.HeaderCell>
                <Table.HeaderCell>Notes</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {allAppointments.map(appointment => {
                return (
                  <SingleAppointment appointment={appointment} key={appointment.id} showDeclineReason={this.showDeclineReason} cancel={this.cancel}/>
                )
              })}
            </Table.Body>
          </Table>
        </div>
        {this.state.showDeclineReason &&
          <div>
            <Message info>
              <Message.Header>Please enter reason for declining:</Message.Header>
              <Form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                <Form.Field>
                  <Input size='large' placeholder='Reason for declining' value={this.state.reason} />
                  <Button type='submit' >Submit</Button>
                </Form.Field>
              </Form>
            </Message>
          </div>
        }
      </div>
      : <div><h3>No Appointments to Display</h3></div>
    )
  }
}

const mapState = (state) => {
  return {
    allPatients: state.allPatients,
    docAppointments: state.docSinglePatAppts,
    patAppointments: state.patAllAppts,
    isDoctor: state.user.isDoctor
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData(doctorId, patientId, isDoctor) {
      if (isDoctor) dispatch(fetchSinglePatApptsForDoc(doctorId, patientId))
      else dispatch(fetchAllApptsForPat(patientId))
    },
    respondToRequest(response, appointmentId, message) {
      dispatch(docApptRequestResponse(response, appointmentId, message))
    }
  }
}

export default connect(mapState, mapDispatch)(AllAppointments)

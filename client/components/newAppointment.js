import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postNewApptFromDoc, postNewApptFromPat } from '../store'
import { Input, Table, Button, Message } from 'semantic-ui-react'
import { DateSelector, TimeSelector, DoctorSelector } from '../components'
import moment from 'moment';

class NewAppointment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: moment(),
      time: '08:00:00-00',
      purpose: '',
      doctor: '',
      showError: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDate = this.handleDate.bind(this)
    this.handleTime = this.handleTime.bind(this)
    this.handlePurpose = this.handlePurpose.bind(this)
    this.handleDoctor = this.handleDoctor.bind(this)
  }
  handleDate(date) {
    this.setState({ date: date })
  }
  handleDoctor(doctor) {
    this.setState({ doctor: doctor })
  }
  handleTime(time) {
    this.setState({ time: time })
  }
  handlePurpose(evt) {
    this.setState({ purpose: evt.target.value })
  }
  handleSubmit() {
    if (!this.props.isDoctor && (this.state.doctor === '' || this.state.date === null)) {
      this.setState({ showError: true })
    } else if (this.props.isDoctor && (this.state.date === null)) {
      this.setState({ showError: true })
    } else {
      let doctorId = (this.props.isDoctor) ? this.props.loggedInDoctorId : this.state.doctor
      this.props.requestAppointment(this.state.date, this.state.time, this.state.purpose, this.props.patientId, doctorId, this.props.isDoctor)
      this.setState({ date: moment(), time: '', purpose: '' })
      this.props.toggleModules(null, 'appointments')
    }
  }

  render() {
    return (
      <div>
        <Table celled columns="5">
          <Table.Header>
            <Table.Row textAlign="center">
              <Table.HeaderCell>Appointment Date</Table.HeaderCell>
              <Table.HeaderCell>Appointment Time</Table.HeaderCell>
              <Table.HeaderCell>Appointment Purpose</Table.HeaderCell>
              {!this.props.isDoctor && <Table.HeaderCell>Doctor</Table.HeaderCell>
              }
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row textAlign="center">
              <Table.Cell><DateSelector handleDate={this.handleDate} /></Table.Cell>
              <Table.Cell><TimeSelector handleTime={this.handleTime} /></Table.Cell>
              <Table.Cell><Input fluid placeholder="Purpose..." onChange={this.handlePurpose} value={this.state.purpose} /></Table.Cell>
              {!this.props.isDoctor &&
                <Table.Cell><DoctorSelector handleDoctor={this.handleDoctor} /></Table.Cell>}
              <Table.Cell textAlign="center"><Button onClick={this.handleSubmit}>Submit</Button></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <div>
          {this.state.showError &&
            <Message color='red' >
              <Message.Header>
                Date and Doctor are Required
            </Message.Header>
            </Message>
          }
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    allPatients: state.allPatients,
    loggedInDoctorId: state.loggedInDoctor.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    requestAppointment(date, time, purpose, patientId, doctorId, isDoctor) {
      if (isDoctor) dispatch(postNewApptFromDoc(date, time, purpose, patientId, doctorId))
      else dispatch(postNewApptFromPat(date, time, purpose, patientId, doctorId))
    }
  }
}

export default connect(mapState, mapDispatch)(NewAppointment)

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { postNewApptFromDoc } from '../store'
import { Input, Table, Button } from 'semantic-ui-react'
import { DateSelector, TimeSelector } from '../components'
import moment from 'moment';


class DocNewAppt extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: moment(),
      time: '',
      purpose: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDate = this.handleDate.bind(this)
    this.handleTime = this.handleTime.bind(this)
    this.handlePurpose = this.handlePurpose.bind(this)
  }

  handleDate(date){
    this.setState({date: date})
  }

  handleTime(time){
    this.setState({time: time})
  }

  handlePurpose(evt){
    this.setState({purpose: evt.target.value})
  }

  handleSubmit(){
    this.props.requestAppointment(this.state.date, this.state.time, this.state.purpose, this.props.patientId, this.props.loggedInDoctorId)
    this.props.showForm()
  }

  render(){
  return (
    <div>
      <Table celled>
      <Table.Header>
        <Table.Row textAlign="center">
          <Table.HeaderCell>Appointment Date</Table.HeaderCell>
          <Table.HeaderCell>Appointment Time</Table.HeaderCell>
          <Table.HeaderCell>Appointment Purpose</Table.HeaderCell>
          <Table.HeaderCell />
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row textAlign="center">
          <Table.Cell><DateSelector handleDate={this.handleDate} /></Table.Cell>
          <Table.Cell><TimeSelector handleTime={this.handleTime} /></Table.Cell>
          <Table.Cell><Input fluid placeholder="Purpose..." onChange={this.handlePurpose} value={this.state.purpose} /></Table.Cell>
          <Table.Cell textAlign="center"><Button onClick={this.handleSubmit}>Submit</Button></Table.Cell>
        </Table.Row>
      </Table.Body>
      </Table>
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
    requestAppointment(date, time, purpose, patientId, doctorId) {
      dispatch(postNewApptFromDoc(date, time, purpose, patientId, doctorId))
    }
  }
}

export default connect(mapState, mapDispatch)(DocNewAppt)

import React from 'react'
import { Table, Button } from 'semantic-ui-react'
import { cancelAppointment } from '../store'
import { connect } from 'react-redux'

const SingleAppointment = (props => {
  const { appointment, isDoctor, cancelAppt, showDeclineReason, doctors } = props
  const handleReason = (evt) => {
    showDeclineReason(evt.target.value, evt.target.name)
  }
  const date = appointment.date.slice(0, appointment.date.indexOf('T'))
  const month = date.slice(5, 7)
  const day = date.slice(-2)
  const year = date.slice(0, 4)
  const time = appointment.date.slice(appointment.date.indexOf('T') + 1, -8)
  let foundDoctor = doctors.find(doctor => doctor.id == appointment.doctorId)
  let doctorName = ''
  if (doctors.length > 0) doctorName = foundDoctor.name
  let hh = +time.slice(0, 2)
  let mm = time.slice(-2)
  let clock = 'AM'
  if (hh > 12) {
    hh -= 12
    clock = 'PM'
  } else if (hh === 12){
    clock = 'PM'
  }
  let button
  if (!isDoctor && appointment.status === 'UPCOMING' || appointment.status === 'PENDING') {
    button = <Button onClick={cancelAppt} value={appointment.id}>Cancel</Button>
  }
  if (isDoctor && appointment.status === 'PENDING') {
    button = <Button.Group>
      <Button value={false} name={appointment.id} onClick={handleReason}>Decline</Button>
      <Button.Or />
      <Button positive value={true} name={appointment.id} onClick={handleReason}>Accept</Button>
    </Button.Group>
  }
  return (
    <Table.Row key={appointment.id} textAlign='center'>
      <Table.Cell>{appointment.status}</Table.Cell>
      {!isDoctor &&
        <Table.Cell>{doctorName}</Table.Cell>}
      <Table.Cell>{appointment.purpose}</Table.Cell>
      <Table.Cell>{month + '-' + day + '-' + year}</Table.Cell>
      <Table.Cell>{hh + ':' + mm + ' ' + clock}</Table.Cell>
      <Table.Cell>{appointment.message}</Table.Cell>
      <Table.Cell>{button}</Table.Cell>
    </Table.Row>
  )
})

const mapState = (state) => {
  return {
    allPatients: state.allPatients,
    appointments: state.docSinglePatAppts,
    isDoctor: state.user.isDoctor
  }
}

const mapDispatch = (dispatch) => {
  return {
    cancelAppt(evt) {
      dispatch(cancelAppointment(+evt.target.value))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleAppointment)


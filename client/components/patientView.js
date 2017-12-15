import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { SinglePatient, AllDocuments, UploadDocuments, NewAppointment, AllAppointments } from '../components'
import { fetchSinglePatient } from '../store'

class PatientView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scheduleForm: false,
      moduleShowing: 'appointments'
    }
    this.toggleModules = this.toggleModules.bind(this)
  }

  componentDidMount() {
    const { user } = this.props
    this.props.loadInitialData(user.id)
  }
  toggleModules(evt, name) {
    let newView = (evt) ? evt.target.value : name
    let current = this.state.moduleShowing
    if (newView === current) this.setState({ moduleShowing: null })
    else this.setState({ moduleShowing: newView })
  }

  render() {
    const patient = this.props.loggedInPatient
    const user = this.props.user
    const isDoctor = this.props.isDoctor
    return (
      Object.keys(patient).length > 0 &&
      <div>
        <SinglePatient patient={patient} />
        <Button onClick={this.toggleModules} style={{ 'margin': '1em 1em 1em 0' }} value='appointments' >View Appointments</Button>
        <Button onClick={this.toggleModules} style={{ 'margin': '1em 1em 1em 0' }} value='documents' >Manage Documents</Button>
        <Button onClick={this.toggleModules} style={{ 'margin': '1em 1em 1em 0' }} value='upload' >Upload Documents</Button>
        <Button onClick={this.toggleModules} style={{ 'margin': '1em 1em 1em 0' }} value='scheduleForm' >Schedule New Appointment</Button>
        {this.state.moduleShowing === 'documents' &&
          <div>
            <AllDocuments patientId={patient.id} />
          </div>}
        {this.state.moduleShowing === 'upload' &&
          <UploadDocuments patientId={patient.id} toggleModules={this.toggleModules} />
        }
        {this.state.moduleShowing === 'scheduleForm' &&
          <div>
            <NewAppointment patientId={patient.id} toggleModules={this.toggleModules} isDoctor={isDoctor} />
          </div>
        }
        {this.state.moduleShowing === 'appointments' &&
          <AllAppointments
            patientId={patient.id}
            doctorId={user.id}
          />}
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    loggedInPatient: state.loggedInPatient,
    isDoctor: state.user.isDoctor
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData(userId) {
      dispatch(fetchSinglePatient(userId))
    }
  }
}

export default connect(mapState, mapDispatch)(PatientView)

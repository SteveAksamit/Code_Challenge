import React, { Component } from 'react'
import { Button, Accordion, Icon, Input } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { SinglePatient, AllAppointments, AllDocuments, UploadDocuments, DocNewAppt } from '../components'
import { fetchAllPatients, fetchAllApptsForDoc } from '../store'

class AllPatients extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: -1,
      inputValue: '',
      isDirty: false,
      scheduleForm: false,
      moduleShowing: 'appointments'
    }
    this.handleClick = this.handleClick.bind(this)
    this.filterChange = this.filterChange.bind(this)
    this.toggleModules = this.toggleModules.bind(this)
  }
  componentDidMount() {
    let doctorId = this.props.doctorId
    this.props.loadInitialData(doctorId)
  }

  filterChange(event) {
    this.setState({
      inputValue: event.target.value
    });
  }

  toggleModules(evt, name) {
    let newView = (evt) ? evt.target.value : name
    let current = this.state.moduleShowing
    if (newView === current) this.setState({ moduleShowing: null })
    else this.setState({ moduleShowing: newView })
  }

  handleClick(evt, titleProps) {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    this.setState({ activeIndex: newIndex, moduleShowing: 'appointments' })
  }

  render() {
    let regex = new RegExp(this.state.inputValue, 'i')
    let allPatients = this.props.allPatients.filter((patient) => {
      if (patient.fullName.match(regex)) {
        return patient
      }
    });
    const { user, docAllAppts } = this.props
    const { activeIndex } = this.state
    const apptCache = {}
    docAllAppts.forEach(appt => {
      let status = appt.status
      if (!apptCache.hasOwnProperty(appt.patientId)) {
        apptCache[appt.patientId] = {
          PAST: 0,
          UPCOMING: 0,
          PENDING: 0,
          DECLINED: 0,
          ACCEPTED: 0
        }
      }
      apptCache[appt.patientId][status]++
    })
    return (
      Object.keys(apptCache).length > 0 &&
      <div>
        <div style={{ display: 'flex', 'justifyContent': 'space-between' }}>
          <h3 style={{ 'padding': '0.5em 0 0.5em 1em' }}>Patients </h3>
          <Input focus placeholder='Search...' value={this.state.inputValue} onChange={this.filterChange} style={{ 'padding': '0 5em 0.5em 0' }} />
        </div>
        <div>
          <Accordion fluid styled >
            {allPatients.map((patient, i) => {
              let upcoming = (apptCache.hasOwnProperty(patient.id)) && apptCache[patient.id].UPCOMING > 0 ? ' -  Upcoming: ' + apptCache[patient.id].UPCOMING : ''
              let pending = (apptCache.hasOwnProperty(patient.id)) && apptCache[patient.id].PENDING > 0 ? ' /  Pending: ' + apptCache[patient.id].PENDING : ''
              let past = (apptCache.hasOwnProperty(patient.id)) && apptCache[patient.id].PAST > 0 ? ' /  Past: ' + apptCache[patient.id].PAST : ''
              return (
                <div key={patient.id}>
                  <Accordion.Title active={activeIndex === i} index={i} onClick={this.handleClick} >
                    <Icon name='dropdown' />
                    {patient.lastName + ', ' + patient.firstName + '' + upcoming + pending + past}
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === i}>
                    {activeIndex === i &&
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
                            <UploadDocuments patientId={patient.id} toggleModules={this.toggleModules}/>
                          }
                        {this.state.moduleShowing === 'scheduleForm' &&
                          <div>
                            <DocNewAppt patientId={patient.id} toggleModules={this.toggleModules}/>
                          </div>
                        }
                        {this.state.moduleShowing === 'appointments' &&
                          <AllAppointments
                            patientId={patient.id}
                            doctorId={user.id}
                            scheduleForm={this.state.scheduleForm}
                            activeIndex={activeIndex} i={i} />}
                      </div>
                    }
                  </Accordion.Content>
                </div>
              )
            })}
          </Accordion>
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    allPatients: state.allPatients,
    user: state.user,
    docAllAppts: state.docAllAppts
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData(doctorId) {
      dispatch(fetchAllPatients())
      dispatch(fetchAllApptsForDoc(doctorId))
    }
  }
}

export default connect(mapState, mapDispatch)(AllPatients)

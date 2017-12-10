import axios from 'axios'
import history from '../history'

/* ACTION TYPES*/
const GET_ALL_APPOINTMENTS_FOR_DOCTOR = 'GET_ALL_APPOINTMENTS_FOR_DOCTOR'
const GET_SINGLE_PATIENT_APPOINTMENTS_FOR_DOCTOR = 'GET_SINGLE_PATIENT_APPOINTMENTS_FOR_DOCTOR'
const GET_ALL_APPOINTMENTS_FOR_PATIENT = 'GET_ALL_APPOINTMENTS_FOR_PATIENT'
const NEW_APPOINTMENT_FROM_DOCTOR = 'NEW_APPOINTMENT_FROM_DOCTOR'
const NEW_APPOINTMENT_FROM_PATIENT = 'NEW_APPOINTMENT_FROM_PATIENT'
const DOCTOR_RESPONSE_TO_APPOINTMENT_REQUEST = 'DOCTOR_RESPONSE_TO_APPOINTMENT_REQUEST'
const CANCEL_APPOINTMENT = 'CANCEL_APPOINTMENT'

/* INITIAL STATE */
const appointments = {
  allAppointments: [],
  doctorsAppointments: []
}

/* ACTION CREATORS */
const getAllAppointmentsForDoctors = allDoctorsAppointments => ({ type: GET_ALL_APPOINTMENTS_FOR_DOCTOR, allDoctorsAppointments })
const getSinglePatientAppointmentsForDoctors = singlePatientFoundAppointments => ({ type: GET_SINGLE_PATIENT_APPOINTMENTS_FOR_DOCTOR, singlePatientFoundAppointments })
const getAllAppointmentsForPatient = allPatientsAppointments => ({ type: GET_ALL_APPOINTMENTS_FOR_PATIENT, allPatientsAppointments })
const newAppointmentFromDoctor = newDoctorAppointment => ({ type: NEW_APPOINTMENT_FROM_DOCTOR, newDoctorAppointment })
const newAppointmentFromPatient = newPatientAppointment => ({ type: NEW_APPOINTMENT_FROM_PATIENT, newPatientAppointment })
const doctorReponse = updatedAppointment => ({ type: NEW_APPOINTMENT_FROM_PATIENT, updatedAppointment })
const appointmentCancellation = cancelledAppointment => ({ type: CANCEL_APPOINTMENT, cancelledAppointment })


/* THUNK CREATORS */
export const fetchAllAppointmentsForDoctor = (doctorId) =>
  dispatch =>
    axios.get(`/api/appointments/doctor/allPatients/${doctorId}`)
      .then(res =>
        dispatch(getAllAppointmentsForDoctors(res.data))
      )
      .catch(err => console.log(err))

export const fetchSinglePatientAppointmentsForDoctor = (doctorId, patientId) =>
  dispatch =>
    axios.get(`/api/appointments/doctor/allPatients/${doctorId}/${patientId}`)
      .then(res =>
        dispatch(getSinglePatientAppointmentsForDoctors(res.data))
      )
      .catch(err => console.log(err))

export const fetchAllAppointmentsForPatient = (patientId) =>
  dispatch =>
    axios.get(`/api/patient/allPatients/${patientId}`)
      .then(res =>
        dispatch(getAllAppointmentsForPatient(res.data))
      )
      .catch(err => console.log(err))

export const postNewAppointmentFromDoctor = () =>
  dispatch =>
    axios.post('/api/appointments/doctor/newAppointment')
      .then(res =>
        dispatch(newAppointmentFromDoctor(res.data))
      )
      .catch(err => console.log(err))

export const postNewAppointmentFromPatient = () =>
  dispatch =>
    axios.post('/api/appointments/patient/newAppointment')
      .then(res =>
        dispatch(newAppointmentFromPatient(res.data))
      )
      .catch(err => console.log(err))

export const doctorAppointmentRequestResponse = (appointmentId, response) =>
  dispatch =>
    axios.delete(`/api/appointments/doctor/${response}/${appointmentId}`)
      .then(res =>
        dispatch(doctorReponse(res.data))
      )
      .catch(err => console.log(err))

export const cancelAppointment = (appointmentId) =>
  dispatch =>
    axios.delete(`/api/appointments/patient/cancel/${appointmentId}`)
      .then(res =>
        dispatch(appointmentCancellation(res.data))
      )
      .catch(err => console.log(err))

/* REDUCER */
export default function (state = appointments, action) {
  switch (action.type) {
    case GET_ALL_APPOINTMENTS_FOR_DOCTOR:
      return Object.assign({}, state, { allAppointments: action.allDoctorsAppointments })
    case GET_SINGLE_PATIENT_APPOINTMENTS_FOR_DOCTOR:
      return Object.assign({}, state, { doctorsPatientAppointments: action.allDoctorsAppointments })
    case GET_ALL_APPOINTMENTS_FOR_PATIENT:
      return Object.assign({}, state, { allAppointments: action.allPatientsAppointments })
    case NEW_APPOINTMENT_FROM_DOCTOR:
      return Object.assign({}, state, { allAppointments: state.allAppointments.concat(action.newDoctorAppointment) })
    case NEW_APPOINTMENT_FROM_PATIENT:
      return Object.assign({}, state, { allAppointments: state.allAppointments.concat(action.newPatientAppointment) })
    case DOCTOR_RESPONSE_TO_APPOINTMENT_REQUEST:
      state.doctorsAppointments.forEach((appointment, i) => {
        if (appointment.id == action.updatedAppointment.id) {
          state.allAppointments[i].status = action.updatedAppointment.status;
        }
      });
      return state
    case CANCEL_APPOINTMENT:
      state.doctorsAppointments.forEach((appointment, i) => {
        if (appointment.id == action.cancelledAppointment.id) {
          state.allAppointments.splice(i, 1);
        }
      });
      return state
    default:
      return state
  }
}

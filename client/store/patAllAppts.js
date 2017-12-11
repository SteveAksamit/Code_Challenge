import axios from 'axios'
import history from '../history'

/* ACTION TYPES*/
const GET_ALL_APPOINTMENTS_FOR_PATIENT = 'GET_ALL_APPOINTMENTS_FOR_PATIENT'
const NEW_APPOINTMENT_FROM_PATIENT = 'NEW_APPOINTMENT_FROM_PATIENT'
const CANCEL_APPOINTMENT = 'CANCEL_APPOINTMENT'

/* INITIAL STATE */
const patAllAppts = []

/* ACTION CREATORS */
const getAllAppointmentsForPatient = allPatsAppts => ({ type: GET_ALL_APPOINTMENTS_FOR_PATIENT, allPatsAppts })
const newAppointmentFromPatient = newPatAppt => ({ type: NEW_APPOINTMENT_FROM_PATIENT, newPatAppt })
const appointmentCancellation = cancelledAppt => ({ type: CANCEL_APPOINTMENT, cancelledAppt })

/* THUNK CREATORS */
export const fetchAllAppointmentsForPatient = (patientId) =>
  dispatch =>
    axios.get(`/api/patientAppointments/allPatients/${patientId}`)
      .then(res =>
        dispatch(getAllAppointmentsForPatient(res.data))
      )
      .catch(err => console.log(err))

export const postNewAppointmentFromPatient = () =>
  dispatch =>
    axios.post('/api/patientAppointments/newAppointment')
      .then(res =>
        dispatch(newAppointmentFromPatient(res.data))
      )
      .catch(err => console.log(err))

export const cancelAppointment = (appointmentId) =>
  dispatch =>
    axios.delete(`/api/patientAppointments/patient/cancel/${appointmentId}`)
      .then(res =>
        dispatch(appointmentCancellation(res.data))
      )
      .catch(err => console.log(err))

/* REDUCER */
export default function (state = patAllAppts, action) {
  let index;
  switch (action.type) {
    case GET_ALL_APPOINTMENTS_FOR_PATIENT:
      return action.allPatsAppts
    case NEW_APPOINTMENT_FROM_PATIENT:
      return [...state, action.newPatAppt]
    case CANCEL_APPOINTMENT:
      state.forEach((appt, i) => {
        if (appt.id == action.updatedAppt) index = i
      })
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ]
    default:
      return state
  }
}

import axios from 'axios'
import history from '../history'

/* ACTION TYPES*/
const GET_ALL_APPTS_FOR_PAT = 'GET_ALL_APPTS_FOR_PAT'
const NEW_APPT_FROM_PAT = 'NEW_APPT_FROM_PAT'
const CANCEL_APPT = 'CANCEL_APPT'

/* INITIAL STATE */
const patAllAppts = []

/* ACTION CREATORS */
const getAllApptsForPat = allPatsAppts => ({ type: GET_ALL_APPTS_FOR_PAT, allPatsAppts })
const newApptFromPat = newPatAppt => ({ type: NEW_APPT_FROM_PAT, newPatAppt })
const appointmentCancellation = cancelledAppt => ({ type: CANCEL_APPT, cancelledAppt })

/* THUNK CREATORS */
export const fetchAllApptsForPat = (patientId) =>
  dispatch =>
    axios.get(`/api/patientAppointments/allPatients/${patientId}`)
      .then(res =>
        dispatch(getAllApptsForPat(res.data))
      )
      .catch(err => console.log(err))

export const postNewApptFromPat = (date, time, purpose, patientId, doctorId) =>
  dispatch =>
    axios.post('/api/patientAppointments/newAppointment', {date, time, purpose, patientId, doctorId})
      .then(res =>
        dispatch(newApptFromPat(res.data))
      )
      .catch(err => console.log(err))

export const cancelAppointment = (appointmentId) =>
  dispatch =>
    axios.put(`/api/patientAppointments/patient/cancel/${appointmentId}`)
      .then(res =>{
        dispatch(appointmentCancellation(res.data))
      })
      .catch(err => console.log(err))

/* REDUCER */
export default function (state = patAllAppts, action) {
  let index;
  switch (action.type) {
    case GET_ALL_APPTS_FOR_PAT:
      return action.allPatsAppts
    case NEW_APPT_FROM_PAT:
      return [...state, action.newPatAppt]
    case CANCEL_APPT:
      state.forEach((appt, i) => {
        if (appt.id == action.cancelledAppt.id) index = i
      })
      return [
        ...state.slice(0, index),
        action.cancelledAppt,
        ...state.slice(index + 1)
      ]
    default:
      return state
  }
}

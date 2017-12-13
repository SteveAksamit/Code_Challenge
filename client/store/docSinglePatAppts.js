import axios from 'axios'
import history from '../history'

/* ACTION TYPES*/
const GET_SINGLE_PAT_APPTS_FOR_DOC = 'GET_SINGLE_PAT_APPTS_FOR_DOC'
const NEW_APPT_FROM_DOC = 'NEW_APPT_FROM_DOC'
const DOC_RESPONSE_TO_APPT_REQUEST = 'DOC_RESPONSE_TO_APPT_REQUEST'

/* INITIAL STATE */
const docSinglePatAppts = []

/* ACTION CREATORS */
const getSinglePatApptsForDoc = singlePatFoundAppts => ({ type: GET_SINGLE_PAT_APPTS_FOR_DOC, singlePatFoundAppts })
const newApptFromDoc = newDocAppt => ({ type: NEW_APPT_FROM_DOC, newDocAppt })
const doctorReponse = updatedAppt => ({ type: DOC_RESPONSE_TO_APPT_REQUEST, updatedAppt })

/* THUNK CREATORS */
export const fetchSinglePatApptsForDoc = (doctorId, patientId) =>
  dispatch =>
    axios.get(`/api/doctorAppointments/singlePatient/${doctorId}/${patientId}`)
      .then(res =>
        dispatch(getSinglePatApptsForDoc(res.data))
      )
      .catch(err => console.log(err))

export const postNewApptFromDoc = (date, patientId, purpose) =>
  dispatch =>
    axios.post('/api/appointments/doctor/newAppointment', {dateTime, patientId, purpose})
      .then(res =>
        dispatch(newApptFromDoc(res.data))
      )
      .catch(err => console.log(err))

export const docApptRequestResponse = (response, appointmentId, message) =>
  dispatch =>
    axios.put(`/api/doctorAppointments/${response}/${appointmentId}`, {message})
      .then(res =>
        dispatch(doctorReponse(res.data))
      )
      .catch(err => console.log(err))

/* REDUCER */
export default function (state = docSinglePatAppts, action) {
  let index;
  switch (action.type) {
    case GET_SINGLE_PAT_APPTS_FOR_DOC:
      return action.singlePatFoundAppts
    case NEW_APPT_FROM_DOC:
      return [...state, action.newDocAppt]
    case DOC_RESPONSE_TO_APPT_REQUEST:
      state.forEach((appt, i) => {
        if (appt.id == action.updatedAppt.id) index = i
      })
      return [
        ...state.slice(0, index),
        action.updatedAppt,
        ...state.slice(index + 1)
      ]
    default:
      return state
  }
}

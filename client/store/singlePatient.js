import axios from 'axios'
import history from '../history'

/* ACTION TYPES*/
const GET_SINGLE_PATIENT = 'GET_SINGLE_PATIENT'

/* INITIAL STATE */
const singlePatient = {}

/* ACTION CREATORS */
const getSinglePatient = foundPatient => ({type: GET_SINGLE_PATIENT, foundPatient})

/* THUNK CREATORS */
export const fetchSinglePatient = (patientId) =>
  dispatch =>
    axios.get(`/api/patients/singlePatient/${patientId}`)
      .then(res =>
        dispatch(getSinglePatient(res.data))
      )
      .catch(err => console.log(err))

/* REDUCER */
export default function (state = singlePatient, action) {
  switch (action.type) {
    case GET_SINGLE_PATIENT:
      return action.foundPatient
    default:
      return state
  }
}

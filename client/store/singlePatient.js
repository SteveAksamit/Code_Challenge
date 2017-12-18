import axios from 'axios'

/* ACTION TYPES*/
const GET_SINGLE_PATIENT = 'GET_SINGLE_PATIENT'

/* INITIAL STATE */
const loggedInPatient = {}

/* ACTION CREATORS */
const getSinglePatient = foundPatient => ({ type: GET_SINGLE_PATIENT, foundPatient })

/* THUNK CREATORS */
export const fetchSinglePatient = (userId) =>
  dispatch =>
    axios.get(`/api/patients/singlePatient/${userId}`)
      .then(res =>
        dispatch(getSinglePatient(res.data))
      )
      .catch(err => console.log(err))

/* REDUCER */
export default function (state = loggedInPatient, action) {
  switch (action.type) {
    case GET_SINGLE_PATIENT:
      return action.foundPatient
    default:
      return state
  }
}

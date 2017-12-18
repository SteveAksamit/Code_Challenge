import axios from 'axios'

/* ACTION TYPES*/
const GET_ALL_PATIENTS = 'GET_PATIENTS'

/* INITIAL STATE */
const allPatients = []

/* ACTION CREATORS */
const getAllPatients = foundPatients => ({ type: GET_ALL_PATIENTS, foundPatients })

/* THUNK CREATORS */
export const fetchAllPatients = () =>
  dispatch =>
    axios.get('/api/patients')
      .then(res =>
        dispatch(getAllPatients(res.data))
      )
      .catch(err => console.log(err))

/* REDUCER */
export default function (state = allPatients, action) {
  switch (action.type) {
    case GET_ALL_PATIENTS:
      return action.foundPatients
    default:
      return state
  }
}

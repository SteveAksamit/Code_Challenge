import axios from 'axios'
import history from '../history'

/* ACTION TYPES*/
const GET_DOCTORS = 'GET_DOCTORS'

/* INITIAL STATE */
const doctors = []

/* ACTION CREATORS */
const getDoctors = foundDoctors => ({ type: GET_DOCTORS, foundDoctors })

/* THUNK CREATORS */
export const fetchDoctors = () =>
  dispatch =>
    axios.get('/api/doctors')
      .then(res =>
        dispatch(getDoctors(res.data))
      )
      .catch(err => console.log(err))

/* REDUCER */
export default function (state = doctors, action) {
  switch (action.type) {
    case GET_DOCTORS:
      return action.foundDoctors
    default:
      return state
  }
}

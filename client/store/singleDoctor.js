import axios from 'axios'
import history from '../history'

/* ACTION TYPES*/
const GET_SINGLE_DOCTOR = 'GET_SINGLE_DOCTOR'

/* INITIAL STATE */
const loggedInDoctor = {}

/* ACTION CREATORS */
const getSingleDoctor = foundDoctor => ({ type: GET_SINGLE_DOCTOR, foundDoctor })

/* THUNK CREATORS */
export const fetchSingleDoctor = (userId) =>
  dispatch =>
    axios.get(`/api/doctors/singleDoctor/${userId}`)
      .then(res =>
        dispatch(getSingleDoctor(res.data))
      )
      .catch(err => console.log(err))

/* REDUCER */
export default function (state = loggedInDoctor, action) {
  switch (action.type) {
    case GET_SINGLE_DOCTOR:
      return action.foundDoctor
    default:
      return state
  }
}

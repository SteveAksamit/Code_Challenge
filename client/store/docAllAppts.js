import axios from 'axios'
import history from '../history'

/* ACTION TYPES*/
const GET_ALL_APPTS_FOR_DOC = 'GET_ALL_APPTS_FOR_DOC'

/* INITIAL STATE */
const doctorAllApps = []

/* ACTION CREATORS */
const getAllApptsForDocs = allDocsAppts => ({ type: GET_ALL_APPTS_FOR_DOC, allDocsAppts })

/* THUNK CREATORS */
export const fetchAllApptsForDoc = (doctorId) =>
  dispatch =>
    axios.get(`/api/doctorAppointments/allPatients/${doctorId}`)
      .then(res =>
        dispatch(getAllApptsForDocs(res.data))
      )
      .catch(err => console.log(err))

/* REDUCER */
export default function (state = doctorAllApps, action) {
  switch (action.type) {
    case GET_ALL_APPTS_FOR_DOC:
      return action.allDocsAppts
    default:
      return state
  }
}

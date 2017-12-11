import axios from 'axios'
import history from '../history'

/* ACTION TYPES*/
const GET_DOCUMENTS = 'GET_DOCUMENTS'
const DELETE_DOCUMENT = 'DELETE_DOCUMENT'
const UPLOAD_DOCUMENT = 'UPLOAD_DOCUMENT'

/* INITIAL STATE */
const documents = []

/* ACTION CREATORS */
const getDocuments = foundDocuments => ({ type: GET_DOCUMENTS, foundDocuments })
const deleteDocument = deletedDocument => ({ type: DELETE_DOCUMENT, deletedDocument })
const uploadDocuments = newDocument => ({ type: UPLOAD_DOCUMENT, newDocument })

/* THUNK CREATORS */
export const fetchDocuments = (patientId) =>
  dispatch =>
    axios.get(`/api/documents/${patientId}`)
      .then(res =>
        dispatch(getDocuments(res.data))
      )
      .catch(err => console.log(err))

export const removeDocument = (patientId) =>
  dispatch =>
    axios.delete(`/api/documents/${patientId}`)
      .then(res =>
        dispatch(deleteDocument(res.data))
      )
      .catch(err => console.log(err))

export const postDocument = (patientId) =>
  dispatch =>
    axios.post(`/api/documents/${patientId}`)
      .then(res =>
        dispatch(uploadDocuments(res.data))
      )
      .catch(err => console.log(err))

/* REDUCER */
export default function (state = documents, action) {
  let index;
  switch (action.type) {
    case GET_DOCUMENTS:
      return action.documents
    case DELETE_DOCUMENT:
      state.documents.forEach((singleDocument, i) => {
        if (singleDocument.id == action.deletedDocument.id) {
          state.documents.splice(i, 1);
        }
      });
      return state
    case UPLOAD_DOCUMENT:
      state.forEach((singleDocument, i) => {
        if (singleDocument.id == action.newDocument.id) index = i
      })
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ]
    default:
      return state
  }
}

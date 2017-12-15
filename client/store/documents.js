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
const deleteDocument = deletedDocumentId => ({ type: DELETE_DOCUMENT, deletedDocumentId })
const uploadDocuments = newDocument => ({ type: UPLOAD_DOCUMENT, newDocument })

/* THUNK CREATORS */
export const fetchDocuments = (patientId) =>
  dispatch =>
    axios.get(`/api/documents/${patientId}`)
      .then(res =>
        dispatch(getDocuments(res.data))
      )
      .catch(err => console.log(err))

export const removeDocument = (documentId) =>
  dispatch =>
    axios.delete(`/api/documents/${documentId}`)
      .then(res =>
        dispatch(deleteDocument(res.data))
      )
      .catch(err => console.log(err))

export const uploadDocument = ({ file, name, patientId, title }) => {
  let data = new FormData();
  data.append('file', file);
  data.append('name', name);
  return (dispatch) => {
    axios.post('/api/documents/upload/', data)
      .then(res => {
        let fileName = res.data
        return axios.post('/api/documents/record', { fileName, patientId, title })
      })
      .then(res =>
        dispatch(uploadDocuments(res.data))
      )
      .catch(err => console.log(err))
  }
}

/* REDUCER */
export default function (state = documents, action) {
  let index;
  switch (action.type) {
    case GET_DOCUMENTS:
      return action.foundDocuments
    case DELETE_DOCUMENT:
      state.forEach((singleDocument, i) => {
        if (singleDocument.id == action.deletedDocumentId) {
          index = i
        }
      });
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ]
    case UPLOAD_DOCUMENT:
      return [...state, action.newDocument]
    default:
      return state
  }
}

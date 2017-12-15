import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import doctors from './allDoctors'
import allPatients from './allPatients'
import docSinglePatAppts from './docSinglePatAppts'
import docAllAppts from './docAllAppts'
import patAllAppts from './patAllAppts'
import documents from './documents'
import loggedInDoctor from './singleDoctor'
import loggedInPatient from './singlePatient'

const reducer = combineReducers({user, doctors, allPatients, loggedInPatient, docSinglePatAppts, docAllAppts, patAllAppts, documents, loggedInDoctor})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './allDoctors'
export * from './allPatients'
export * from './singlePatient'
export * from './patAllAppts'
export * from './docAllAppts'
export * from './docSinglePatAppts'
export * from './documents'
export * from './singleDoctor'

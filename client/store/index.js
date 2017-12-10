import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import doctors from './doctors'
import allPatients from './allPatients'
import singlePatient from './singlePatient'
import appointments from './appointments'
import documents from './documents'

const reducer = combineReducers({user, doctors, allPatients, singlePatient, appointments, documents})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './doctors'
export * from './allPatients'
export * from './singlePatient'
export * from './appointments'
export * from './documents'

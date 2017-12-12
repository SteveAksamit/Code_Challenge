/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Main} from './main'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as AllPatients} from './allPatients'
export {default as SinglePatient} from './singlePatient'
export {default as docNewAppt} from './docNewAppt'
export {default as patNewAppt} from './patNewAppt'

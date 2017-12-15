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
export {default as DocNewAppt} from './docNewAppt'
export {default as PatNewAppt} from './patNewAppt'
export {default as DoctorView} from './doctorView'
export {default as AllAppointments} from './allAppointments'
export {default as SingleAppointment} from './singleAppointment'
export {default as DateSelector} from './dateSelector'
export {default as TimeSelector} from './timeSelector'
export {default as AllDocuments} from './allDocuments'
export {default as SingleDocument} from './singleDocument'
export {default as ViewDocument} from './viewDocument'
export {default as UploadDocuments} from './uploadDocuments'

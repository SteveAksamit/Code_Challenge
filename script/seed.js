const db = require('../server/db')
const {User, Patient, Doctor, Appointment, Document} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({id: 1, email: 'janderson@email.com', username: 'janderson', password: '123', isDoctor: true, isPatient: false}),
    User.create({id: 2, email: 'kmiller@email.com', username: 'kmiller', password: '123', isDoctor: true, isPatient: false}),
    User.create({id: 3, email: 'ajohnson@email.com', username: 'ajohnson', password: '123', isDoctor: true, isPatient: false}),
    User.create({id: 4, email: 'mthompson@email.com', username: 'mthompson', password: '123', isDoctor: true, isPatient: false}),
    User.create({id: 5, email: 'dkelley@email.com', username: 'dkelley', password: '123', isDoctor: false, isPatient: true}),
    User.create({id: 6, email: 'sjordan@email.com', username: 'saksamit', password: '123', isDoctor: false, isPatient: true}),
    User.create({id: 7, email: 'nguilfoyle@email.com', username: 'nguilfoyle', password: '123', isDoctor: false, isPatient: true}),
    User.create({id: 8, email: 'mlopotko@email.com', username: 'mlopotko', password: '123', isDoctor: false, isPatient: true}),
    User.create({id: 9, email: 'jemanuel@email.com', username: 'jemanuel', password: '123', isDoctor: false, isPatient: true}),
    User.create({id: 10, email: 'rpeters@email.com', username: 'rpeters', password: '123', isDoctor: false, isPatient: true}),
  ])

  const doctors = await Promise.all([
    Doctor.create({id: 1, name: 'Julie Anderson', userId: 1}),
    Doctor.create({id: 2, name: 'Katie Miller', userId: 2}),
    Doctor.create({id: 3, name: 'Andrea Johnon', userId: 3}),
    Doctor.create({id: 4, name: 'Matt Thompson', userId: 4}),
  ])

  const patients = await Promise.all([
    Patient.create({id: 1, firstName: 'Diane', lastName:  'Kelley', dateOfBirth: '1941-04-17', address: '123 Main Street', city: 'Chicago', state: 'IL', zip: '60610', phoneNumber: '312-111-2222', userId: 5}),
    Patient.create({id: 2, firstName: 'Steve', lastName: 'Jordan', dateOfBirth: '1951-05-18', address: '123 Madison Avenue', city: 'Chicago', state: 'IL', zip: '60610', phoneNumber: '773-111-8888', userId: 6}),
    Patient.create({id: 3, firstName: 'Nancy', lastName: 'Guilfoyle', dateOfBirth: '1961-06-19', address: '123 Michigan Avenue', city: 'Chicago', state: 'IL', zip: '60610', phoneNumber: '773-888-0000', userId: 7}),
    Patient.create({id: 4, firstName: 'Mark', lastName: 'Lopotko', dateOfBirth: '1971-07-20', address: '123 LaSalle Avenue', city: 'Chicago', state: 'IL', zip: '60610', phoneNumber: '312-444-7777', userId: 8}),
    Patient.create({id: 5, firstName: 'Janine', lastName: 'Emanuel', dateOfBirth: '1981-08-21', address: '123 Huron Street', city: 'Chicago', state: 'IL', zip: '60610', phoneNumber: '773-555-9999', userId: 9}),
    Patient.create({id: 6, firstName: 'Ronald', lastName: 'Peters', dateOfBirth: '1991-09-22', address: '123 Superior Street', city: 'Chicago', state: 'IL', zip: '60610', phoneNumber: '312-333-4444', userId: 10})
  ])

  const documents = await Promise.all([
    Document.create({title: 'Patient File 1', fileName: 'file1.pdf', patientId: 1, remoteDocumentId: '1a', dateAdded: '2017-12-09'}),
    Document.create({title: 'Patient File 2', fileName: 'file2.pdf', patientId: 1, remoteDocumentId: '2a', dateAdded: '2017-12-09'}),
    Document.create({title: 'Patient File 3', fileName: 'file3.pdf', patientId: 2, remoteDocumentId: '3a', dateAdded: '2017-12-09'}),
    Document.create({title: 'Patient File 4', fileName: 'file4.pdf', patientId: 3, remoteDocumentId: '4a', dateAdded: '2017-12-09'}),
    Document.create({title: 'Patient File 5', fileName: 'file5.pdf', patientId: 4, remoteDocumentId: '5a', dateAdded: '2017-12-09'}),
    Document.create({title: 'Patient File 6', fileName: 'file6.pdf', patientId: 5, remoteDocumentId: '6a', dateAdded: '2017-12-09'})
  ])

  const appointments = await Promise.all([
    Appointment.create({date: '2017-11-30 12:30:00.000-06', purpose: 'Annual Check-up', status: 'PAST', doctorId: 1, patientId: 1}),
    Appointment.create({date: '2017-11-30 12:30:00.000-06', purpose: 'Annual Check-up', status: 'PAST', doctorId: 2, patientId: 2}),
    Appointment.create({date: '2017-11-30 12:30:00.000-06', purpose: 'Annual Check-up', status: 'PAST', doctorId: 3, patientId: 3}),
    Appointment.create({date: '2017-11-30 12:30:00.000-06', purpose: 'Annual Check-up', status: 'PAST', doctorId: 4, patientId: 4}),
    Appointment.create({date: '2018-01-15 12:30:00.000-06', purpose: 'Annual Check-up', status: 'UPCOMING', doctorId: 1, patientId: 1}),
    Appointment.create({date: '2018-01-15 12:30:00.000-06', purpose: 'Annual Check-up', status: 'UPCOMING', doctorId: 2, patientId: 2}),
    Appointment.create({date: '2018-01-15 12:30:00.000-06', purpose: 'Annual Check-up', status: 'UPCOMING', doctorId: 2, patientId: 5}),
    Appointment.create({date: '2018-01-15 12:30:00.000-06', purpose: 'Annual Check-up', status: 'UPCOMING', doctorId: 3, patientId: 6}),
    Appointment.create({date: '2018-01-15 12:30:00.000-06', purpose: 'Annual Check-up', status: 'PENDING', doctorId: 1, patientId: 1}),
    Appointment.create({date: '2018-01-15 12:30:00.000-06', purpose: 'Annual Check-up', status: 'PENDING', doctorId: 2, patientId: 2}),
    Appointment.create({date: '2018-01-15 12:30:00.000-06', purpose: 'Annual Check-up', status: 'DECLINED', doctorId: 1, patientId: 5}),
    Appointment.create({date: '2018-01-15 12:30:00.000-06', purpose: 'Annual Check-up', status: 'DECLINED', doctorId: 2, patientId: 6}),
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${patients.length} patients`)
  console.log(`seeded ${doctors.length} doctors`)
  console.log(`seeded ${documents.length} documents`)
  console.log(`seeded ${appointments.length} appointments`)
  console.log(`seeded successfully`)
}

seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

console.log('seeding...')

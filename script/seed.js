const db = require('../server/db')
const {User, Patient, Doctor, Appointment, Document} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({id: 1, email: 'testdoctor@email.com', username: 'doctor', password: '123', isDoctor: true, isPatient: false}),
    User.create({id: 2, email: 'kmiller@email.com', username: 'kmiller', password: '123', isDoctor: true, isPatient: false}),
    User.create({id: 3, email: 'ajohnson@email.com', username: 'ajohnson', password: '123', isDoctor: true, isPatient: false}),
    User.create({id: 4, email: 'mthompson@email.com', username: 'mthompson', password: '123', isDoctor: true, isPatient: false}),
    User.create({id: 5, email: 'testpatient@email.com', username: 'patient', password: '123', isDoctor: false, isPatient: true}),
    User.create({id: 6, email: 'sjordan@email.com', username: 'saksamit', password: '123', isDoctor: false, isPatient: true}),
    User.create({id: 7, email: 'nguilfoyle@email.com', username: 'nguilfoyle', password: '123', isDoctor: false, isPatient: true}),
    User.create({id: 8, email: 'mlopotko@email.com', username: 'mlopotko', password: '123', isDoctor: false, isPatient: true}),
    User.create({id: 9, email: 'jemanuel@email.com', username: 'jemanuel', password: '123', isDoctor: false, isPatient: true}),
    User.create({id: 10, email: 'rzimmerman@email.com', username: 'rzimmerman', password: '123', isDoctor: false, isPatient: true}),
    User.create({id: 11, email: 'jdavis@email.com', username: 'jdavis', password: '123', isDoctor: false, isPatient: true}),
    User.create({id: 12, email: 'kboscoe@email.com', username: 'kboscoe', password: '123', isDoctor: false, isPatient: true}),
    User.create({id: 13, email: 'maxios@email.com', username: 'maxios', password: '123', isDoctor: false, isPatient: true}),
    User.create({id: 14, email: 'dleadaman@email.com', username: 'dleadaman', password: '123', isDoctor: false, isPatient: true})
  ])

  const doctors = await Promise.all([
    Doctor.create({id: 1, name: 'Test Doctor', userId: 1}),
    Doctor.create({id: 2, name: 'Katie Miller', userId: 2}),
    Doctor.create({id: 3, name: 'Andrea Johnon', userId: 3}),
    Doctor.create({id: 4, name: 'Matt Thompson', userId: 4}),
  ])

  const patients = await Promise.all([
    Patient.create({id: 1, firstName: 'Test', lastName:  'Apatient', dateOfBirth: '1941-04-17', address: '123 Main Street', city: 'Chicago', state: 'IL', zip: '60610', phoneNumber: '312-111-2222', userId: 5}),
    Patient.create({id: 2, firstName: 'Steve', lastName: 'Jordan', dateOfBirth: '1951-05-18', address: '123 Madison Avenue', city: 'Chicago', state: 'IL', zip: '60610', phoneNumber: '773-111-8888', userId: 6}),
    Patient.create({id: 3, firstName: 'Nancy', lastName: 'Guilfoyle', dateOfBirth: '1961-06-19', address: '123 Michigan Avenue', city: 'Chicago', state: 'IL', zip: '60610', phoneNumber: '773-888-0000', userId: 7}),
    Patient.create({id: 4, firstName: 'Mark', lastName: 'Lopotko', dateOfBirth: '1971-07-20', address: '123 LaSalle Avenue', city: 'Chicago', state: 'IL', zip: '60610', phoneNumber: '312-444-7777', userId: 8}),
    Patient.create({id: 5, firstName: 'Janine', lastName: 'Emanuel', dateOfBirth: '1981-08-21', address: '123 Huron Street', city: 'Chicago', state: 'IL', zip: '60610', phoneNumber: '773-555-9988', userId: 9}),
    Patient.create({id: 6, firstName: 'Ronald', lastName: 'Zimmerman', dateOfBirth: '1991-09-22', address: '123 Superior Street', city: 'Chicago', state: 'IL', zip: '60610', phoneNumber: '312-123-4455', userId: 10}),
    Patient.create({id: 7, firstName: 'Jim', lastName: 'Davis', dateOfBirth: '1991-09-22', address: '123 Maple Street', city: 'Chicago', state: 'IL', zip: '60610', phoneNumber: '773-333-2323', userId: 11}),
    Patient.create({id: 8, firstName: 'Kenny', lastName: 'Boscoe', dateOfBirth: '1991-09-22', address: '123 Clark Street', city: 'Chicago', state: 'IL', zip: '60610', phoneNumber: '312-333-4567', userId: 12}),
    Patient.create({id: 9, firstName: 'Marie', lastName: 'Axios', dateOfBirth: '1991-09-22', address: '123 Addison Street', city: 'Chicago', state: 'IL', zip: '60610', phoneNumber: '312-333-7654', userId: 13}),
    Patient.create({id: 10, firstName: 'Dave', lastName: 'Leadaman', dateOfBirth: '1991-09-22', address: '123 Oak Street', city: 'Chicago', state: 'IL', zip: '60610', phoneNumber: '312-333-7676', userId: 14})
  ])

  const documents = await Promise.all([
    Document.create({title: 'Patient File 1', fileName: 'file1.pdf', patientId: 1, dateAdded: '2017-12-12'}),
    Document.create({title: 'Patient File 2', fileName: 'file2.pdf', patientId: 1, dateAdded: '2017-12-12'}),
    Document.create({title: 'Patient File 3', fileName: 'file3.pdf', patientId: 2, dateAdded: '2017-12-12'}),
    Document.create({title: 'Patient File 4', fileName: 'file4.pdf', patientId: 2, dateAdded: '2017-12-12'}),
    Document.create({title: 'Patient File 5', fileName: 'file5.pdf', patientId: 3, dateAdded: '2017-12-12'}),
    Document.create({title: 'Patient File 6', fileName: 'file6.pdf', patientId: 3, dateAdded: '2017-12-12'}),
    Document.create({title: 'Patient File 7', fileName: 'file7.pdf', patientId: 3, dateAdded: '2017-12-12'}),
    Document.create({title: 'Patient File 8', fileName: 'file8.pdf', patientId: 4, dateAdded: '2017-12-12'}),
    Document.create({title: 'Patient File 9', fileName: 'file9.pdf', patientId: 9, dateAdded: '2017-12-12'}),
    Document.create({title: 'Patient File 10', fileName: 'file10.pdf', patientId: 9, dateAdded: '2017-12-12'})
  ])

  const appointments = await Promise.all([
    Appointment.create({date: '2017-11-30 02:30:00.000-06', purpose: 'Annual Check-up', status: 'PAST', doctorId: 1, patientId: 1}),
    Appointment.create({date: '2017-11-30 03:30:00.000-06', purpose: 'Check-up', status: 'PAST', doctorId: 1, patientId: 2}),
    Appointment.create({date: '2017-11-30 04:00:00.000-06', purpose: 'Check-up', status: 'PAST', doctorId: 1, patientId: 5}),
    Appointment.create({date: '2018-01-07 05:30:00.000-06', purpose: 'Check-up', status: 'UPCOMING', doctorId: 1, patientId: 3}),
    Appointment.create({date: '2017-11-30 05:30:00.000-06', purpose: 'Check-up', status: 'PAST', doctorId: 1, patientId: 9}),
    Appointment.create({date: '2018-01-15 07:00:00.000-06', purpose: 'Check-up', status: 'UPCOMING', doctorId: 1, patientId: 1}),
    Appointment.create({date: '2018-01-16 07:00:00.000-06', purpose: 'Check-up', status: 'UPCOMING', doctorId: 2, patientId: 2}),
    Appointment.create({date: '2018-01-17 05:30:00.000-06', purpose: 'Check-up', status: 'UPCOMING', doctorId: 2, patientId: 5}),
    Appointment.create({date: '2018-01-18 08:30:00.000-06', purpose: 'Check-up', status: 'UPCOMING', doctorId: 3, patientId: 6}),
    Appointment.create({date: '2018-01-19 10:30:00.000-06', purpose: 'Check-up', status: 'PENDING', doctorId: 1, patientId: 1}),
    Appointment.create({date: '2018-01-20 10:30:00.000-06', purpose: 'Check-up', status: 'PENDING', doctorId: 1, patientId: 1}),
    Appointment.create({date: '2018-01-21 10:30:00.000-06', purpose: 'Check-up', status: 'DECLINED', doctorId: 1, patientId: 5}),
    Appointment.create({date: '2018-01-22 05:30:00.000-06', purpose: 'Check-up', status: 'DECLINED', doctorId: 2, patientId: 6}),
    Appointment.create({date: '2018-01-18 04:30:00.000-06', purpose: 'Check-up', status: 'UPCOMING', doctorId: 1, patientId: 6}),
    Appointment.create({date: '2018-01-20 03:30:00.000-06', purpose: 'Check-up', status: 'UPCOMING', doctorId: 1, patientId: 2}),
    Appointment.create({date: '2018-01-21 04:30:00.000-06', purpose: 'Check-up', status: 'UPCOMING', doctorId: 1, patientId: 5}),
    Appointment.create({date: '2018-01-22 05:30:00.000-06', purpose: 'Check-up', status: 'UPCOMING', doctorId: 1, patientId: 7}),
    Appointment.create({date: '2018-01-18 05:30:00.000-06', purpose: 'Check-up', status: 'UPCOMING', doctorId: 1, patientId: 9}),
    Appointment.create({date: '2018-01-19 07:00:00.000-06', purpose: 'Check-up', status: 'PENDING', doctorId: 1, patientId: 9}),
    Appointment.create({date: '2018-01-26 08:00:00.000-06', purpose: 'Check-up', status: 'PENDING', doctorId: 1, patientId: 9}),
    Appointment.create({date: '2018-01-20 08:30:00.000-06', purpose: 'Check-up', status: 'PENDING', doctorId: 1, patientId: 6}),
    Appointment.create({date: '2018-01-21 10:30:00.000-06', purpose: 'Check-up', status: 'PENDING', doctorId: 1, patientId: 2}),
    Appointment.create({date: '2018-01-22 09:00:00.000-06', purpose: 'Check-up', status: 'PENDING', doctorId: 1, patientId: 3})

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

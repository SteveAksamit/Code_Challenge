/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Doctor = db.model('doctor')
const Appointment = db.model('appointment')
const Document = db.model('document')
const Patient = db.model('patient')
const User = db.model('user')
const patientAgent = request.agent(app);
const doctorAgent = request.agent(app);

const testUsers = [
  { id: 1, email: 'doctortestone@email.com', username: 'doctor', password: '6194941e7f39939bff379f3989945f3f209341b0776373c2c00d4c6b0bcc4e77', isDoctor: true, isPatient: false, salt: 'jASADqCplgG6bIgISfuCJw==' },
  { id: 2, email: 'doctortesttwo@email.com', username: 'doctortesttwo', password: '123', isDoctor: true, isPatient: false },
  { id: 3, email: 'testone@email.com', username: 'patient', password: '95777dbd7486cfc24622333163b0780186334f8b15ecf66f25a4357963695b2a', isDoctor: false, isPatient: true, salt: 'IKlLboROHMSZieeBC1oozg==' },
  { id: 4, email: 'testtwo@email.com', username: 'patienttwo', password: '123', isDoctor: false, isPatient: true }
]
const testDoctors = [
  { name: 'Doctor Testone', userId: 1 },
  { name: 'Doctor Testtwo', userId: 2 }
]
const testPatients = [
  { id: 1, firstName: 'Test', lastName: 'Patientone', dateOfBirth: '1941-04-17', address: '123 Main Street', city: 'Chicago', state: 'IL', zip: '60610', phoneNumber: '312-111-2222', userId: 3 },
  { id: 2, firstName: 'Test', lastName: 'Patienttwo', dateOfBirth: '1941-04-17', address: '123 Test Street', city: 'Chicago', state: 'IL', zip: '60610', phoneNumber: '312-111-3333', userId: 4 }
]

const testDocuments = [
  { title: 'Test File 1', fileName: 'file1.pdf', patientId: 1, dateAdded: '2017-12-12' },
  { title: 'Test File 2', fileName: 'file2.pdf', patientId: 1, dateAdded: '2017-12-12' }
]

const testAppointments = [
  { id: 9, date: '2017-11-30 02:30:00.000-06', purpose: 'Annual Check-up', status: 'PAST', doctorId: 1, patientId: 1 },
  { id: 10, date: '2018-01-30 03:30:00.000-06', purpose: 'Check-up', status: 'UPCOMING', doctorId: 1, patientId: 1 },
  { id: 3, date: '2017-11-30 02:30:00.000-06', purpose: 'Annual Check-up', status: 'PENDING', doctorId: 1, patientId: 1 },
  { id: 4, date: '2018-01-15 03:30:00.000-06', purpose: 'Check-up', status: 'DECLINED', doctorId: 1, patientId: 1 },
  { id: 5, date: '2017-11-30 04:30:00.000-06', purpose: 'Annual Check-up', status: 'PAST', doctorId: 1, patientId: 2 },
  { id: 6, date: '2018-01-30 05:30:00.000-06', purpose: 'Check-up', status: 'UPCOMING', doctorId: 1, patientId: 2 },
  { id: 7, date: '2018-01-15 04:30:00.000-06', purpose: 'Annual Check-up', status: 'PENDING', doctorId: 2, patientId: 2 },
  { id: 8, date: '2018-12-15 05:30:00.000-06', purpose: 'Check-up', status: 'DECLINED', doctorId: 2, patientId: 2 }
]

describe('API routes', () => {
  before(() => {
    return db.sync({ force: true })
  })
  before(() => { return User.bulkCreate(testUsers) })
  before(() => { return Patient.bulkCreate(testPatients) })
  before(() => { return Doctor.bulkCreate(testDoctors) })
  before(() => { return Appointment.bulkCreate(testAppointments) })
  before(() => { return Document.bulkCreate(testDocuments) })
  before(function (done) {
    patientAgent
      .post('/auth/login')
      .send({
        username: 'patient',
        password: '123'
      })
      .end((err, response) => {
        expect(response.statusCode).to.equal(200)
        done()
      })
  });
  before(function (done) {
    doctorAgent
      .post('/auth/login')
      .send({
        username: 'doctor',
        password: '123'
      })
      .end((err, response) => {
        expect(response.statusCode).to.equal(200)
        done()
      })
  });

  describe('Doctors API tests', () => {
    describe('GET /api/doctors/ - happy test', () => {
      it('returns array of all doctors to logged in patient user', function () {
        return patientAgent.get('/api/doctors')
          .then(function (res) {
            expect(res.status).to.be.equal(200)
            expect(res.body.length).to.equal(2)
          })
      });
    })

    describe('GET /api/doctors/ - sad test', () => {
      it('returns 401 not-authorized to non-logged in user', function () {
        return request(app).get('/api/doctors')
          .then(function (res) {
            expect(res.status).to.be.equal(401)
          })
      });
    })

    describe('GET /api/doctors/singleDoctor/:userId -  happy test', () => {
      it('returns array of all doctors to logged in patient user', function () {
        return doctorAgent.get('/api/doctors/singleDoctor/1')
          .then(function (res) {
            expect(res.status).to.be.equal(200)
            expect(res.body.name).to.be.equal('Doctor Testone')
          })
      });
    })

    describe('GET /api/doctors/singleDoctor/:userId - sad test', () => {
      it('returns 401 not-authorized user logged in as patient', function () {
        return patientAgent.get('/api/doctors/singleDoctor/1')
          .then(function (res) {
            expect(res.status).to.be.equal(401)
          })
      });
    })

    describe('DoctorAppointments API tests', () => {
      describe('GET /api/doctorAppointments/singlePatient/:doctorId/:patientId/ - happy test', () => {
        it('returns array of all appointments for a single patient associated with the logged in doctor', function () {
          return doctorAgent.get('/api/doctorAppointments/singlePatient/1/2')
            .then(function (res) {
              expect(res.status).to.be.equal(200)
              expect(res.body.length).to.be.equal(2)
            })
        });
      })
      describe('GET /api/doctorAppointments/singlePatient/:doctorId/:patientId/ - sad test', () => {
        it('returns 401 not-authorized for user logged in as patient', function () {
          return patientAgent.get('/api/doctorAppointments/singlePatient/1/2')
            .then(function (res) {
              expect(res.status).to.be.equal(401)
            })
        });
      })
      describe('GET /api/doctorAppointments/allPatients/:doctorId - happy test', () => {
        it('returns array of all appointments for logged in doctor user', function () {
          return doctorAgent.get('/api/doctorAppointments/allPatients/1')
            .then(function (res) {
              expect(res.status).to.be.equal(200)
              expect(res.body.length).to.be.equal(6)
            })
        });
      })
      describe('GET /api/doctorAppointments/allPatients/:doctorId - sad test', () => {
        it('returns 401 not-authorized for user logged in as patient', function () {
          return patientAgent.get('/api/doctorAppointments/allPatients/1')
            .then(function (res) {
              expect(res.status).to.be.equal(401)
            })
        });
      })

      describe('POST /api/doctorAppointments/newAppointment - happy test', () => {
        it('creates a new appointment scheduled by logged in doctor user', function () {
          return doctorAgent.post('/api/doctorAppointments/newAppointment')
            .send({
              date: '2018-01-15 ',
              time: '04:30:00.000-06',
              purpose: 'test visit',
              patientId: 2,
              doctorId: 1
            })
            .then(function (res) {
              expect(res.status).to.be.equal(200)
              expect(res.body.purpose).to.be.equal('test visit')
            })
        });
      })
      describe('POST /api/doctorAppointments/newAppointment - sad test', () => {
        it('returns 401 when different patient user tries to schedule new appointment', function () {
          return patientAgent.post('/api/doctorAppointments/newAppointment')
            .send({
              date: '2018-01-15 ',
              time: '04:30:00.000-06',
              purpose: 'test visit',
              patientId: 2,
              doctorId: 1,
            })
            .then(function (res) {
              expect(res.status).to.be.equal(401)
            })
        });
      })
      describe('PUT /api/doctorAppointments/:response/:appointmentId - happy test', () => {
        it('updates an existing appointment scheduled by logged in doctor user', function () {
          return doctorAgent.put('/api/doctorAppointments/true/3')
            .send({
              message: 'test message'
            })
            .then(function (res) {
              expect(res.status).to.be.equal(200)
              expect(res.body.status).to.be.equal('UPCOMING')
              expect(res.body.message).to.be.equal('test message')
            })
        });
      })
      describe('PUT /api/doctorAppointments/:response/:appointmentId - sad test', () => {
        it('returns 401 when patient user tries to schedule new appointment', function () {
          return patientAgent.put('/api/doctorAppointments/true/4')
            .send({
              message: 'test message'
            })
            .then(function (res) {
              expect(res.status).to.be.equal(401)
            })
        });
      })
    })
    describe('PatientAppointments API tests', () => {
      describe('GET /api/patientAppointments/allAppointments/:patientId - happy test', () => {
        it('returns array of all appointments for a single patient making the request', function () {
          return patientAgent.get('/api/patientAppointments/allAppointments/1')
            .then(function (res) {
              expect(res.status).to.be.equal(200)
              expect(res.body.length).to.be.equal(4)
            })
        });
      })
      describe('GET /api/patientAppointments/allAppointments/:patientId - sad test', () => {
        it('returns 401 not-authorized for user not logged in as patient', function () {
          return request(app).get('/api/patientAppointments/allAppointments/1')
            .then(function (res) {
              expect(res.status).to.be.equal(401)
            })
        });
      })
      describe('POST /api/patientAppointments/newAppointment - happy test', () => {
        it('creates a new appointment scheduled by logged in patient user', function () {
          return patientAgent.post('/api/patientAppointments/newAppointment')
            .send({
              date: '2018-01-15 ',
              time: '04:30:00.000-06',
              purpose: 'test visit',
              patientId: 1,
              doctorId: 1
            })
            .then(function (res) {
              expect(res.status).to.be.equal(200)
              expect(res.body.purpose).to.be.equal('test visit')
            })
        });
      })
      describe('POST /api/patientAppointments/newAppointment - sad test', () => {
        it('returns 401 when different patient user tries to schedule new appointment', function () {
          return request(app).post('/api/patientAppointments/newAppointment')
            .send({
              date: '2018-01-15 ',
              time: '04:30:00.000-06',
              purpose: 'test visit',
              patientId: 2,
              doctorId: 1,
            })
            .then(function (res) {
              expect(res.status).to.be.equal(401)
            })
        });
      })
      describe('PUT /api/patientAppointments/patient/cancel/:appointmentId - happy test', () => {
        it('cancels an existing appointment scheduled by logged in patient user', function () {
          return patientAgent.put('/api/patientAppointments/patient/cancel/2')
            .send({
              message: 'cancel test'
            })
            .then(function (res) {
              expect(res.status).to.be.equal(200)
              expect(res.body.status).to.be.equal('CANCELLED')
            })
        });
      })
      describe('PUT /api/patientAppointments/patient/cancel/:appointmentId - sad test', () => {
        it('returns 401 when non logged in user tries to cancel appointment', function () {
          return request(app).put('/api/patientAppointments/patient/cancel/6')
            .send({
              message: 'cancel test'
            })
            .then(function (res) {
              expect(res.status).to.be.equal(401)
            })
        });
      })
    })
    describe('Patients API tests', () => {
      describe('GET /api/patients/ - happy test', () => {
        it('returns array of all patients to logged in doctor user', function () {
          return doctorAgent.get('/api/patients')
            .then(function (res) {
              expect(res.status).to.be.equal(200)
              expect(res.body.length).to.equal(2)
            })
        });
      })

      describe('GET /api/patients/ - sad test', () => {
        it('returns 401 not-authorized to non-logged in user', function () {
          return request(app).get('/api/patients')
            .then(function (res) {
              expect(res.status).to.be.equal(401)
            })
        });
      })

      describe('GET /api/patients/singlePatient/:userId -  happy test', () => {
        it('returns object containing all patient details to logged in patient user', function () {
          return patientAgent.get('/api/patients/singlePatient/3')
            .then(function (res) {
              expect(res.status).to.be.equal(200)
              expect(res.body.lastName).to.be.equal('Patientone')
            })
        });
      })

      describe('GET /api/patients/singlePatient/:userId - sad test', () => {
        it('returns 401 not-authorized to non-logged in user', function () {
          return request(app).get('/api/patients/singlePatient/3')
            .then(function (res) {
              expect(res.status).to.be.equal(401)
            })
        });
      })
    })
    describe('Documents API tests', () => {
      describe('GET /api/documents/:patientId - happy test', () => {
        it('returns array of all documents for logged in patient', function () {
          return patientAgent.get('/api/documents/1')
            .then(function (res) {
              expect(res.status).to.be.equal(200)
              expect(res.body.length).to.equal(2)
            })
        });
      })

      describe('GET /api/documents/:patientId - sad test', () => {
        it('returns 401 not-authorized to different patient requesting the records', function () {
          return patientAgent.get('/api/documents/2')
            .then(function (res) {
              expect(res.status).to.be.equal(401)
            })
        });
      })
      describe('DELETE /api/documents/:documentId - happy test', () => {
        it('deletes a document record when requested by the doctor', function () {
          return doctorAgent.delete('/api/documents/2')
            .then(function (res) {
              expect(res.status).to.be.equal(200)
              expect(res.body.length).to.equal(1)
            })
        });
      })

      describe('DELETE /api/documents/:documentId - sad test', () => {
        it('returns 401 not-authorized to patient requesting to delete a document record', function () {
          return patientAgent.delete('/api/documents/1')
            .then(function (res) {
              expect(res.status).to.be.equal(401)
            })
        });
      })
      describe('POST /api/documents/record - happy test', () => {
        it('posts a document record when requested by the doctor', function () {
          return doctorAgent.post('/api/documents/record')
            .send({
              title: 'test',
              fileName: 'test1.pdf'
            })
            .then(function (res) {
              expect(res.status).to.be.equal(200)
              expect(res.body.title).to.equal('test')
            })
        });
      })

      describe('POST /api/documents/record - sad test', () => {
        it('returns 401 not-authorized to patient requesting to post a document record', function () {
          return patientAgent.post('/api/documents/record')
            .send({
              title: 'test',
              fileName: 'test1.pdf'
            })
            .then(function (res) {
              expect(res.status).to.be.equal(401)
            })
        });
      })
    })
  })
})



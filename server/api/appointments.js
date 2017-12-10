const router = require('express').Router()
const { Appointment } = require('../db/models')
module.exports = router

router.get('/doctor/singlePatient/:doctorId', (req, res, next) => {
  return Appointment.findAll({
    where: {
      doctorId: req.params.doctorId
    }
  })
    .then(appointments => res.json(appointments))
    .catch(next)
})

router.get('/doctor/allPatients/:doctorId/patientId', (req, res, next) => {
  return Appointment.findAll({
    where: {
      patientId: req.params.patientId,
      doctorId: req.params.doctorId
    }
  })
    .then(appointments => res.json(appointments))
    .catch(next)
})

router.get('/patient/allPatients/:patientId', (req, res, next) => {
  return Appointment.findAll({
    where: {
      patientId: req.params.patientId
    }
  })
    .then(appointments => res.json(appointments))
    .catch(next)
})

router.post('/doctor/newAppointment', (req, res, next) => {
  return Appointment.create(req.body)
    .then(newAppointment => res.json(newAppointment))
    .catch(next)
})

router.post('/patient/newAppointment', (req, res, next) => {
  return Appointment.create(req.body)
    .then(newAppointment => res.json(newAppointment))
    .catch(next)
})

router.put('/doctor/:response/:appointmentId', (req, res, next) => {
  if (req.params.response === false) {
    return Appointment.update({
      status: 'DECLINED'
    })
      .then((updatedAppointment) => res.json(updatedAppointment))
      .catch(next)
  } else if (req.params.response === true) {
    return Appointment.update({
      status: 'ACCEPTED'
    })
      .then((updatedAppointment) => res.json(updatedAppointment))
      .catch(next)
  }
})

router.delete('/patient/cancel/:appointmentId', (req, res, next) => {
  return Appointment.destroy({
    where: {
      appointmentId: req.params.appointmentId
    }
  })
    .then(deletedAppointment => res.json(deletedAppointment))
    .catch(next)
})


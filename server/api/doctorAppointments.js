const router = require('express').Router()
const { Appointment } = require('../db/models')
module.exports = router

router.get('/singlePatient/:doctorId', (req, res, next) => {
  return Appointment.findAll({
    where: {
      doctorId: req.params.doctorId
    }
  })
    .then(appointments => res.json(appointments))
    .catch(next)
})

router.get('/allPatients/:doctorId/:patientId', (req, res, next) => {
  return Appointment.findAll({
    where: {
      patientId: req.params.patientId,
      doctorId: req.params.doctorId
    }
  })
    .then(appointments => res.json(appointments))
    .catch(next)
})

router.post('/newAppointment', (req, res, next) => {
  return Appointment.create(req.body)
    .then(newAppointment => res.json(newAppointment))
    .catch(next)
})

router.put('/:response/:appointmentId', (req, res, next) => {
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


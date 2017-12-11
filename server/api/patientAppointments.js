const router = require('express').Router()
const { Appointment } = require('../db/models')
module.exports = router

router.get('/allPatients/:patientId', (req, res, next) => {
  return Appointment.findAll({
    where: {
      patientId: req.params.patientId
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

router.delete('/patient/cancel/:appointmentId', (req, res, next) => {
  return Appointment.destroy({
    where: {
      appointmentId: req.params.appointmentId
    }
  })
    .then(deletedAppointment => res.json(deletedAppointment))
    .catch(next)
})

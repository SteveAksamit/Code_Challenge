const router = require('express').Router()
const { Appointment } = require('../db/models')
module.exports = router

router.get('/singlePatient/:doctorId/:patientId', (req, res, next) => {
  return Appointment.findAll({
    where: {
      patientId: req.params.patientId,
      doctorId: req.params.doctorId
    }
  })
    .then(appointments => res.json(appointments))
    .catch(next)
})

router.get('/allPatients/:doctorId', (req, res, next) => {
  return Appointment.findAll({
    where: {
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
  let newStatus = (req.params.response === 'true') ? 'ACCEPTED' : 'DECLINED'
  let id = +req.params.appointmentId
  let message = req.body.message
  return Appointment.update(
      {status: newStatus,
      declineMessage: message},
      {where: {
        id: id
      }
  })
    .then(()=> Appointment.findById(id))
    .then(updatedAppointment => res.json(updatedAppointment))
    .catch(next)
})


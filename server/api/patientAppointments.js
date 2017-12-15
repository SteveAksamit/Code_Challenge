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
  req.body.status = 'PENDING'
  req.body.message = 'Requested by Patient'
  let dateTime = req.body.date.slice(0,10) + ' ' + req.body.time
  return Appointment.create({
    date: dateTime,
    purpose: req.body.purpose,
    patientId: req.body.patientId,
    doctorId: req.body.doctorId,
    status: 'PENDING',
    message: 'Requested by Patient'
  })
    .then(newAppointment => res.json(newAppointment))
    .catch(next)
})

router.put('/patient/cancel/:appointmentId', (req, res, next) => {
  let id = +req.params.appointmentId
  return Appointment.update(
    {
      status: 'CANCELLED',
      message: 'Cancelled by Patient'
    },
    {
      where: {
        id: id
      }
    })
    .then(() => Appointment.findById(id))
    .then(cancelledAppointment => {
      res.json(cancelledAppointment)})
    .catch(next)
})

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
  const { date, time, purpose, patientId, doctorId } = req.body
  let dateTime = date.slice(0, 10) + ' ' + time
  return Appointment.create({
    date: dateTime,
    purpose: purpose,
    patientId: patientId,
    doctorId: doctorId,
    status: 'UPCOMING',
    message: 'Scheduled by Doctor'
  })
    .then(newAppointment => res.json(newAppointment))
    .catch(next)
})

router.put('/:response/:appointmentId', (req, res, next) => {
  let newStatus = (req.params.response === 'true') ? 'UPCOMING' : 'DECLINED'
  let id = +req.params.appointmentId
  let message = req.body.message || 'Accepted by Doctor'
  return Appointment.update(
    {
      status: newStatus,
      message: message
    },
    {
      where: {
        id: id
      }
    })
    .then(() => Appointment.findById(id))
    .then(updatedAppointment => res.json(updatedAppointment))
    .catch(next)
})


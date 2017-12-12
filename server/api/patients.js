const router = require('express').Router()
const {Patient, User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  return Patient.findAll({})
    .then(patients => res.json(patients))
    .catch(next)
})

router.get('/singlePatient/:patientId', (req, res, next) => {
  return Patient.findById(req.params.patientId, {include: [ { model: User } ]})
    .then(patient => res.json(patient))
    .catch(next)
})

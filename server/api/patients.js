const router = require('express').Router()
const {Patient} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  return Patient.findAll({})
    .then(patients => res.json(patients))
    .catch(next)
})

router.get('/singlePatient/:patientId', (req, res, next) => {
  return Patient.findById(req.params.patientId)
    .then(patient => res.json(patient))
    .catch(next)
})

const router = require('express').Router()
const { Patient, User } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  return Patient.findAll({
    include: [{ model: User }], order: [
      ['lastName', 'ASC']
    ]
  })
    .then(patients => res.json(patients))
    .catch(next)
})

router.get('/singlePatient/:userId', (req, res, next) => {
  return Patient.findOne({
    where: {
      userId: req.params.userId
    },
    include: [{ model: User }]
  })
    .then(patient => res.json(patient))
    .catch(next)
})

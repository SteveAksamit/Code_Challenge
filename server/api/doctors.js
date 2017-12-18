const router = require('express').Router()
const { Doctor } = require('../db/models')
const { isDoctor, isPatient } = require('../securityMiddleware')
module.exports = router

router.get('/', isPatient, (req, res, next) => {
  return Doctor.findAll({})
    .then(doctors => res.json(doctors))
    .catch(next)
})

router.get('/singleDoctor/:userId', isDoctor, (req, res, next) => {
  return Doctor.findOne({
    where: {
      userId: req.params.userId
    }
  })
    .then(doctor => res.json(doctor))
    .catch(next)
})

const router = require('express').Router()
const {Doctor} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  return Doctor.findAll({})
    .then(doctors => res.json(doctors))
    .catch(next)
})

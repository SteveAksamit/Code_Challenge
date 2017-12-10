const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/doctors', require('./doctors'))
router.use('/patients', require('./patients'))
router.use('/appointments', require('./appointments'))
router.use('/documents', require('./documents'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

const router = require('express').Router()
const { Document } = require('../db/models')
module.exports = router

router.get('/:patientId', (req, res, next) => {
  return Document.findAll({
    where: {
      patientId: req.params.patientId
    }
  })
    .then(documents => res.json(documents))
    .catch(next)
})

router.post('/:patientId', (req, res, next) => {
  return Document.create(req.body)
    .then((newDocument) => res.json(newDocument))
    .catch(next)
})

router.delete('/document/:documentId', (req, res, next) => {
  return Document.destroy({
    where: {
      id: req.params.documentId
    }
  })
    .then((deletedDocument) => res.json(deletedDocument))
    .catch(next)
})


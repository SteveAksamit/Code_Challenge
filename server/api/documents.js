const router = require('express').Router()
const { Document } = require('../db/models')
const fs = require('fs');
const path = require('path');
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname + '/../../public/files'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now().toString().slice(-5) + '-' + file.originalname)
  }
})
const upload = multer({ storage: storage })
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

router.delete('/:documentId', (req, res, next) => {
  return Document.destroy({
    where: {
      id: req.params.documentId
    }
  })
    .then(() => res.json(req.params.documentId))
    .catch(next)
})

router.post('/record', (req, res, next) => {
  console.log(req.body)
  return Document.create(req.body)
    .then((newDocument) => res.json(newDocument))
    .catch(next)
})

router.post('/upload', upload.single('file'), (req, res, next) => {
  res.json(req.file.originalname)
});

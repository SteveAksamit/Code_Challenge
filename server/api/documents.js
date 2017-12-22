const router = require('express').Router()
const { Document } = require('../db/models')
const { isDoctor, isDoctorOrCorrectPatient } = require('../securityMiddleware')
const path = require('path');
const multer = require('multer')
let newFileName;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname + '/../../public/files'))
  },
  filename: function (req, file, cb) {
    newFileName = Date.now().toString().slice(-5) + '-' + file.originalname
    cb(null, newFileName)
  }
})
const upload = multer({ storage: storage })
module.exports = router

router.get('/:patientId', isDoctorOrCorrectPatient, (req, res, next) => {
  return Document.findAll({
    where: {
      patientId: req.params.patientId
    }
  })
    .then(documents => res.json(documents))
    .catch(next)
})

router.delete('/:documentId', isDoctor, (req, res, next) => {
  return Document.destroy({
    where: {
      id: req.params.documentId
    }
  })
    .then(() => res.json(req.params.documentId))
    .catch(next)
})

router.post('/record', isDoctorOrCorrectPatient, (req, res, next) => {
  return Document.create(req.body)
    .then((newDocument) => res.json(newDocument))
    .catch(next)
})

router.post('/upload', isDoctorOrCorrectPatient, upload.single('file'), (req, res, next) => {
  console.log(newFileName)
  res.json(newFileName)
});

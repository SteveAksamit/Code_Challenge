const { Patient } = require('./db/models')
const reject = (status, msg, next) => {
  const err = new Error(msg)
  err.status = status;
  next(err);
}

module.exports = {
  isPatient: (req, res, next) => {
    if (req.user && req.user.isPatient) return next();
    reject(401, 'Not logged in as a Patient. Cannot access this API route.', next);
  },

  isDoctor: (req, res, next) => {
    if (req.user && req.user.isDoctor) return next();
    reject(401, 'Not logged in as a Doctor. Cannot access this API route.', next);
  },

  isDoctorOrCorrectPatient: (req, res, next) => {
    Patient.findOne({
      where: {
        id: req.params.patientId
      }
    })
      .then(patient => {
        if (req.user && (req.user.isDoctor || req.params.userId == req.user.id || (patient && req.user.id === patient.userId))) return next();
        reject(401, 'Not logged in as this Patient you are requesting data for and you are not a doctor. Cannot access this API route.', next);
        return next()
      })
  }
}

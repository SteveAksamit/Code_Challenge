const User = require('./user')
const Doctor = require('./doctor')
const Patient = require('./patient')
const Appointment = require('./appointment')
const Document = require('./document')

Doctor.belongsTo(User);
Patient.belongsTo(User);
Doctor.belongsToMany(Patient, {through: {model: Appointment, unique: false}});
Patient.belongsToMany(Doctor, {through: {model: Appointment, unique: false}});
Patient.hasMany(Document)
Document.belongsTo(Patient)

module.exports = {
  User,
  Doctor,
  Patient,
  Appointment,
  Document
}

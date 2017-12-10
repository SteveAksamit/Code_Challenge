
const Sequelize = require('sequelize')
const db = require('../db')

const Appointment = db.define('appointment', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  purpose: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM('PAST', 'FUTURE', 'PENDING', 'DECLINED', 'ACCEPTED')
  },
  declineMessage: {
    type: Sequelize.TEXT
  },
  doctorId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    isUnique: false
  },
  patientId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    isUnique: false
  }
})

module.exports = Appointment


const Sequelize = require('sequelize')
const db = require('../db')

const Doctor = db.define('doctor', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Doctor

const Sequelize = require('sequelize')
const db = require('../db')

const Document = db.define('document', {
  title: {
    type: Sequelize.STRING,
    defaultValue: 'Uploaded Document'
  },
  fileName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dateAdded: {
    type: Sequelize.DATE,
    defaultValue: Date.now()
  }
})

module.exports = Document

const Sequelize = require('sequelize')
const db = require('../db')

const Document = db.define('document', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  fileName: {
    type: Sequelize.STRING,
  },
  documentId: {
    type: Sequelize.STRING,
  },
  dateAdded: {
    type: Sequelize.DATE
  }
})

module.exports = Document

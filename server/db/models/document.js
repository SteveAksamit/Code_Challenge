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
  remoteDocumentId: {
    type: Sequelize.STRING,
  },
  dateAdded: {
    type: Sequelize.DATE,
    defaultValue: Date.now()
  }
})

module.exports = Document

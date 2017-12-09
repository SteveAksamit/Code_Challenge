const Sequelize = require('sequelize')
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost:5432/steve_code_challenge', {
    logging: false
  }
)
module.exports = db

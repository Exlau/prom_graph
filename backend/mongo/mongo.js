const mongoose = require('mongoose')
const username = 'root'
const password = 'root'

const mongoConnection = mongoose.createConnection(`mongodb://${username}:${password}@localhost:27017`)

module.exports = {
  mongoConnection
}
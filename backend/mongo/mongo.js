const mongoose = require('mongoose')


const mongoConnection = mongoose.createConnection('mongodb://root:root@localhost:27017')

module.exports = {
  mongoConnection
}
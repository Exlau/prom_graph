const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const { mongoConnection } = require('../mongo')

const dashboardSchema = new mongoose.Schema({
  id: String,
  owner: String,
  name: String,
  description: String,
  layout: String
})

dashboardSchema.plugin(mongoosePaginate)

const Dashboard = mongoConnection.model('Dashboard', dashboardSchema)

module.exports = {
  Dashboard
}
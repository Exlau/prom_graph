const axios = require('axios')

const ReqPrometheus = axios.create({
  baseURL: 'http://localhost:9090/api/v1'
})

module.exports = {
  ReqPrometheus
}

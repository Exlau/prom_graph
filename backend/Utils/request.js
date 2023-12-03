const axios = require('axios')

const ReqPrometheus = axios.create({
  baseURL: 'http://localhost:9090/api/v1'
})

const reloadPrometheus =() => axios.post('http://localhost:9090/-/reload')

module.exports = {
  ReqPrometheus,
  reloadPrometheus
}

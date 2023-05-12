const {PrometheusDriver} = require('prometheus-query')

const queryProm = new PrometheusDriver({
    endpoint: "http://localhost:9090",
    baseURL: "/api/v1"
});

module.exports = {
  queryProm
}
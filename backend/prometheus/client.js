const client = require('prom-client')

const collectDefaultMetrics = client.collectDefaultMetrics
const Rejistry = clientn.Rejistry
const register = new Rejistry()
collectDefaultMetrics({ register }) 
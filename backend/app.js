const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')
const dashboard = require('./routes/dashboard')
const prometheus = require('./routes/prometheus')
const cors = require('koa2-cors')
const jwt = require('koa-jwt')

// error handler
onerror(app)

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

// cors
app.use(cors({
  origin: '*',
  maxAge: 5,
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

// jwt
app.use(jwt({
  // TODO:环境变量注入密钥
  secret: 'test-sec', 
  debug: true
}).unless({ path: [/login/, /registry/] })) // 跳过登录和注册接口

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})




// routes
app.use(users.routes(), users.allowedMethods())
app.use(index.routes(), index.allowedMethods())
app.use(dashboard.routes(), dashboard.allowedMethods())
app.use(prometheus.routes(), prometheus.allowedMethods())

module.exports = app

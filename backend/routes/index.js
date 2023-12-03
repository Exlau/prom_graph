const router = require('koa-router')()
const jsonwebtoken = require('jsonwebtoken')
const { mongoConnection } = require('../mongo/mongo')
const { User } = require('../mongo/schema/User')


router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body
  const user = await User.findOne({ username })
  ctx.response.type = 'application/json'

  if (!user) {
    ctx.response.status = 401;
    ctx.response.body = { "error": 'Invalid username or password' };
    return;
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    ctx.response.status = 401;
    ctx.response.body = { "error": 'Invalid username or password' };
    return;
  }

  const { body } = ctx.request
  // TODO:密钥使用环境变量注入
  const token = jsonwebtoken.sign({ name: body?.username }, 'test-sec', { expiresIn: '50d' })
  ctx.response.body = { "token": token };
})

router.post('/registry', async (ctx, next) => {
  const { username, password } = ctx.request.body;

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    ctx.response.status = 409;
    ctx.response.body = { error: 'Username already exists' };
  } else {
    const newUser = new User({ username, password });

    await newUser.save();

    ctx.response.status = 201;
    ctx.response.body = { message: 'User created' };
  }
})

router.get('/testdb', async (ctx, next) => {
  ctx.body = mongoConnection.readyState
})

module.exports = router

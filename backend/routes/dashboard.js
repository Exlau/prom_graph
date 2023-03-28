const router = require('koa-router')()
const { Dashboard } = require('../mongo/schema/Dashboard')

router.prefix('/dashboard')

router.get('/', async function (ctx, next) {
  const { name: owner } = ctx.state.user

  const { page = 1, limit = 3 } = ctx.query;
  const options = {
    page: parseInt(page),
    limit: parseInt(limit)
  };

  const result = await Dashboard.paginate({ owner }, options);
  ctx.body = result;

  ctx.body = { result }
})

router.post('/new', async (ctx, next) => {
  const { name: owner } = ctx.state.user
  const { name, description, layout } = ctx.request.body
  const newDashboard = new Dashboard({
    owner: owner,
    name,
    description,
    layout
  })

  try {
    const result = await newDashboard.save()
  } catch (e) {
    ctx.body = { message: `Created failed! Reason: ${e}` }
    return
  }

  ctx.body = { message: 'Created successfully!' }
})

module.exports = router

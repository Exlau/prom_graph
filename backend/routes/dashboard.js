const router = require('koa-router')()
const { Dashboard } = require('../mongo/schema/Dashboard')

router.prefix('/dashboard')

// get dashboard
router.get('/', async function (ctx, next) {
  const { name: owner } = ctx.state.user

  const { page = 1, limit = 3, id = undefined } = ctx.query;
  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  const filter = {
    owner,
  }

  if (id) {
    // get单个dashboard
    filter._id = id
    const { docs } = await Dashboard.paginate(filter, options);
    ctx.body = docs[0];
  } else {
    // get dashboard list
    const result = await Dashboard.paginate(filter, options);
    ctx.body = result;
  }
})

// edit dashboard
router.put('/', async (ctx, next) => {
  const { name: owner } = ctx.state.user

  const { title, panels, _id } = ctx.request.body

  try {
    await Dashboard.updateOne(
      { _id, },
      { title, panels },
    )
    ctx.body = { message: 'successful' }
  } catch (err) {
    ctx.body = { message: 'failed' }
  }

})

// new dashboard
router.post('/', async (ctx, next) => {
  const { name: owner } = ctx.state.user
  const { title, id, panels, description, tags } = ctx.request.body
  const newDashboard = new Dashboard({
    owner: owner,
    title,
    id,
    panels,
    tags,
    description
  })

  try {
    const result = await newDashboard.save()
  } catch (e) {
    ctx.body = { message: `Created failed! Reason: ${e}` }
    return
  }

  ctx.body = { message: 'Created successfully!' }
})

// delete dashboard
router.delete('/', async (ctx, next) => {
  const { name: owner } = ctx.state.user
  const { id } = ctx.query
  const result = await Dashboard.deleteOne({ _id:id, owner })
  if (result.deletedCount === 1) {
    ctx.body = {
      message: 'success delete'
    }
  } else {
    ctx.body = {
      message: result
    }
  }
})


router.post('/save', async (ctx, next) => {
  const { name: owner } = ctx.state.user
  const { title, id, panels } = ctx.request.body
})

module.exports = router

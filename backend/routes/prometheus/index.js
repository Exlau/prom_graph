const router = require('koa-router')()
const { ReqPrometheus } = require('../../Utils/request')

router.prefix('/prometheus')

// get metrics
router.get('/metric', async function (ctx, next) {
  try {
    const prometheusRes = await ReqPrometheus('/metadata')
    ctx.body = prometheusRes.data

  } catch (e) {
    console.log('error: ', e)
  }

})

// edit dashboard
router.put('/', async (ctx, next) => {

})

router.post('/new', async (ctx, next) => {

})

router.post('/save', async (ctx, next) => {
  const { name: owner } = ctx.state.user
  const { title, id, panels } = ctx.request.body
})

module.exports = router

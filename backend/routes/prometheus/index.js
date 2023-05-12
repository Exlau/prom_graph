const router = require('koa-router')()
const { queryProm } = require('../../prometheus/client')
const { distinctChart } = require('./dataPreProcess')

router.prefix('/prometheus')

// get metrics
// router.get('/metric', async function (ctx, next) {
//   try {
//     const prometheusRes = await ReqPrometheus('/metadata')
//     ctx.body = prometheusRes.data

//   } catch (e) {
//     console.log('error: ', e)
//   }

// })

router.get('/test', async (ctx) => {
  ctx.body = 'test result'
})

router.get('/query', async (ctx, next) => {
  const { queryExpr } = ctx.query

  if (!queryExpr) {
    ctx.status = 400
    return
  }

  const end = new Date(); // 获取当前日期和时间
  const endHalfAgo = new Date(end.getTime() - 30 * 60 * 1000); // 计算半小时前的日期

  const start = endHalfAgo.getTime(); // 获取半小时前的日期毫秒值

  try {
    const result = await queryProm.rangeQuery(queryExpr, start, end, 14)
    // result.result = distinctChart(result.result)
    ctx.body = result
  } catch (e) {
    ctx.status = 500
    ctx.body = {message:e}
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

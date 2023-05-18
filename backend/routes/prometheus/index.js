const router = require('koa-router')()
const { queryProm } = require('../../prometheus/client')
const { distinctChart, processMetrics, processLabels } = require('./dataPreProcess')
const { formatLineChart } = require('./dataPreProcess/formatLineChart')
const { ReqPrometheus } = require('../../Utils/request')

router.prefix('/prometheus')

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
    const result = await queryProm.rangeQuery(queryExpr, start, end, 60)
    if(result.resultType === 'matrix'){
      result.result = formatLineChart(result.result)
    }
    ctx.body = result 
  } catch (e) {
    ctx.status = 500
    ctx.body = { "message": e?.data }
    console.log(e)
  }
})

router.get('/queryVector', async (ctx) => {
  const { queryExpr } = ctx.query

  if (!queryExpr) {
    ctx.status = 400
    return
  }

  try {
    const result = await queryProm.instantQuery(queryExpr)
    result.result = distinctChart(result.result)
    ctx.body = result
  } catch (e) {
    ctx.status = 500
    ctx.body = { "message": e?.data }
  }
})

router.get('/queryHis', async(ctx) => {
  
})

router.get('/metrics', async (ctx, next) => {
  const result = await queryProm.metadata()
  ctx.body = processMetrics(result)
})

router.get('/labels', async (ctx, next) => {
  const { data } = await ReqPrometheus.get('/labels')
  ctx.body = processLabels(data)
})

router.get('/dimensions', async (ctx, next) => {
  const result = await queryProm.series()
  ctx.body = result
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

const router = require('koa-router')()
const { docker } = require('../../docker/client')

router.prefix('/docker')

router.get('/containers', async (ctx) => {
  try {
    const containers = await docker.listContainers({ all: true })
    ctx.body = containers
    ctx.body = containers.map(({ Id, Names, State, Labels,Image,Command,Status }) => {
      return {
        'id': Id,
        'names': Names,
        'state': State,
        'labels': Labels,
        'image':Image,
        'command':Command,
        'status':Status
      }
    })
  } catch (e) {
    ctx.body = {
      message: e
    }
  }
})

router.post('/container/restart', async (ctx) => {
  const { id } = ctx.request.body

  try {
    const response = await docker.getContainer(id).restart()
    ctx.body = response

  } catch (e) {
    ctx.body = {
      message: e
    }
  }

})

router.get('/state', async (ctx, next) => {
  const { name: owner } = ctx.state.user
  const { title, id, panels } = ctx.request.body
})

module.exports = router

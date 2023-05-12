import req from '../../../../api/request'

export const queryPrometheus = async (queryExpr:string) => {
  const { data } = await req.get(`/prometheus/query?queryExpr=${queryExpr}`)
  return JSON.parse(data)
}

export default {}

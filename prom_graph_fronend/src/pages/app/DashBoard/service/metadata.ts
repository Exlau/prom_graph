import { useQuery } from 'react-query'
import req from '../../../../api/request'

export const useMetricsList = () => useQuery<string[]>(['GET/metrics'], async () => {
  const { data }: {data: string} = await req.get('/prometheus/metrics')
  return JSON.parse(data) ?? []
})

export const useLabels = () => useQuery<string[]>(['GET/labels'], async () => {
  const { data } = await req.get('/prometheus/labels')
  const dataJson = JSON.parse(data)
  return dataJson.data ?? []
})

export default {}

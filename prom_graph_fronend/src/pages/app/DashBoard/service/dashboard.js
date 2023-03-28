import { useQuery } from 'react-query'
import req from '../../../../api/request'

export const useDashboardList = (page, limit) => useQuery(['GET/dashboard', page], async () => {
  const result = await req.get(`/dashboard?page=${page}&limit=${limit}`)
  return JSON.parse(result.data)
})

export default {}

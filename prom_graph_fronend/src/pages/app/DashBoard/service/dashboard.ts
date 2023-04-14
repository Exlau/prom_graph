import { useQuery } from 'react-query'
import { DashboardProps } from '../DashboardTypes'
import req from '../../../../api/request'

export const useDashboardList = (page: number, limit: number) => useQuery(['GET/dashboard', page], async () => {
  const result = await req.get(`/dashboard?page=${page}&limit=${limit}`)
  return JSON.parse(result.data)
})

export const getDashboardById = (id: string): Promise<DashboardProps> => req.get(`/dashboard?id=${id}`).then(({ data }) => JSON.parse(data))

export const updateDashboardById = (id: string, newDashboard: DashboardProps) => {
  console.log('updatadashL: ', newDashboard)
  return req.put('/dashboard', JSON.stringify(newDashboard))
}

export default {}

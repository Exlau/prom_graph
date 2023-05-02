import { useQuery } from 'react-query'
import { DashboardProps } from '../DashboardTypes'
import req from '../../../../api/request'

export const useDashboardList = (page: number, limit: number) => useQuery(['GET/dashboardList', page], async () => {
  const result = await req.get(`/dashboard?page=${page}&limit=${limit}`)
  return JSON.parse(result.data)
})

export const useDashboardById = (id: string) => useQuery<DashboardProps>(['GET/dashboardById', id, {}], async () => {
  const { data } = await req.get<string>(`/dashboard?id=${id}`)
  return JSON.parse(data)
})

export const getDashboardById = async (id: string) => {
  const { data } = await req.get<string>(`/dashboard?id=${id}`)
  return JSON.parse(data)
}

export const updateDashboardById = (id: string, newDashboard: DashboardProps) => req.put('/dashboard', JSON.stringify(newDashboard))

export default {}

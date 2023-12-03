import req from '../../../../api/request'
import { ContainerInfo } from '../types'

export const getContainersList = async (): Promise<ContainerInfo[]> => {
  const { data } = await req.get<string>('/docker/containers')
  return JSON.parse(data)
}

export const restartContainer = async (containerId: string): Promise<any> => {
  const { data } = await req.post(
    '/docker/container/restart',
    JSON.stringify({
      id: containerId,
    }),
  )
  return data
}

export default {}

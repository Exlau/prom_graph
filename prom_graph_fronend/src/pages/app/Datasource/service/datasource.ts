import req from '../../../../api/request'
import { BuildInfo, RuntimeInfo, TSDBInfo } from '../types'

export const getRuntimeInformation = async (): Promise<RuntimeInfo> => {
  const { data } = await req.get<string>('/prometheus/runtimeinfo')
  return JSON.parse(data)
}

export const getBuildInformation = async (): Promise<BuildInfo> => {
  const { data } = await req.get<string>('/prometheus/buildinfo')
  return JSON.parse(data)
}

export const getTSDBInformation = async (): Promise<TSDBInfo> => {
  const { data } = await req.get<string>('/prometheus/tsdbinfo')
  return JSON.parse(data)
}

export const getDatasourceConfig = async (): Promise<any> => {
  const { data } = await req.get<string>('/prometheus/config')
  const parsedData = JSON.parse(data)
  return parsedData.yaml
}

export const reloadPromethes = async (config: string): Promise<any> => {
  const { data } = await req.post('/prometheus/config', config)
  return JSON.parse(data)
}

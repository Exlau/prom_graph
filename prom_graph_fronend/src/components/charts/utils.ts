import { ChartType } from '../../pages/app/DashBoard/panelTypes'

type EchartsType = 'line' | 'bar'

const chartTypeMap = {
  lineseries: 'line' as EchartsType,
  timeseries: 'line' as EchartsType,
  vector: 'line' as EchartsType,
}

export const getEchartType = (prometheusType: ChartType):EchartsType => chartTypeMap[prometheusType]

export default {}

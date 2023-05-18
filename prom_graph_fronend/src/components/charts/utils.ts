import { ChartType } from '../../pages/app/DashBoard/panelTypes'
import { EchartsType } from './types'

// type EchartsType = 'line' | 'bar'

const chartTypeMap = {
  lineseries: 'line' as EchartsType,
  timeseries: 'line' as EchartsType,
  matrix: 'line' as EchartsType,
  vector: 'line' as EchartsType,
  histogram: 'bar' as EchartsType,
}

export const getEchartType = (prometheusType: ChartType):EchartsType => chartTypeMap[prometheusType]

export default {}
// [
//   1683878999334,
//   1683879013334,
//   1683879027334,
//   1683879041334,
//   1683879055334,
//   1683879069334,
//   1683879083334,
//   1683879097334,
//   1683879111334,
//   1683879125334,
//   1683879139334,
//   1683879153334,
//   1683879167334,
//   1683879181334,
//   1683879195334,
//   1683879209334,
//   1683879223334,
//   1683879237334,
//   1683879251334,
//   1683879265334,
//   1683879279334,
//   1683879293334,
//   1683879307334,
//   1683879321334,
//   1683879335334,
//   1683879349334,
// ]

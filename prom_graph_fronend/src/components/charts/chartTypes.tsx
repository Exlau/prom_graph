import { ChartType } from '../../pages/app/DashBoard/panelTypes'

interface ChartOption{
}

export interface ChartAdaptorOption{
  title:string;
  type: 'lineseries' | 'timeseries' | 'vector';
  xData: Array<any>;
  seriesData:Array<any>
}

export interface VectorData {
  value:string,
  time:string
}

export interface VectorTableData {
  [key:string]: VectorData[];
}

export interface ChartPanelData {
  metric:object;
  xData:any[];
  seriesData:any[];
}

export type PanelData = VectorTableData | ChartPanelData

interface PromErrorMessage {
  status?:string;
  errorType?:string;
  error?:string;
}

export interface PrometheusResult {
  result?: PanelData | PanelData[];
  resultType?: ChartType;
  message?:PromErrorMessage
}

// export interface PrometheusError {
//   status:string;
//   errorType:string;
//   error:string;
// }

// export type PrometheusResult = PrometheusData | PrometheusError

export interface LineChartConfig {

}

export interface LineChartOption extends ChartOption{

}

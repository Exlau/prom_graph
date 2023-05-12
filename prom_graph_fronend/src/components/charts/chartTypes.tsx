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
  xData:any[],
  yData:any[],
}

export type PanelData = VectorTableData | ChartPanelData

export interface PrometheusResult {
  result: PanelData;
  resultType: ChartType;
}

export interface LineChartConfig {

}

export interface LineChartOption extends ChartOption{

}

import { EchartsType } from '../../../components/charts/types'

export type ChartType = 'timeseries' | 'lineseries' | 'vector' | 'histogram';

export interface GridPos {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface PanelEditorProps {
  id: string;
}

export interface Datasource {
  url: string;
}

export interface Target {
  datasource: Datasource;
  expr: string;
}

export interface ItemStyles {
  color?:string;
  borderWidth?:number;
  borderType?:string;
  borderDashOffset?:string;
  borderCap?:string;
}

export interface LineStyle {
  color?:string;
  width?:number;
  type:string;
  opacity:number;
}

export interface OuterStyles {
  smooth?:boolean
}

export interface PanelStyles {
  itemStyle?:ItemStyles
  outerStyle?:OuterStyles
  lineStyle?: LineStyle
}

export interface PanelProps {
  id: string;
  type: ChartType;
  panelStyles?:PanelStyles;
  title: string;
  datasource: Datasource;
  targets: Target[];
  gridPos: GridPos;
}

export interface LabelFilter {
  label:string;
  option:string;
  value:string;
}

export interface Caculate{
  option:string;
  value:string;
}

export interface PanelDSL {
  dimension:string;
  metric:string;
  labelFilters: LabelFilter[];
  caculate:Caculate[];
}

export interface PanelStylesForm {
  styleName:string;
  label:string;
  renderEchartTypes:EchartsType[];
  renderCpn:any;
}

export interface PanelSettingsForm {
  settingName:string;
  label:string;
  renderCpn:any;
}

export interface OuterStylesForm extends PanelStylesForm {

}

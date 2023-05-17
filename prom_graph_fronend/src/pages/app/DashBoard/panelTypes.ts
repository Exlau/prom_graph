export type ChartType = 'timeseries' | 'lineseries' | 'vector';

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

// interface FieldConfigDefaults{
//   custom:
// }

// interface FieldConfig{
//   defaults:,
// }

export interface PanelProps {
  id: string;
  type: ChartType;
  title: string;
  datasource: Datasource;
  targets: Target[];
  gridPos: GridPos;
  // fieldConfig:FieldConfig
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

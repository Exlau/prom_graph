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

interface Datasource {
  url: string;
}

interface Target {
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

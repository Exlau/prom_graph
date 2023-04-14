type ChartType = 'timeseries' | 'lineseries';

export interface GridPos {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface PanelEditorProps {
  id: string;
}

export interface PanelProps {
  id: string;
  type: ChartType;
  title: string;
  gridPos: GridPos;
}

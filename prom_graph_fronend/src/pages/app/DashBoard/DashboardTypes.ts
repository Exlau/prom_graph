import { PanelProps } from './panelTypes'

export interface DashboardProps {
  _id: string;
  owner:string;
  title:string;
  panels: PanelProps[];
  description?:string;
  tags?:string;
}

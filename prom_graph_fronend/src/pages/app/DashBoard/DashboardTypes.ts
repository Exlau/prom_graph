import { PanelProps } from '../../../components/panel/panelTypes'

export interface DashboardProps {
  _id: string;
  owner:string;
  title:string;
  panels: PanelProps[];
}

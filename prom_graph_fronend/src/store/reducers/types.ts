import { DashboardProps } from '../../pages/app/DashBoard/DashboardTypes'

export interface DashboardState {
  dashboardJson: DashboardProps | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface RootState {
  dashboardReducer: DashboardState
}

/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
// @ts-ignore
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { DashboardProps } from '../../pages/app/DashBoard/DashboardTypes'
import {
  getDashboardById,
  updateDashboardById,
} from '../../pages/app/DashBoard/service/dashboard'
import { DashboardState, RootState } from './types'

const initialState: DashboardState = {
  dashboardJson: {
    _id: '',
    title: '',
    panels: [],
    owner: '',
  },
  status: 'idle',
  error: null,
}

export const fetchDashboardById = createAsyncThunk(
  'dashboard/fetchDashboardById',
  async (id: string) => {
    const data = await getDashboardById(id)
    return data
  },
)

export const saveDashboardJson = createAsyncThunk(
  'dashboard/saveDashboardJson',
  async (_, { getState }) => {
    const state = getState() as RootState
    const dashboardJson = state?.dashboardReducer?.dashboardJson as DashboardProps
    const { _id } = dashboardJson
    await updateDashboardById(_id, dashboardJson)
    return dashboardJson
  },
)

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDashboardJson: (state: DashboardState, action: any) => {
      state.dashboardJson = action.payload
    },
    setPanelJson: (state:DashboardState, action:any) => {
      const panelJson = action.payload
      if (state.dashboardJson?.panels && state.dashboardJson?.panels.length !== 0) {
        const editIndex = state.dashboardJson.panels.findIndex((panel) => panel.id === panelJson.id)
        if (editIndex !== -1) {
          state.dashboardJson.panels[editIndex] = panelJson
        } else {
          state.dashboardJson.panels.push(panelJson)
        }
      } else {
        // @ts-ignore
        state.dashboardJson.panels = [
          { ...panelJson },
        ]
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardById.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchDashboardById.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.dashboardJson = action.payload ?? null
      })
      .addCase(fetchDashboardById.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? null
      })
      .addCase(saveDashboardJson.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(saveDashboardJson.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.dashboardJson = action.payload
      })
      .addCase(saveDashboardJson.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? null
      })
  },
})

export const { setDashboardJson, setPanelJson } = dashboardSlice.actions
export const dashboardReducer = dashboardSlice.reducer

export default dashboardSlice.reducer

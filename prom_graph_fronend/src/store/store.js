import { configureStore } from '@reduxjs/toolkit'
import { dashboardReducer } from './reducers'

const Store = configureStore({
  reducer: {
    dashboardReducer,
  },
})

export default Store

import React from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import router from './routes/router'
import 'antd/dist/reset.css'
import './index.css'
import Store from './store/store'

const container = document.getElementById('root')
const root = createRoot(container)
const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
      },
    },
  },
)

root.render(
  <Provider store={Store}>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1677ff',
          colorBgElevated: '#F0F2F5',
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ConfigProvider>
  </Provider>,
)

import React from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router'
import router from './routes/router'
import 'antd/dist/reset.css'
import './index.css'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#1677ff',
        colorBgElevated: '#F0F2F5',
      },
    }}
  >
    <RouterProvider router={router} />
  </ConfigProvider>,
)

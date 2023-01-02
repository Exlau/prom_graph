import React from 'react'
import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router'
import 'antd/dist/reset.css'
import router from './routes/router'
import './App.css'

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1677ff',
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

import React from 'react'
import { Button, ConfigProvider } from 'antd'
import 'antd/dist/reset.css'

function Root() {
  return (
    <div className="App">
      <Button type="primary">Button</Button>
    </div>
  )
}

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1677ff',
        },
      }}
    >
      <Root />
    </ConfigProvider>
  )
}

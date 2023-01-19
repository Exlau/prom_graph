import { theme } from 'antd'
import React from 'react'
import './index.css'

function loadingAnimation() {
  const {
    token: { colorPrimary },
  } = theme.useToken()

  return (
    <div className="container" style={{ color: colorPrimary }}>
      <div className="loading" style={{ borderRightColor: colorPrimary }} />
    </div>
  )
}

export default loadingAnimation

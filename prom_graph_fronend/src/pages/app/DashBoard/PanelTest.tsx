import React, { useRef } from 'react'
import { Card } from 'antd'
import { useNavigate } from 'react-router'
import ChartTest from '../../../components/charts/ChartTest'

function PanelTest1({ id, title }:any) {
  const navigateFunc = useNavigate()
  const wrapperRef = useRef<any>()

  return (
    <Card
      title={title}
      ref={wrapperRef}
      bodyStyle={{ height: '90%', width: '100%' }}
      style={{ width: '700px', height: '400px' }}
      onDoubleClick={() => {
        navigateFunc(`?panelId=${id}`)
      }}
      hoverable
    >
      <div
        style={{
          height: '100%',
          width: '100%',
          textAlign: 'center',
          overflow: 'auto',
        }}
        className="cancel-draggable"
      >
        <ChartTest />
      </div>
    </Card>
  )
}

export { PanelTest1 }
export default PanelTest1

import React from 'react'
import GridLayout from 'react-grid-layout'
import { LineChart } from '../../../components/charts'
import './index.css'

function DashBoard() {
  const layout = [
    {
      i: 'd', x: 4, y: 0, w: 4, h: 12,
    },
    {
      i: 'e', x: 4, y: 0, w: 4, h: 12,
    },
    {
      i: 'f', x: 4, y: 0, w: 4, h: 12,
    },
  ]

  return (
    <div style={{
      width: '100%', height: '100%', position: 'absolute',
    }}
    >
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={2400}
      >
        <div key="d">
          <LineChart title="temp chart" xData={['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']} seriesData={[5, 20, 36, 10, 10, 20]} />
        </div>
        <div key="e">
          <LineChart title="temp chart" xData={['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']} seriesData={[5, 20, 36, 10, 10, 20]} />
        </div>
        <div key="f">
          <LineChart title="temp chart" xData={['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']} seriesData={[5, 20, 36, 10, 10, 20]} />
        </div>

      </GridLayout>
    </div>
  )
}

export default DashBoard

import React, { useEffect } from 'react'
import GridLayout from 'react-grid-layout'
import { LineChart } from '../../../components/charts'
import './DashboardDetail.css'

function DashboardDetail() {
  useEffect(() => {
    // TODO: get dashboard from backend
  }, [])

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

  const handleLayoutChange = (e:any) => {
    console.log('layoutchange: ', e)
  }
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative',
    }}
    >
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={2400}
        onLayoutChange={handleLayoutChange}
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

export default DashboardDetail

import React, { useRef } from 'react'
import { Card } from 'antd'
import { useNavigate } from 'react-router'
// import echarts from '../charts/basic'

function PanelMini({ id }: {id: string}) {
  const chartRef: any = useRef()
  const wrapperRef: any = useRef()
  const navigateFunc = useNavigate()

  // useEffect(() => {
  // const chart = echarts.init(chartRef.current) // echart初始化容器
  // const option = {
  //   xAxis: {
  //     type: 'category',
  //     data: xData,
  //   },
  //   yAxis: {
  //     type: 'value',
  //   },
  //   series: [
  //     {
  //       data: seriesData,
  //       type: 'line',
  //     },
  //   ],
  // }
  // chart.setOption(option)

  //   const ro = new ResizeObserver((e) => {
  //     chart.resize({
  //       width: e[0].contentRect.width * 0.8,
  //       height: e[0].contentRect.height * 0.8,
  //     })
  //   })
  //   ro.observe(wrapperRef?.current)
  // }, [xData, seriesData])

  return (
    <Card
      title="Panel title"
      ref={wrapperRef}
      style={{ height: '100%', width: '100%' }}
      bodyStyle={{ height: '80%', width: '80%' }}
      onClick={() => {
        navigateFunc(`panel/${id}`)
      }}
      hoverable
    >
      <div
        style={{ height: '80%', width: '50%' }}
        ref={chartRef}
        className="chart"
      />
    </Card>
  )
}

export { PanelMini }
export default PanelMini

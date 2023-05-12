import React, { useRef, useEffect } from 'react'
import echarts, { ECOption } from './basic'
import { getEchartType } from './utils'
import { ChartPanelData } from './chartTypes'
import { ChartType } from '../../pages/app/DashBoard/panelTypes'

function ChartAdapter({ panelData, type }: {panelData:ChartPanelData, type:ChartType}) {
  const { xData, yData } = panelData
  const chartRef: any = useRef()
  const wrapperRef: any = useRef()

  useEffect(() => {
    const chart = echarts.init(chartRef.current) // echart初始化容器
    const option:ECOption = {
      xAxis: {
        type: 'category',
        data: xData,
      },
      yAxis: {
        type: 'time',
      },
      series: [
        {
          data: yData,
          type: getEchartType(type),
        },
      ],
    }
    chart.setOption(option)

    const ro = new ResizeObserver((e) => {
      chart.resize({
        width: e[0].contentRect.width * 0.8,
        height: e[0].contentRect.height * 0.8,
      })
    })
    ro.observe(wrapperRef?.current)
  }, [xData, yData])

  return (
    <div />
  )
}

export default ChartAdapter

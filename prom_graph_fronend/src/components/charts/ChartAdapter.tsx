/* eslint-disable max-len */
import React, {
  useRef, useEffect, forwardRef, useMemo,
} from 'react'
// import echarts, { ECOption } from './basic'
import * as echarts from 'echarts'
import { ECOption } from './basic'
import { getEchartType } from './utils'
import { ChartPanelData } from './chartTypes'
import { ChartType, PanelStyles } from '../../pages/app/DashBoard/panelTypes'

function ChartAdapterWrapper(
  {
    panelData,
    type,
    panelStyles,
  }: {panelData: ChartPanelData[]; type: ChartType; panelStyles: PanelStyles},
  { current }: any,
) {
  const seriesData = useMemo(
    () => panelData.map((v: ChartPanelData) => ({
      data: v?.seriesData?.map((yData: any, i: number) => [
        new Date(v?.xData[i]),
        yData,
      ]),
      showSymbol: false,
      type: getEchartType(type),
      itemStyle: panelStyles?.itemStyle,
      lineStyle: panelStyles?.lineStyle,
      ...panelStyles?.outerStyle,
    })),
    [panelStyles, panelData, type],
  )
  const chartRef: any = useRef()

  useEffect(() => {
    const chart = echarts.init(chartRef.current) // echart初始化容器
    const option: ECOption = {
      tooltip: {
        trigger: 'axis',
      },
      // @ts-ignore
      xAxis: [
        {
          type: 'time',
        },
      ],
      yAxis: {
        type: 'value',
      },
      splitLine: {
        show: true,
      },
      dataZoom: [
        {
          type: 'slider',
          show: true,
          xAxisIndex: [0],
        },
      ],
      // @ts-ignore
      series: [...seriesData],
    }
    chart.setOption(option)
    try {
      const ro = new ResizeObserver((e) => {
        chart.resize({
          width: e[0].contentRect.width * 0.9,
          height: e[0].contentRect.height * 0.9,
        })
      })
      ro.observe(current)
    } catch (e) {
      console.log(e)
    }
  }, [panelData, seriesData])

  return (
    <div ref={chartRef} style={{ zIndex: 999, height: '100%', width: '100%' }} />
  )
}

export const ChartAdapter = forwardRef(ChartAdapterWrapper)
export default forwardRef(ChartAdapterWrapper)

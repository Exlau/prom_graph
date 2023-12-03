/* eslint-disable max-len */
import React, {
  useRef, useEffect, forwardRef,
} from 'react'
// import echarts, { ECOption } from './basic'
import * as echarts from 'echarts'
import { ECOption } from './basic'

function ChartAdapterWrapper() {
  const chartRef: any = useRef()

  useEffect(() => {
    const chart = echarts.init(chartRef.current) // echart初始化容器
    const option: ECOption = {
      title: {
        text: 'Stacked Area Chart',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985',
          },
        },
      },
      legend: {
        data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: 'Email',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: 'Union Ads',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: 'Video Ads',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
          name: 'Direct',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: 'Search Engine',
          type: 'line',
          stack: 'Total',
          label: {
            show: true,
            position: 'top',
          },
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: [820, 932, 901, 934, 1290, 1330, 1320],
        },
      ],
    }
    chart.setOption(option)
    try {
      const ro = new ResizeObserver((e) => {
        chart.resize({
          width: e[0].contentRect.width * 0.9,
          height: e[0].contentRect.height * 0.9,
        })
      })
      ro.observe(chartRef.current)
    } catch (e) {
      console.log(e)
    }
  }, [])

  return (
    <div ref={chartRef} style={{ zIndex: 999, height: '100%', width: '100%' }} />
  )
}

export const ChartAdapter = forwardRef(ChartAdapterWrapper)
export default forwardRef(ChartAdapterWrapper)

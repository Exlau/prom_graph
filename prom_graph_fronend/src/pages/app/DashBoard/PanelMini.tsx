import React, {
  useEffect, useMemo, useRef, useState,
} from 'react'
import { Card } from 'antd'
import { useNavigate } from 'react-router'
import { PanelProps } from './panelTypes'
import { queryPrometheus } from './service/panel'
import ChartAdaptor from '../../../components/charts/ChartAdapter'
import { ChartPanelData, PrometheusResult, VectorTableData } from '../../../components/charts/chartTypes'
import VectorTable from '../../../components/charts/VectorTable'
// import echarts from '../charts/basic'

function PanelMini({
  id, title, targets,
}: PanelProps) {
  const chartRef: any = useRef()
  const wrapperRef: any = useRef()
  const navigateFunc = useNavigate()
  const queryArr = useMemo(() => targets?.map(({ expr }) => expr), [targets])
  const [querys, setQuerys] = useState<any>([])
  const [promResult, setPromResult] = useState<PrometheusResult[]>([])

  useEffect(() => {
    const queryPromiseArr = queryArr?.map((query) => () => new Promise((resolve) => {
      queryPrometheus(query).then((res) => {
        resolve(res)
      })
    }))

    setQuerys(queryPromiseArr)
  }, [])

  useEffect(() => {
    Promise.all(querys?.map((fn:any) => fn())).then((res) => {
      setPromResult(res)
    })
  }, [querys])

  return (
    <Card
      title={title}
      ref={wrapperRef}
      style={{
        height: '100%', width: '100%',
      }}
      bodyStyle={{ height: '90%', width: '100%' }}
      onDoubleClick={() => {
        navigateFunc(`panel/${id}`)
      }}
      hoverable
    >
      {
        // eslint-disable-next-line no-nested-ternary
        promResult?.length ? promResult[0]?.resultType === 'vector'
          ? (
            <VectorTable
              style={{
                height: '100%', width: '100%', textAlign: 'center', overflow: 'auto',
              }}
              panelData={promResult[0]?.result as VectorTableData}
            />
          )
          : (
            <ChartAdaptor
              panelData={promResult[0]?.result as ChartPanelData}
              type={promResult[0]?.resultType}
            />
          )
          : 'no panel'
      }
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

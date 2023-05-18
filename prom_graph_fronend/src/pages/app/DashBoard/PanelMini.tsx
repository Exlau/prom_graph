import React, {
  useMemo, useRef,
} from 'react'
import { Card } from 'antd'
import { useNavigate } from 'react-router'
import { PanelProps } from './panelTypes'
import { usePanelData } from './service/panel'
// import ChartAdapter from '../../../components/charts/ChartAdapter'
import {
  ChartPanelData,
  // PrometheusResult,
  VectorTableData,
} from '../../../components/charts/chartTypes'
// import VectorTable from '../../../components/charts/VectorTable'
import { ChartAdapter, VectorTable } from '../../../components/charts'

function PanelMini({
  id, title, targets, type, panelStyles,
}: PanelProps) {
  const navigateFunc = useNavigate()
  const wrapperRef = useRef<any>()
  const queryArr = useMemo(() => targets?.map(({ expr }) => expr), [targets])
  const { data: promResult } = usePanelData(queryArr, type)

  return (
    <Card
      title={title}
      ref={wrapperRef}
      style={{
        height: '100%',
        width: '100%',
      }}
      bodyStyle={{ height: '90%', width: '100%' }}
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
        {
        // eslint-disable-next-line no-nested-ternary
        promResult?.length && !promResult[0].message?.error ? (
          promResult[0]?.resultType === 'vector' ? (
            <VectorTable
              panelData={promResult[0]?.result as VectorTableData}
            />
          ) : (
            <ChartAdapter
              ref={wrapperRef}
              panelData={(promResult[0].result ?? []) as ChartPanelData[]}
              panelStyles={panelStyles ?? {}}
              type={promResult[0]?.resultType ?? 'lineseries'}
            />
          )
        ) : (
          promResult[0]?.message?.error
        )
      }
      </div>
    </Card>
  )
}

export { PanelMini }
export default PanelMini

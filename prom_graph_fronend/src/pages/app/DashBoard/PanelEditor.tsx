/* eslint-disable prefer-destructuring */
import React, {
  useEffect, useState, useRef, useCallback, useMemo,
} from 'react'
import { Row, Col, Button } from 'antd'
import './PanelEditor.css'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { BackwardFilled } from '@ant-design/icons'
import { DashboardProps } from './DashboardTypes'
import {
  Caculate,
  LabelFilter,
  PanelDSL,
  PanelProps,
  Target,
} from './panelTypes'
import { setPanelJson } from '../../../store/reducers/dashboardReducer'
import QueryForm from './QueryForm'
import { PanelMini } from './PanelMini'
import PanelStyleForm from './PanelStyleForm'
import { getEchartType } from '../../../components/charts/utils'

const initialPanel: PanelProps = {
  id: '',
  type: 'timeseries',
  title: '',
  datasource: {
    url: '',
  },
  targets: [],
  gridPos: {
    x: -1,
    y: -1,
    w: -1,
    h: -1,
  },
}

const parsePromQLtoDSL = (promQL: string): PanelDSL => {
  const panelDSL: PanelDSL = {
    dimension: '',
    metric: '',
    labelFilters: [],
    caculate: [],
  }

  // 提取维度、度量和标签过滤器
  const matches = promQL?.match(
    /(.+)\((.+)\{([^}]+)\}\[.+]\)\s*(\/|\*|\+|-)\s*(\d+)/,
  )
  if (matches) {
    panelDSL.dimension = matches[1]
    panelDSL.metric = matches[2]

    // 提取标签过滤器
    const labelFiltersStr = matches[3]
    const labelFilterRegex = /([a-zA-Z_][a-zA-Z0-9_]*?)="([^"]+?)"/g
    let labelFilterMatch
    // eslint-disable-next-line no-cond-assign
    while ((labelFilterMatch = labelFilterRegex.exec(labelFiltersStr)) !== null) {
      const labelKey = labelFilterMatch[1]
      const labelValue = labelFilterMatch[2]

      // 将标签过滤器的形式转换为对象形式
      const labelFilter: LabelFilter = {
        label: labelKey,
        option: '=',
        value: labelValue,
      }
      panelDSL.labelFilters.push(labelFilter)
    }

    // 提取算术操作
    const operator = matches[4]
    const value = matches[5]
    const caculate: Caculate = {
      option: operator,
      value,
    }
    panelDSL.caculate.push(caculate)
  }

  return panelDSL
}

const parseDSLToPromQL = (panelDSL: PanelDSL): string => {
  const {
    metric, labelFilters, dimension, caculate,
  } = panelDSL

  // 构建 PromQL 查询字符串的基本部分
  let promQL = `${dimension}(${metric}`

  // 添加标签过滤器
  labelFilters.forEach((filter) => {
    const { label, option, value } = filter
    promQL += `{${label}${option}"${value}"}`
  })

  // 结束 PromQL 查询字符串
  promQL += ')'

  // 添加计算部分
  caculate.forEach((calc) => {
    const { option, value } = calc
    promQL += `${option}${value}`
  })

  return promQL
}

function PanelEditor({ dashboardData }: {dashboardData: DashboardProps}) {
  const dispatch = useDispatch()
  const wrapperRef: any = useRef()
  const [searchParams, setSearchParams] = useSearchParams()
  const panelId = useMemo(() => searchParams.get('panelId'), [searchParams])
  const [panel, setPanel] = useState<PanelProps>(initialPanel)

  useEffect(() => {
    // Set current panel
    setPanel(
      dashboardData?.panels?.find((p: PanelProps) => p.id === panelId)
        ?? initialPanel,
    )
  }, [dashboardData])

  const onQueryExprChange = useCallback(
    (value: any) => {
      // eslint-disable-next-line max-len
      const newPanelTagets: Target[] = panel?.targets
        ? [{ ...panel.targets[0], expr: parseDSLToPromQL(value) }]
        : [
          {
            expr: parseDSLToPromQL(value),
            datasource: { url: '' },
          },
        ]
      const newPanel = { ...panel, targets: newPanelTagets }
      dispatch(setPanelJson<any>(newPanel))
    },
    [panel],
  )

  const onPanelStyleChange = useCallback(
    (value: any) => {
      // eslint-disable-next-line max-len
      const newPanel = {
        ...panel,
        title: value?.title ?? '',
        type: value?.type ?? 'line',
        panelStyles: {
          itemStyle: value?.itemStyle,
          outerStyle: value?.outerStyle,
          lineStyle: value?.lineStyle,
        },
      }
      dispatch(setPanelJson<any>(newPanel))
    },
    [panel],
  )

  return (
    <div style={{ height: '100%', overflowY: 'auto' }}>
      <Row gutter={16} className="panel-editor-root">
        <Col
          style={{ height: '100%', overflowY: 'auto' }}
          span={19}
          className="preview-editor"
        >
          <Row style={{ zIndex: 999 }}>
            <Button
              type="primary"
              size="large"
              icon={<BackwardFilled />}
              onClick={() => {
                searchParams.delete('panelId')
                setSearchParams(searchParams.toString(), { replace: true })
              }}
            >
              Back
            </Button>
          </Row>
          <Row
            style={{
              height: '700px',
              width: '100%',
              padding: 'px',
              overflow: 'auto',
            }}
            ref={wrapperRef}
          >
            <PanelMini {...panel} />
          </Row>
          <Row
            style={{
              height: '800px',
              width: '100%',
              padding: '10px',
              overflow: 'auto',
            }}
          >
            <QueryForm
              dsl={parsePromQLtoDSL(
                panel?.targets ? panel?.targets[0]?.expr ?? '' : '',
              )}
              onFinish={onQueryExprChange}
            />
          </Row>
        </Col>
        <Col style={{ height: '100%' }} span={5} className="config">
          <PanelStyleForm
            type={getEchartType(panel.type)}
            onFinish={onPanelStyleChange}
            panelStylesInitialValue={panel?.panelStyles ?? {}}
          />
        </Col>
      </Row>
    </div>
  )
}

export { PanelEditor }
export default PanelEditor

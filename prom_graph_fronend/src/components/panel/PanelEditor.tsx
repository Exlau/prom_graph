import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Row, Col } from 'antd'
import './PanelEditor.css'
import { useSelector, useDispatch } from 'react-redux'
import { LineChart } from '../charts'
import { DashboardProps } from '../../pages/app/DashBoard/DashboardTypes'
import { PanelProps } from './panelTypes'
import { fetchDashboardById } from '../../store/reducers'
import QueryForm from './QueryForm'

type RouteParams = {
  dashboardId: string;
  panelId: string;
};

function PanelEditor() {
  const dispatch = useDispatch()
  const { dashboardId, panelId } = useParams<RouteParams>()
  const [panel, setPanel] = useState<PanelProps | undefined>({
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
  })
  const dashboardData: DashboardProps = useSelector(
    // @ts-ignore
    (state) => state?.dashboardReducer?.dashboardJson ?? { data: undefined },
  )

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchDashboardById(dashboardId ?? ''))
  }, [dashboardId])

  useEffect(() => {
    setPanel(
      dashboardData?.panels.find((p: PanelProps) => p.id === panelId),
    )
  }, [dashboardData])

  return (
    <Row gutter={16} className="panel-editor-root">
      <Col span={18} className="preview-editor">
        <Row style={{ height: '50%', padding: '10px' }}>
          <LineChart title={panel?.title} xData={[]} seriesData={[]} />
        </Row>
        <Row style={{ height: '50%', padding: '10px' }}><QueryForm /></Row>
      </Col>
      <Col span={6} className="config" />
    </Row>
  )
}

export { PanelEditor }
export default PanelEditor

/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import GridLayout from 'react-grid-layout'
import { Divider, Button } from 'antd'
// import { LineChart } from '../../../components/charts'
import { PanelMini } from '../../../components/panel'
import './DashboardDetail.css'
import { getDashboardById, updateDashboardById } from './service/dashboard'
import { PanelProps, GridPos } from '../../../components/panel/panelTypes'
import { DashboardProps } from './DashboardTypes'

function DashboardDetail() {
  const { id = '' } = useParams()
  const [dashboardJson, setDashboardJson] = useState<DashboardProps>({
    _id: '',
    owner: '',
    title: '',
    panels: [],
  })

  const [mount, setMount] = useState<boolean>(true)
  const [panelList, setPanelList] = useState<PanelProps[]>([])
  const [panelLayout, setPanelLayout] = useState<(GridPos & {i: string})[]>([])

  useEffect(() => {
    getDashboardById(id).then((data) => {
      const layout = data?.panels?.map(({ id: i, gridPos }) => {
        const {
          x, y, w, h,
        } = gridPos
        return {
          i,
          x,
          y,
          w,
          h,
        }
      })

      const {
        _id, owner, title, panels,
      } = data

      setDashboardJson({
        _id,
        owner,
        title,
        panels,
      })
      setPanelList(data.panels)
      setPanelLayout(layout)
    })
  }, [])

  const handleLayoutChange = (pos: (GridPos & {i: string})[]) => {
    if (mount) {
      setMount(false)
      return
    }
    const newLayout = pos.map(({
      i, x, y, w, h,
    }) => ({
      i,
      x,
      y,
      w,
      h,
    }))

    const newDashboardJson = { ...dashboardJson }
    pos.forEach(({
      i, x, y, w, h,
    }) => {
      newDashboardJson?.panels?.forEach((p) => {
        if (p.id === i) {
          // eslint-disable-next-line no-param-reassign
          p.gridPos = {
            x,
            y,
            w,
            h,
          }
        }
      })
    })

    setPanelLayout(newLayout)
    setDashboardJson(newDashboardJson)
  }

  const handleSaveDashboard = () => {
    updateDashboardById(id, dashboardJson).then((res) => {
      console.log('res: ', res)
    })
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      <div className="dashboard-options">
        <Button onClick={handleSaveDashboard}>Save Dashboard</Button>
      </div>
      <Divider />
      <GridLayout
        className="layout"
        layout={panelLayout}
        cols={12}
        rowHeight={30}
        width={2400}
        onLayoutChange={handleLayoutChange}
      >
        {panelList?.map((p) => (
          <div key={p.id}>
            <PanelMini />
          </div>
        ))}
      </GridLayout>
    </div>
  )
}

export default DashboardDetail

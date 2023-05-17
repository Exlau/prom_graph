/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import GridLayout from 'react-grid-layout'
import { Divider, Button } from 'antd'
import { cloneDeep } from 'lodash'
import { useSearchParams } from 'react-router-dom'
// eslint-disable-next-line import/no-extraneous-dependencies
import { nanoid } from 'nanoid'
import { PanelMini } from './PanelMini'
import './DashboardDetail.css'
// import { useDashboardById, updateDashboardById } from './service/dashboard'
import {
  fetchDashboardById,
  saveDashboardJson,
  setDashboardJson,
  setPanelJson,
} from '../../../store/reducers/dashboardReducer'
import { PanelProps, GridPos } from './panelTypes'
import { DashboardProps } from './DashboardTypes'
import { PanelEditor } from './PanelEditor'

function DashboardDetail() {
  const dispatch = useDispatch()
  const { id = '' } = useParams()
  const [searchParams] = useSearchParams()

  const [mount, setMount] = useState<boolean>(true)
  const [panelList, setPanelList] = useState<PanelProps[] | undefined>([])
  const [panelLayout, setPanelLayout] = useState<(GridPos & {i: string})[]>([])

  const dashboardData: DashboardProps = useSelector(
    // @ts-ignore
    (state) => state?.dashboardReducer?.dashboardJson ?? { data: undefined },
  )

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchDashboardById(id))
  }, [id])

  useEffect(() => {
    if (dashboardData === undefined) {
      return
    }
    // @ts-ignore
    const layout = dashboardData?.panels?.map(({ id: i, gridPos }) => {
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

    setPanelList(dashboardData?.panels)
    setPanelLayout(layout)
  }, [dashboardData])

  const handleLayoutChange = (pos: (GridPos & {i: string})[]) => {
    if (mount) {
      setMount(false)
      return
    }
    const newLayout = [...pos]

    const newDashboardJson = cloneDeep(dashboardData)

    pos.forEach(({
      i, x, y, w, h,
    }) => {
      newDashboardJson?.panels?.forEach((p: PanelProps) => {
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
    // @ts-ignore
    dispatch(setDashboardJson(newDashboardJson))
  }

  const handleCreatePanel = () => {
    const newPanel = {
      id: nanoid(),
      type: 'lineseries',
      title: '',
      datasource: { url: '' },
      targets: [],
      gridPos: {
        x: 0,
        y: 0,
        w: 8,
        h: 6,
      },
    } as PanelProps
    dispatch(setPanelJson<any>(newPanel))
  }

  const handleSaveDashboard = () => {
    // @ts-ignore
    dispatch(saveDashboardJson())
  }

  return (
    <div>
      {!searchParams.get('panelId') ? (
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
          }}
        >
          <div className="dashboard-options">
            <Button onClick={handleSaveDashboard}>Save Dashboard</Button>
            <Button onClick={handleCreatePanel}>Create Panel</Button>
          </div>
          <Divider />
          <GridLayout
            className="layout"
            layout={panelLayout}
            cols={12}
            rowHeight={30}
            width={2400}
            onLayoutChange={handleLayoutChange}
            draggableCancel=".cancel-draggable"
          >
            {panelList?.map((p) => (
              <div key={p.id}>
                <PanelMini {...p} />
              </div>
            ))}
          </GridLayout>
        </div>
      ) : (
        <PanelEditor dashboardData={dashboardData} />
      )}
    </div>
  )
}

export default DashboardDetail

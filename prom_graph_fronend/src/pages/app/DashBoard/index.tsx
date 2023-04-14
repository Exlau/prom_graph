/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Space, Avatar, List, Input, Button,
} from 'antd'
import { FolderAddOutlined } from '@ant-design/icons'
import { useDashboardList } from './service/dashboard'
import './index.css'
import { DashboardProps } from './DashboardTypes'

const position = 'bottom'

function DashBoard() {
  const [page, setPage] = useState(1)
  const { isLoading, error, data } = useDashboardList(page, 6)
  const navigateFunc = useNavigate()

  return (
    <Space direction="vertical" size="small" style={{ display: 'flex' }}>
      <Space size="middle">
        <Input.Search
          placeholder="Search Dashboard"
          enterButton="Search"
          size="large"
          loading
        />
        <Button
          type="primary"
          icon={<FolderAddOutlined />}
          size="middle"
          onClick={() => {
            navigateFunc('/home/newdashboard', {
              replace: true,
            })
          }}
        >
          New Dashboard
        </Button>
      </Space>
      <List
        pagination={{
          onChange: (p) => {
            setPage(p)
          },
          position,
          pageSize: 6,
          total: data?.totalDocs ?? 0,
        }}
      >
        <Space direction="vertical" size="small" style={{ display: 'flex' }}>
          {error
            ? 'error'
            : isLoading
              ? 'loading'
              : (data?.docs as DashboardProps[])?.map((item: any) => (
                <List.Item
                  className="dashboard-list-item"
                  style={{ backgroundColor: 'white' }}
                  onClick={() => {
                    navigateFunc(item._id)
                  }}
                >
                  <List.Item.Meta
                    avatar={<Avatar />}
                    title={<Link to="test">{item?.title}</Link>}
                    description={item?.description}
                  />
                </List.Item>
              ))}
        </Space>
      </List>
    </Space>
  )
}

export default DashBoard

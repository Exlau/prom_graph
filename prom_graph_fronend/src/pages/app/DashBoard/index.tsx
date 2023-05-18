/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Space, List, Input, Table, Button, Tag,
} from 'antd'
import { deleteDashboard, useDashboardList } from './service/dashboard'
import './index.css'
import { DashboardProps } from './DashboardTypes'
import DashboardNew from './DashboardNew'
import { getRandomHexColor } from './utils'

const position = 'bottom'

function DashBoard() {
  const [page, setPage] = useState(1)
  const { isLoading, error, data } = useDashboardList(page, 6)
  const navigateFunc = useNavigate()
  const tableData: any = useMemo(
    () => (data?.docs as DashboardProps[])?.map(
      ({
        _id, title, description, tags,
      }: any) => ({
        _id,
        title,
        description,
        tags,
      }),
    ),
    [data],
  )

  const columns: any[] = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags:string) => (
        tags?.length ? tags?.split(';')?.map((tag) => (
          <Tag color={getRandomHexColor()} key={tag}>
            {tag.toUpperCase()}
          </Tag>
        )) : tags
      ),

    },
    {
      title: 'Action',
      key: 'action',
      render: (_:any, record:any) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              navigateFunc(record._id)
            }}
          >
            View
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              console.log('delete: ', record._id)
              deleteDashboard(record._id)
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ]
  return (
    <Space direction="vertical" size="small" style={{ display: 'flex' }}>
      <Space size="middle">
        <Input.Search
          placeholder="Search Dashboard"
          enterButton="Search"
          size="large"
          loading
        />
        <DashboardNew />
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
          {error ? (
            'error'
          ) : isLoading ? (
            'loading'
          ) : (
            <Table
              columns={columns}
              dataSource={tableData}
              pagination={false}
            />
          )}
        </Space>
      </List>
    </Space>
  )
}

export default DashBoard

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router'
import type { MenuProps } from 'antd'
import {
  Breadcrumb, Layout, Menu, theme, Dropdown, Avatar,
} from 'antd'
import { UserOutlined } from '@ant-design/icons'
import Cookies from 'js-cookie'
import menuItems from './routes/menu'
import loadingAnimation from './components/LoadingAnimation'

import './AppLayout.css'

const { Header, Content, Sider } = Layout

const menus: MenuProps['items'] = menuItems.map((r) => ({
  key: r?.path,
  label: r?.label,
  children:
    r?.children?.map((subR) => ({
      key: subR?.path,
      label: subR.label,
    })) ?? undefined,
}))

const items: MenuProps['items'] = [
  {
    key: '1',
    danger: true,
    label: (
      <a
        onClick={(e) => {
          Cookies.remove('token')
          e.preventDefault()
        }}
      >
        Logout
      </a>
    ),
  },
]

function UserDropDown(props:any) {
  return (
    <Dropdown menu={{ items }} {...props}>
      <a onClick={(e) => e.preventDefault()}>
        <Avatar size="large" icon={<UserOutlined />} />
      </a>
    </Dropdown>
  )
}

function AppLayout() {
  const {
    token: { colorBgElevated },
  } = theme.useToken()

  const location = useLocation()

  const pathSnippets = location.pathname.split('/').filter((i) => i)

  const breadcrumbItems = pathSnippets.join('/')

  return (
    <Layout style={{ height: '100%' }}>
      <Header className="header">
        <div className="logo" />
        <UserDropDown className="user-dropdown" />
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{ height: '100%' }}
        >
          <Menu
            mode="inline"
            defaultOpenKeys={['sub1']}
            style={{
              height: '100%',
              borderRight: 0,
              fontFamily: 'deyi-black',
              color: 'white',
              letterSpacing: '2px',
              backgroundColor: '#001529',
            }}
            items={menus}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px', height: '100%' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>{breadcrumbItems}</Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgElevated,
              overflow: 'auto',
            }}
          >
            <Suspense fallback={React.createElement(loadingAnimation)}>
              <Outlet />
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default AppLayout

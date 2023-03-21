import React, { Suspense, useEffect } from 'react'
import type { MenuProps } from 'antd'
import {
  Breadcrumb, Layout, Menu, theme,
} from 'antd'
import { Outlet, useLocation } from 'react-router'
import menuItems from './routes/menu'
import loadingAnimation from './components/LoadingAnimation'
import testQuery from './api/test'

const { Header, Content, Sider } = Layout

const menus:MenuProps['items'] = menuItems.map((r) => ({
  key: r?.path,
  label: r?.label,
  children: r?.children?.map((subR) => ({
    key: subR?.path,
    label: subR.label,
  })) ?? undefined,
}))

function AppLayout() {
  const {
    token: { colorBgContainer, colorBgElevated },
  } = theme.useToken()

  const location = useLocation()

  const pathSnippets = location.pathname.split('/').filter((i) => i)

  useEffect(() => {
    testQuery().then((res) => {
      console.log('res: ', res)
    })
  }, [])

  const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
    return (
      <Breadcrumb.Item key={url}>
        {url}
      </Breadcrumb.Item>
    )
  })

  return (
    <Layout style={{ height: '100%' }}>
      <Header className="header">
        <div className="logo" />
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer, height: '100%' }}>
          <Menu
            mode="inline"
            defaultOpenKeys={['sub1']}
            style={{
              height: '100%',
              borderRight: 0,
              fontFamily: 'deyi-black',
              letterSpacing: '2px',
            }}
            items={menus}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px', height: '100%' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            {breadcrumbItems}
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgElevated,
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

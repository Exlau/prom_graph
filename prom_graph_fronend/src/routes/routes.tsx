import React, { createElement } from 'react'
import { RouteObject, Navigate } from 'react-router'

import ErrorPage from '../pages/ErrorPages'
import AppLayout from '../AppLayout'

const DashBoard = React.lazy(() => (import('../pages/app/DashBoard/index')))
const DashboardDetail = React.lazy(() => (import('../pages/app/DashBoard/DashboardDetail')))
const DashboardNew = React.lazy(() => (import('../pages/app/DashBoard/DashboardNew')))
const ChartDesign = React.lazy(() => (import('../pages/app/ChartDesign')))
const LoginPage = React.lazy(() => (import('../pages/Login/Login')))
const PanelEditor = React.lazy(() => (import('../components/panel/PanelEditor')))

const routes: RouteObject[] = [
  {
    path: '/login',
    element: createElement(LoginPage),
  },
  {
    path: '/',
    element: createElement(AppLayout),
    errorElement: createElement(ErrorPage),
    children: [
      {
        path: '',
        element: <Navigate to="home/dashboard" />,
      },
      {
        path: 'home',
        children: [
          {
            path: 'dashboard',
            element: <DashBoard />,
          },
          {
            path: 'newdashboard',
            element: <DashboardNew />,
          },
          {
            path: 'dashboard/:id',
            element: <DashboardDetail />,
          },
          {
            path: 'chartDesign',
            element: <ChartDesign />,
          },
          {
            path: 'panel/:id',
            element: <PanelEditor />,
          },
        ],
      },
    ],
  },
]

export default routes

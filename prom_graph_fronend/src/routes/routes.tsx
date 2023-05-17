import React, { createElement } from 'react'
import { RouteObject, Navigate } from 'react-router'

import ErrorPage from '../pages/ErrorPages'
import AppLayout from '../AppLayout'

const DashBoard = React.lazy(() => (import('../pages/app/DashBoard/index')))
const DashboardDetail = React.lazy(() => (import('../pages/app/DashBoard/DashboardDetail')))
const ChartDesign = React.lazy(() => (import('../pages/app/ChartDesign')))
const LoginPage = React.lazy(() => (import('../pages/Login/Login')))
const ConfigPage = React.lazy(() => (import('../pages/app/ConfigPage')))
// const PanelEditor = React.lazy(() => (import('../pages/app/DashBoard/PanelEditor')))

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
            path: 'dashboard/:id',
            element: <DashboardDetail />,
          },
          {
            path: 'chartDesign',
            element: <ChartDesign />,
          },
          {
            path: 'config',
            element: <ConfigPage />,
          },
        ],
      },
    ],
  },
]

export default routes

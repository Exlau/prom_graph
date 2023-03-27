import React, { createElement } from 'react'
import { RouteObject, Navigate } from 'react-router'

import ErrorPage from '../pages/ErrorPages'
import AppLayout from '../AppLayout'

const DashBoard = React.lazy(() => (import('../pages/app/DashBoard')))
const ChartDesign = React.lazy(() => (import('../pages/app/ChartDesign')))
const LoginPage = React.lazy(() => (import('../pages/Login/Login')))

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
            path: 'chartDesign',
            element: <ChartDesign />,
          },
        ],
      },
    ],
  },
]

export default routes

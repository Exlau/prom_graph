import React, { createElement } from 'react'
import { RouteObject } from 'react-router'

import ErrorPage from '../pages/ErrorPages'
import AppLayout from '../AppLayout'

const DashBoard = React.lazy(() => (import('../pages/app/DashBoard')))
const ChartDesign = React.lazy(() => (import('../pages/app/ChartDesign')))

const routes: RouteObject[] = [
  {
    path: '/',
    element: createElement(AppLayout),
    errorElement: createElement(ErrorPage),
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
]

export default routes

import React from 'react'

import ErrorPage from '../pages/ErrorPages'
import Root from '../Root'

const routes = [
  {
    path: '/',
    exact: true,
    element: <Root />,
    errorElement: <ErrorPage />,
  },
]

export default routes

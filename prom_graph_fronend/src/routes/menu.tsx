import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface MenuType {
  path:string;
  label: ReactNode;
  children?:MenuType[]
}

const menu:MenuType[] = [
  {
    path: '/',
    label: 'HOME',
    children: [
      {
        path: 'home',
        label: <Link to="dashboard">DashBoard</Link>,
      },
      {
        path: 'chartDesign',
        label: <Link to="chartDesign">Design</Link>,
      },
    ],
  },
]

export default menu

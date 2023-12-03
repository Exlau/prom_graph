import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface MenuType {
  path:string;
  label: ReactNode;
  children?:MenuType[]
}

const menu:MenuType[] = [
  {
    path: '/home',
    label: 'HOME',
    children: [
      {
        path: 'home/dashboard',
        label: <Link to="home/dashboard">DashBoard</Link>,
      },
      {
        path: 'home/datasource',
        label: <Link to="home/datasource">DataSource</Link>,
      },
      {
        path: 'home/config',
        label: <Link to="home/config">Config Page</Link>,
      },
    ],
  },
]

export default menu

import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Finance() {
  return (
    <div>
      Finance
      <Outlet></Outlet>
    </div>
  )
}

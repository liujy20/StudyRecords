import {useRoutes}from 'react-router-dom'
import routerList from '../routers'
export default function MyRouter() {
  const element=useRoutes(routerList)
  return element
}

import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

export default function Finance() {
  const[data,setData]=useState([])
  useEffect(()=>{
    setData([1,2,3])
  },[])
  let a=1
  console.log(a);
  console.log(data);
  return (
    <div>
      Finance
      <Outlet></Outlet>
    </div>
  )
}

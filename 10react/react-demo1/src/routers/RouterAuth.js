import React from 'react'
import {Navigate} from "react-router-dom"
/**
 * 高阶组件:可以接受组件作为参数,返回一个新的组件
 * @returns 
 */
export default function RouterAuth({ children }) {
    const token = localStorage.getItem('token')
    console.log(111);
    if(token){
        return <>{children}</>
    }else{
        return <Navigate to="/login"></Navigate>
    }
}
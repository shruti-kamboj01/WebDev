import React from 'react'
import { useSelector } from 'react-redux'
import Sidebar from '../components/core/Dashboard/Sidebar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
    const {loading: authLoading} = useSelector((state) => state.auth)
    const {loading: profileLoading}  = useSelector((state) => state.profile)

    if(authLoading || profileLoading) {
        return(
            <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
                <div className='spinner'></div>
            </div>
        )
    }

  return (
    <div>
        <Sidebar/>
        <div>
            <Outlet/>
        </div>
    </div>
  )
}

export default Dashboard
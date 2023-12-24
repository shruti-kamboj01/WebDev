import React from 'react'
import { VscSignOut } from "react-icons/vsc"
import {sidebarLinks} from "../../../data/dashboard-links"
import { logout } from '../../../services/operations/authAPI'
import { useDispatch, useSelector } from 'react-redux'
import SidebarLink from './SidebarLink'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import ConfirmationModal from '../../common/ConfirmationModal'

const Sidebar = () => {

    const {user, loading: profileLoading} = useSelector((state) => state.profile)
    const {loading:authLoading} =  useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // to keep track of confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(null)

    if(authLoading || profileLoading) {
        return(
            <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
                <div className='spinner'></div>
            </div>
        )
    }

  return (
    <div className='bg-richblack-800 w-[30%] flex flex-col border-r-[1px] border-richblack-700
                   h-[calc[100vh-3.5]] '>
        <div>
            {
                sidebarLinks.map((link,index) => {
                    if(link.type && user?.accountType !== link.type) return null;
                    return (
                        <SidebarLink key={link.id} link={link} iconName={link.icon}/>
                    )
                })
            }
        </div>

        <div className='max-auto mt-6 mb-6 h-[1px] bg-richblack-600 w-11/12'></div>

        <div className='flex flex-col'>
            <SidebarLink link={{name:"Settings", path:"dashboard/settings"}}
                iconName="VscSettingsGear"
            />
        </div>

        <button onClick={() => setConfirmationModal( {
            text1:"Are You Sure?",
            text2:"You will be logged out of your account.",
            btn1Text:"Logout",
            btn2Text:"Cancel",
            btn1Handler:() =>dispatch(logout(navigate)),
            btn2Handler:() =>setConfirmationModal(null),
        })}>
            <div className='flex flex-row gap-2 text-richblack-400'>
                <VscSignOut/>
                <h1>Logout</h1>
            </div>
        </button>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  
  )
}

export default Sidebar
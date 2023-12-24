import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FiEdit } from "react-icons/fi"
import IconBtn from '../../common/IconBtn'

const MyProfile = () => {
  const {user} = useSelector((state) => state.profile)
  
  const navigate = useNavigate();
  return (
    <div className='text-richblack-200 '>
      <h1 className='text-richblack-200'>My Profile</h1>
      {/* 1 box */}
      <div>
      <div>
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className='aspect-square w-[78px] rounded-full objec-cover'
          />
          <div>
            <h1>{user?.firstName + " " + user?.lastName}</h1>
            <p>{user?.email}</p>
          </div>
         </div>
      <IconBtn
         text="Edit"
         onclick={()=> {navigate("/dashboard/settings")}}>
        <FiEdit /> 
      </IconBtn>
      </div>
      
        
        
      
      {/* 2nd box */}
      <div>
        <div>
          <h1>About</h1>
          
        </div>
        <IconBtn
         text="Edit"
         onclick={()=> {navigate("/dashboard/settings")}}>
        <FiEdit /> 
      </IconBtn>
      <p>{}</p>
        
        
      
      </div>
      {/* 3rd box */}
      <div>
        <div>
          <h1>Personal Details</h1>
        </div>
        <IconBtn
         text="Edit"
         onclick={()=> {navigate("/dashboard/settings")}}>
        <FiEdit /> 
      </IconBtn>
      <div>
       <div>
       <div>
          <p>First Name</p>
          <p>{user?.firstName} </p>
        </div>
        <div>
          <p>Last Name</p>
          <p>{user?.lastName} </p>
        </div>
       </div>

       <div>
        <div>
          <p>Email</p>
          <p>{user?.email}</p>
        </div>
        <div>
          <p>Phone Number</p>
          <p></p>
        </div>
        </div>
   
        <div>
          <div>
            <p>Gender</p>
            <p></p>
          </div>
          <div>
            <p>Date of Birth</p>
            <p></p>
          </div>
        </div>
      </div>
        </div>
        
     
    </div>
  )
}

export default MyProfile
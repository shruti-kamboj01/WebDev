import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn'
import { FiUpload } from "react-icons/fi";

const UpdateProfilePhoto = () => {
 
    const {user} = useSelector((state) => state.profile)

  return (
    <div className='flex gap-x-4 px-6 mt-8 py-8 rounded-md border-[1px] border-richblack-500 bg-richblack-800'>
        <img src={user?.image}
            alt={`profile-${user?.firstName}`}
            className='rounded-full max-w-[80px]'
        />
        <div className='flex flex-col justify-center'>
            <p className='text-white text-lg font-medium mb-2'>Change Profile Picture </p>
            <div className='flex gap-x-3'>
                <button className='text-richblack-100 bg-richblack-700 text-xl py-2 px-6 rounded-md'>Select</button>
                <IconBtn text="Upload">
                <FiUpload/>
                </IconBtn>
            </div>
        </div>
    </div>
  )
}

export default UpdateProfilePhoto
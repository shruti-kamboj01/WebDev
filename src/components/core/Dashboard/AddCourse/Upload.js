import React, { useState } from 'react'

const Upload = () => {

  const [previewImage, setPreviewImage] = useState(null)

  return (
    <div className='flex flex-col gap-x-2'>
    <label className='label-style'>Course Thumbnail <sup className='text-pink-200 text-xs'>*</sup></label>
      <div className='border-dotted border-[2px] rounded-lg border-richblack-600 aspect-video bg-richblack-700'>
        {
          previewImage ?
           (<div></div>) :
           (<div></div>)
        }
      </div>
    </div>
  )
}

export default Upload
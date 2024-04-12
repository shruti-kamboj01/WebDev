import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'



const Course_Card = ({course,Height}) => {

  // const {course} = useSelector((state) => state.course)

    console.log('c',course)
    
  return (
    <div className='mt-6 flex flex-col mb-4'>
    <Link to={`/course/${course?._id}`}>
   <div> <img src={course?.thumbnail} className={`${Height} w-full object-cover rounded-md`} /></div>
    {/* name and des */}
  <div className='flex flex-col mt-1'>
  <p className='text-white text-xl font-semibold'>{course?.courseName} </p>
    <p className=' text-base text-richblack-100'>{course?.courseDescription}  </p>
    
  </div>
  {/* Instructor */}
  <p></p>

  {/* Review */}

  {/* price */}
  <p>Rs. {course?.price}</p>
    </Link>
      
   
       

    
    </div>
  )
}

export default Course_Card
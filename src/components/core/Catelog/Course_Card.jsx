import React from 'react'
import { useSelector } from 'react-redux'



const Course_Card = () => {

    const {course, category} = useSelector((state) => state.course)
    
  return (
    <div>
        
        <div>
            <p className='text-white'>Home/Catalog/</p>
        </div>
       

    
    </div>
  )
}

export default Course_Card
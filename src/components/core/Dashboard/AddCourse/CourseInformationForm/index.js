import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'


const CourseInfomationForm = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: {errors},
    } = useForm()

    const dispatch = useDispatch()
    const {course, editCourse} = useSelector((state) => state.course)
    const [loading, setLoading] = useState(false)
    const [courseCategories, setCourseCategories] = useState([])

    useEffect(() => {
        const getCategories = async () => {
            setLoading(true)
            // const categories = await 
        }
    })

  return (
    <div className='bg-richblue-800 border-[1px] border-richblack-600 rounded-md'>
          <form>
                
          </form>
    </div>
  )
}

export default CourseInfomationForm
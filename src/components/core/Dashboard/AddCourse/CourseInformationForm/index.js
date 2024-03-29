import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { MdNavigateNext } from "react-icons/md"
import IconBtn from '../../../../common/IconBtn';
import { COURSE_STATUS } from '../../../../../utils/constants';

import TagsInput from './TagsInput';
import Upload from '../Upload';
import RequirementField from './RequirementField';
import { addCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse, setStep } from '../../../../../slices/courseSlice';

const CourseInfomationForm = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: {errors},
    } = useForm()

    const dispatch = useDispatch()
    const {token} = useSelector((state) => state.auth)
    const {course, editCourse} = useSelector((state) => state.course)
    const [loading, setLoading] = useState(false)
    const [courseCategories, setCourseCategories] = useState([])

    useEffect(() => {
        const getCategories = async () => {
            setLoading(true)
            const categories = await fetchCourseCategories()
            if(categories.length > 0) {
              setCourseCategories(categories)
            }
            setLoading(false)
        }
        
        
        if(editCourse) {
          setValue("courseName", course.courseName)
          setValue("courseDescription", course.courseDescription)
          setValue("price", course.price)
          setValue("tag", course.tag)
          setValue("whatYouWillLearn", course.whatYouWillLearn)
          setValue("category", course.category)
          setValue("instrutions", course.instructions)
          setValue("thumbnail", course.thumbnail)
        }
        getCategories()
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // const isFormUpdated = () => {
    //   const currentValues = getValues()
    //   console.log("changes after editing form values:", currentValues)
    //   if(
    //     currentValues.courseName !== course.courseName 
    //   ) {return true}
    //   return false
    // }
    

   const onSubmit = async(data) => {
      // console.log(data)
    // if(editCourse) {
         
    // }
    const formData = new FormData()
    formData.append("courseName", data.courseName)
    formData.append("courseDescription", data.courseDescription)
    formData.append("price", data.price)
    formData.append("tag", data.tag)
    formData.append("whatYouWillLearn", data.whatYouWillLearn)
    formData.append("category", data.category)
    formData.append("status", COURSE_STATUS.DRAFT)
    formData.append("instructions", JSON.stringify(data.instructions))
    formData.append("thumbnailImage", data.thumbnail)
    
    setLoading(true)
    const result = await addCourseDetails(formData, token)
    if(result) {
      dispatch(setStep(2))
      dispatch(setCourse(result))
    }
   }

  return (

<div className='bg-richblue-800 border-[1px]   border-richblack-600 rounded-md'>
          <form className='px-7 mt-4 flex flex-col gap-y-4 mb-4' onSubmit={handleSubmit(onSubmit)}>
               <div className='flex flex-col gap-x-2'>
               <label className='label-style' htmlFor='courseName'>Course Title <sup className='text-pink-200 tezt-[14px]'>*</sup></label>
               <input
                    className='form-style'
                    placeholder='Enter Course Title'
                    id='courseName'
                    name='courseName'
                    {...register("courseName", {required: true})}
               />
               {errors.courseName && (
                <span className='ml-2 text-xs text-pink-200'>Course Title is required</span>
               )}
               </div>

              {/*course description  */}
               <div className='flex flex-col gap-x-2'>
               <label className='label-style' htmlFor='courseDescription'>Course Short Description <sup className='text-pink-200 text-[14px]'>*</sup></label>
               <textarea
                    className='form-style'
                    placeholder='Enter Description'
                    cols={40}
                    rows={4}
                    id='courseDescription'
                    name='courseDescription'
                    {...register("courseDescription", {required: true})}
               />
               {errors.courseDescription && (
                <span className='ml-2 text-xs text-pink-200'>Course Description is required</span>
               )}
               </div>
               {/* course price */}
               <div className='flex flex-col gap-x-2'>
               <label className='label-style' htmlFor='price'>Price <sup className='text-pink-200 tezt-[14px]'>*</sup></label>
              <div className='relative'> 
           
              <HiOutlineCurrencyRupee className='absolute top-3  ml-2 text-richblack-300 text-base' size={20} />
              <input
                    className='form-style w-full pl-10'
                   placeholder='Enter Price'
                    id='price'
                    name='price'
                    {...register("price", {required: true})}
               />
               </div> 
               {errors.price && (
                <span className='ml-2 text-xs text-pink-200'>Course Price is required</span>
               )}
               </div>

               <div className='flex flex-col gap-x-2'>
               <label className='label-style' htmlFor='category'>Category <sup className='text-pink-200 tezt-[14px]'>*</sup></label>
               <select
                    className='form-style text-richblack-400'
                    id='courseName'
                    name='category'
                    defaultValue=""
                    {...register("category", {required: true})}
               >
                  
               <option value="" disabled >Choose a Category</option>
               {!loading &&
                courseCategories?.map((ele, indx) => (
                 <option key={indx} value={ele?._id}>
                {ele?.name}
             
              </option>
            ))}
               </select>
               {errors.category && (
                <span className='ml-2 text-xs text-pink-200'>Course category is required</span>
               )}
               </div>

              {/* Tags */}
               <TagsInput 
                label="Tags"
                name="tag"
                placeholder="Enter tags and press enter"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues= {getValues}
                />

                {/* Upload thumbnail */}
                <Upload 
                  name="thumbnail"
                  label="Course Thumbnail"
                  register={register}
                  errors={errors}
                  setValue={setValue}
                  editData={editCourse ? course?.thumbnail : null}
                />

                {/* Benefits of course */}
                <div className='flex flex-col gap-x-2'>
               <label className='label-style' htmlFor='whatYouWillLearn'>Benefits of the course <sup className='text-pink-200 tezt-[14px]'>*</sup></label>
               <textarea
                    className='form-style'
                    placeholder='Enter Benefits of the course'
                    cols={40}
                    rows={4}
                    id='whatYouWillLearn'
                    name='whatYouWillLearn'
                    {...register("whatYouWillLearn", {required: true})}
               />
               {errors.whatYouWillLearn && (
                <span className='ml-2 text-xs text-pink-200'>Benefits of the course is required</span>
               )}
               </div>

               {/* Reqirements/Instruction */}
               <RequirementField
                name="instructions"
                label="Requirements/Instructions"
                placeholder="Enter benefits of the course"
                value="instruction"
                register={register}
                errors={errors}
                setValue={setValue}
               />
          </form>
          
          {/* Next button */}
          <div className="flex justify-end mr-8 mb-4">
            {
              editCourse && (
                <button 
                 onClick={() => dispatch(setStep(2))}
                 disabled={loading}
                className='flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900'>
                Continue Without Saving</button>
              )
            }
            <IconBtn disabled={loading} 
                   text={!editCourse ? "Next" : "Save Changes"} >
                   <MdNavigateNext/>
                   </IconBtn>
          </div>
        
          
    </div>
  

    
  )
}

export default CourseInfomationForm
import React, { useEffect, useState } from 'react'
import { fetchCourseCategories, fetchCourseDetails } from '../services/operations/courseDetailsAPI'
import { useNavigate, useParams } from 'react-router-dom'
import { IoInformationCircleOutline } from "react-icons/io5";
import{ formatDate }from '../services/formateDate'
import toast from 'react-hot-toast';
import { FaRegShareSquare } from "react-icons/fa";
import  ConfirmationModal  from "../components/common/ConfirmationModal";

const CourseDetails = () => {

  const courseId = useParams()
  const navigate = useNavigate()

  const[course, setCourse] = useState([])
  const [confirmationModal, setConfirmationModal] = useState(null);
    
  const getCourseDetails = async() => {
    const result = await fetchCourseDetails(courseId)
    setCourse(result)
  }
    useEffect(() => {
      getCourseDetails()
    },[])

    function copy() {
      const el = document.createElement("input");
      el.value = window.location.href;
      document.body.appendChild(el);
      el.select();
      document.body.removeChild(el);
      toast.success("Copied to clipboard")
      
    }
  return (
    <div className=''>
      {/* hero section */}
      <div className="bg-richblack-800 py-20 flex">
       <div className='ml-28 w-7/12 max-w-maxContent  relative flex flex-col gap-y-3 border-r-[1px] border-richblack-400'>
       <p className="text-richblack-400 text-xl font-medium">Home/ Learning /
        <span className='text-yellow-50'> {course?.data?.category?.name}</span></p>
        <div>
        <p className="text-white text-3xl font-semibold">
            {course?.data?.courseName}
        </p>
        <p className="text-richblack-300 text-lg font-medium">
        {course?.data?.courseDescription}
        </p>
        <p className='text-white text-base font-medium'>
         Created By- {course?.data?.instructor?.firstName} {course?.data?.instructor?.lastName}</p>
        <p className='flex text-white text-base font-medium  gap-x-2 items-center'> 
        <IoInformationCircleOutline />
        <p>Created At- {formatDate(course?.data?.instructor?.createdAt)}</p>
        </p>
       </div>
        </div>
      
        <div className='absolute bg-richblack-700 p-3 px-8 rounded-md right-40 flex flex-col gap-y-3'>
          <div className=''>
            <img src={course?.data?.thumbnail}
              className='w-[240px] h-[150px] object-fit'
            />
          </div>
         <div>
         <p className="text-white text-xl font-medium"> Rs.{course?.data?.price}</p>
         </div>
         <div className='flex flex-col gap-y-2'>
          <button className='text-black bg-yellow-50 py-1.5 w-full rounded-md'
           onClick={() => 
                  setConfirmationModal({
                    text1: "You are not logged in!",
                    text2:"Please login to Purchase Course.",
                    btn1Text: "Login",
                    btn2Text: "Cancel",
                    btn1Handler:() => navigate('/login'),
                    btn2Handler: () => setConfirmationModal(null)
                   })}>
            Add to Cart
          </button>
          <button className='text-white bg-richblack-800 border-b-[2px] border-richblack-400 py-1.5 w-full rounded-md'
             onClick={() => 
                  setConfirmationModal({
                    text1: "You are not logged in!",
                    text2:
                          "Please login to add to cart",
                    btn1Text: "Login",
                    btn2Text: "Cancel",
                    btn1Handler: () => navigate('/login'),
                    btn2Handler: () => setConfirmationModal(null)
                   })}>
            Buy now
          </button>
         </div>
         <p className='text-richblack-200 text-sm mx-auto'>30-Day-Money-Back Guarantee</p>
         
         <button className='text-yellow-50 flex justify-center items-center gap-x-1' onClick={copy}>
         <FaRegShareSquare />
         <p>Share</p></button>
        </div>
        {/* RATING */}
      
      </div>
          
      <div className='border-richblack-100 border-[1px] py-3 px-5 ml-28 w-7/12 max-w-maxContent'>
            <p className='text-white text-2xl font-semibold'>What you'll learn</p>
            <p className='text-richblack-50 text-base font-medium'> {course?.data?.whatYouWillLearn} </p>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}

export default CourseDetails
import { toast } from "react-hot-toast"

import {paymentLoading} from "../../slices/courseSlice"
import { apiConnector } from "../apiconnector"
import { courseEndpoints } from "../apis"

const {
  COURSE_CATEGORIES_API,
  CREATE_COURSE_API,

} = courseEndpoints


// fetching the available course categories
// console.log("heelo")
export const fetchCourseCategories = async () => {
    let result = []
      try{
        const res = await apiConnector("GET", COURSE_CATEGORIES_API)
        console.log("COURSE_CATEGORIES_API API RESPONSE............", res)
    
        console.log("result", res?.data?.data)
        if(!res?.data?.success) {
         throw new Error("Could Not Fetch Course Categories")

         
        }
        result = res?.data?.data
     
 
      }catch(error) {
        console.log("COURSE_CATEGORY_API API ERROR............", error)
        toast.error(error.message)
      }
      return result
}

// add the course details
export const addCourseDetails = async(data,token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try{
        const res = await apiConnector("POST", CREATE_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        console.log("CREATE COURSE API RESPONSE......", res)
        if(!res?.data?.success) {
            throw new Error("Could Not Add Course Details")
        }
        toast.success("Course Details Added Successfully")
        result = res?.data?.data
    }catch(error) {
        console.log("CREATE COURSE API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}


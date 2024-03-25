import { toast } from "react-hot-toast"

import {paymentLoading} from "../../slices/courseSlice"
import { apiConnector } from "../apiconnector"
import { courseEndpoints } from "../apis"

const {
  COURSE_CATEGORIES_API,
  CREATE_COURSE_API,
  UPDATE_SECTION_API,
  CREATE_SECTION_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SUBSECTION_API,
} = courseEndpoints


// fetching the available course categories
// console.log("heelo")
export const fetchCourseCategories = async () => {
    let result = []
      try{
        const res = await apiConnector("GET", COURSE_CATEGORIES_API)
        console.log("COURSE_CATEGORIES_API API RESPONSE............", res)
    
        // console.log("result", res?.data?.data)
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

export const createSection = async(data,token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try{
    const res = await apiConnector("POST", CREATE_SECTION_API, data, {
     
      Authorization: `Bearer ${token}`,
  })
  console.log("CREATE SSECTION API RESPONSE......", res)
  if(!res?.data?.success) {
      throw new Error("Could Not Add Section Details")
  }
  toast.success("Section created")
  result = res?.data?.updatedCourse
 
}catch(error) {
  console.log("CREATE SECTION API ERROR............", error)
  toast.error(error.message)
}
toast.dismiss(toastId)
return result
}

export const updateSection = async(data,token) => {
      let result = null
      const toastId = toast.loading("Loading...")
      try{
         const res = await apiConnector("PUT", UPDATE_SECTION_API, data, {
          Authorization: `Bearer ${token}`,
         })
         console.log("UPDATE SECTION API RESPONSE............", res)
         if (!res?.data?.success) {
          throw new Error("Could Not Update Section")
        }
        toast.success("Course Section Updated")
        result = res?.data?.data
      }catch(error) {
        console.log("UPDATE SECTION API ERROR............", error)
        toast.error(error.message)
      }
      toast.dismiss(toastId)
      return result
}

export const deleteSection = async(data,token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try{
        const res = await apiConnector("POST", DELETE_SECTION_API, data, {
          Authorization: `Bearer ${token}`,
        })
        console.log("DELETE SECTION API RESPONSE............", res)
        if(!res?.data?.success) {
          throw new Error("Could Not Delete Section")
        }
        toast.success("Course Section Deleted")
        result = res?.data?.data
    }catch(error) {
      console.log("DELETE SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const createSubSection = async(data,token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try{
    const res = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
     
      Authorization: `Bearer ${token}`,
  })
  console.log("CREATE SUB-SECTION API RESPONSE......", res)
  if(!res?.data?.success) {
      throw new Error("Could Not Add Lecture Details")
  }
  toast.success("Lecture created")
  result = res?.data?.data
 
}catch(error) {
  console.log("CREATE SUB-SECTION API ERROR............", error)
  toast.error(error.message)
}
toast.dismiss(toastId)
return result
}

export const updateSubSection = async(data,token) => {
      let result = null
      console.log("data", data) 
      const toastId = toast.loading("Loading...")
      try{
         const res = await apiConnector("PUT", UPDATE_SUBSECTION_API, data, {
          Authorization: `Bearer ${token}`,
         })
         console.log("UPDATE SUB-SECTION API RESPONSE............", res)
         if (!res?.data?.success) {
          throw new Error("Could Not Update Lecture")
        }
        toast.success("Lecture Updated")
        result = res?.data?.data
      }catch(error) {
        console.log("UPDATE SUB-SECTION API ERROR............", error)
        toast.error(error.message)
      }
      toast.dismiss(toastId)
      return result
}

export const deleteSubSection = async(data,token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try{
      const res = await apiConnector("POST", DELETE_SUBSECTION_API,data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE SUB-SECTION API RESPONSE............", res)
      if(!res?.data?.success) {
        throw new Error("Could Not Delete lecture")
      }
      toast.success("Lecture Deleted")
      result = res?.data?.data
  }catch(error) {
    console.log("DELETE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}






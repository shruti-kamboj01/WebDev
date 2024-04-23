import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI'
import ProgressBar from "@ramonak/react-progress-bar"


const EnrolledCourses = () => {
    const [enrolledCourses, setEnrolledCourses] = useState(null)
    const {token} = useSelector((state) => state.auth)

    const getEnrolledCourses = async() => {
        try{
            const res = await getUserEnrolledCourses(token)
            setEnrolledCourses(res)
        }catch(error) {
            console.log("Unable to fetch Enrolled courses")
        }
    }

    useEffect(()=> {
        getEnrolledCourses();
                // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

  return (
    <div className=''>
        <div className='text-white text-3xl'>
            <h1> Enrolled Courses </h1>
        </div>
        <div> 
        {
          !enrolledCourses ? (<div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>) :
        !enrolledCourses.length ? (
            <p className="flex justify-center mt-8 h-[70vh] text-richblack-100">
          You have not enrolled in any course yet.
          
        </p>
        ) : 
           ( <div>
                <h1>Course Name</h1>
                <h1>Durations</h1>
                <h1>Progress</h1>
                {
                    enrolledCourses.map((course, i) => (
                        <div key={i}>
                            <div> 
                            <img src={course.thumbnail} alt={course?.courseName}/>
                            </div>
                            <div> 
                            <h1>{course.courseName}</h1>
                            <h1>{course.courseDescription}</h1>
                            </div>
                            <div>
                                {course?.totalDuration}
                            </div>

                            <div>
                                <p>Progress: {course.progressPercentage || 0}%</p>
                                <ProgressBar 
                                    completed={course.progressPercentage || 0}
                                    height='8px'
                                    isLabelVisible={false}
                                />
                            </div>
                        </div>
                       
                    ))
                }
            </div>)
        }
           
        </div>
    </div>
  )
}

export default EnrolledCourses

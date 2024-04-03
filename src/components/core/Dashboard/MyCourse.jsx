import React, { useEffect, useState } from "react";
import { Th, Thead, Tr, Td, Tbody, Table } from "react-super-responsive-table";
import { IoAddCircleOutline } from "react-icons/io5";
import IconBtn from "../../common/IconBtn";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { HiClock } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getAllCourses } from "../../../services/operations/courseDetailsAPI";
import { formatDate } from "../../../services/formateDate";
import { COURSE_STATUS } from "../../../utils/constants";

const MyCourse = () => {
  const navigate = useNavigate();
  // const { course } = useSelector((state) => state.course);

  const [getCourses, setGetCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCourseDetails = async () => {
      setLoading(true);
      const courses = await getAllCourses();
      console.log(courses);
      if (courses.length > 0) {
        setGetCourses(courses);
      }
      setLoading(false);
    };
    getCourseDetails();
  }, []);

  return (
    <div className="w-11/12 max-w-maxContent mx-auto flex flex-col gap-y-14">
      {/* header  */}
      <div className="flex justify-between">
        <p className="font-medium text-3xl font-inter text-richblack-25">
          My Course
        </p>
        <IconBtn text="New" onclick={() => navigate("/dashboard/add-course")}>
          <IoAddCircleOutline />
        </IconBtn>
      </div>

      {/* table */}
      <div className="text-richblack-50">
        <Table className="border-[1px] border-richblack-800 rounded-md p-4">
          <Thead>
            <Tr className="flex gap-x-10 uppercase border-b-[1px] border-b-richblack-800 py-2 px-4">
              <Th className="flex-1 text-left  ">Courses</Th>
              <Th className="flex-1 text-left  ">Duration</Th>
              <Th className="flex-1 text-left  ">Price</Th>
              <Th className="flex-1 text-left  ">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {getCourses?.length === 0 ? (
              <Tr>
                <Td>No course found</Td>
              </Tr>
            ) : (
              getCourses.map((course) => (
                <Tr key={course?._id} className="">
                  <Td className="flex gap-x-3 p-6">
                    <img
                      src={course.thumbnail}
                      alt={course.courseName}
                      className="w-[30%] h-[30%] rounded-md "
                    />
                    <div className="text-sm font-normal flex flex-col justify-evenly">
                      <p className="text-lg font-semibold">
                        {course.courseName}
                      </p>
                      <p className="text-richblack-600">
                        {course.courseDescription}
                      </p>

                      <p className="w-fit">
                        {" "}
                        Created: {formatDate(course.instructor.createdAt)}
                      </p>

                      {course.status === COURSE_STATUS.DRAFT ? (
                        <p className=" bg-richblack-700 p-2 text-sm px-4 leading-3 text-pink-400 rounded-lg w-fit flex items-center gap-x-2">
                          <HiClock />
                          <p>Drafted</p>
                        </p>
                      ) : (
                        <p className=" bg-richblack-700 text-sm px-4  leading-3 text-yellow-50 rounded-lg w-fit flex items-center gap-x-2">
                          <FaCheck />
                          <p>Published</p>
                        </p>
                      )}
                    </div>
                  </Td>
                  <Td>2hr 30min</Td>
                  <Td>₹{course.price}</Td>
                  <Td>
                    <button>
                      <FiEdit2/>
                    </button>
                    <button>
                      <RiDeleteBin6Line/>
                    </button>
                  </Td>

                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </div>
    </div>
  );
};

export default MyCourse;

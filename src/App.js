import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home"
import About from './pages/About'
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import OpenRoute from "./components/core/Auth/OpenRoute";
import ContactUs from "./pages/ContactUs";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from './pages/Dashboard'
import MyProfile from "./components/core/Dashboard/MyProfile";
import Error from './pages/Error'
import Settings from './components/core/Dashboard/Settings/Index'
import { ACCOUNT_TYPE } from "./utils/constants";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import {  useDispatch, useSelector } from "react-redux";
import AddCourse from "./components/core/Dashboard/AddCourse";
import MyCourse from "./components/core/Dashboard/MyCourse";
import Cookies from "js-cookie";
import { getUserDetails } from "./services/operations/profileAPI";
import { useEffect } from "react";




function App() {

  const {user} = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  

  useEffect(() => {
    if (Cookies.get("token")) {
    const token = JSON.parse(Cookies.get("token"))
    console.log(token)
     //  eslint-disable-next-line react-hooks/exhaustive-deps
    dispatch(getUserDetails(token,navigate))
  }
   //  eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  




// useEffect(() => {
//   if (localStorage.getItem("token")) {
//     const token = JSON.parse(localStorage.getItem("token"))
//     console.log(token)
//     dispatch(getUserDetails(token, navigate))
//   }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [])


  return (
   <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<ContactUs/>}/>
        {/* Open Route- only for non-authenticated user */}
        <Route path="/login"
         element ={
          <OpenRoute>
            <Login />
          </OpenRoute>
          }/>
        <Route path="/signup" 
        element ={
          <OpenRoute>
            <SignUp/>
          </OpenRoute>
        }/>
       <Route path="/forgot-password"
        element={
         <OpenRoute>
            <ForgotPassword/> 
         </OpenRoute>
       }/>
       <Route path="/update-password/:id" 
       element={
         <OpenRoute>
            <UpdatePassword/> 
         </OpenRoute>
       }/>
        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          } />

        {/* Private Routes- Only for authenticated user */}
        <Route
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }>
           {/* Route for all authenticated users */}
        <Route path="dashboard/my-profile" element={<MyProfile/>} />
        <Route path="dashboard/settings" element={<Settings/>}/>

        {/* Route only for Instructor */}
        {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
          <>
            <Route
              path="dashboard/add-course" 
              element={<AddCourse/>}
            />
            <Route
            path="dashboard/my-courses"
            element={<MyCourse/>}
            />
          </>

         )}
         
         {/* Route only for Students */}
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route 
                path="dashboard/enrolled-courses"
                element={<EnrolledCourses/>}
              />
            </>
          )}
       </Route>
       
       {/* 404 Page */}
        <Route path="*" element={<Error />} />
      </Routes>
   </div>
  );
}

export default App;

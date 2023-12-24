import "./App.css";
import { Route, Routes } from "react-router-dom";
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

function App() {

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
        
        </Route>
       


        {/* 404 Page */}
        <Route path="*" element={<Error />} />
      </Routes>
   </div>
  );
}

export default App;

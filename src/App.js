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

function App() {

  return (
   <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<ContactUs/>}/>
        <Route path="/login"
         element ={
          <OpenRoute>
            <Login />
          </OpenRoute>
          }/>
        <Route path="/signUp" 
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
      </Routes>
   </div>
  );
}

export default App;

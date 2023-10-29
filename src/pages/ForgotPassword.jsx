import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {BsArrowLeft} from 'react-icons/bs'

const ForgotPassword = () => {

    //destructure loading from auth
    const {loading} = useSelector((state) => state.auth);
    const [email, setEmail] = useState("");
    const[emailSent, setEmailSent] = useState(false);

  return (
    <div className='max-w-[500px] mx-auto flex items-center justify-center py-36'>
        {
            loading ? (
               <div>Loading...</div>
            ) : (
                <div className='flex flex-col justify-center items-center font-inter'>
                    <h1 className='text-richblack-5 font-semibold text-3xl mb-6'>
                    {
                        !emailSent ? "Reset your Password" : "Check your email"
                    }
                    </h1>
                    <p className='text-richblack-100 font-normal text-base w-[75%] ml-4 mb-4'>
                        {
                            !emailSent ? 
                            "Have no fear. We’ll email you instructions to reset your password.you dont have access to your email we can try account recovery"
                            :`We have sent the reset email to ${email}`
                        }
                    </p>
                    <form>
                        {
                            !emailSent && (
                                <label>
                                    <p className='text-richblack-5 font-normal text-base mb-1'>Email Address<sup className='text-pink-200'>*</sup></p>
                                    <input placeholder='Enter your Email Address' 
                                    type='email' required name='email'
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                    className='form-style w-full mb-6'
                                    />
                                </label>
                            )
                        }
                        <button className='bg-yellow-50 text-richblack-900 text-center font-medium text-base p-2 rounded-md items-center w-full mb-6'>
                            {
                                !emailSent ? "Reset Password" : "Resend Email"
                            }
                        </button>
                    </form>

                    <div className='text-richblack-5 mr-52'>
                        <Link to="/login">
                            
                            <p className=' font-medium text-base flex  gap-2 items-center'>
                            <BsArrowLeft/>
                            Back to login</p>
                        </Link>
                    </div>

                </div>
            )
        }
    </div>
  )
}

export default ForgotPassword
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const ForgotPassword = () => {

    //destructure loading from auth
    const {loading} = useSelector((state) => state.auth);
    const [email, setEmail] = useState("");
    const[emailSent, setEmailSent] = useState(false);

  return (
    <div className='text-richblack-5'>
        {
            loading ? (
               <div>Loading...</div>
            ) : (
                <div>
                    <h1>
                    {
                        !emailSent ? "Reset your Password" : "Check your email"
                    }
                    </h1>
                    <p>
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
                                    <p>Email Address</p>
                                    <input placeholder='Enter your Email Address' 
                                    type='email' required name='email'
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                    />
                                </label>
                            )
                        }
                        <button>
                            {
                                !emailSent ? "Reset Password" : "Resend Email"
                            }
                        </button>
                    </form>

                    <div>
                        <Link to="/login">
                            <p>Back to login</p>
                        </Link>
                    </div>

                </div>
            )
        }
    </div>
  )
}

export default ForgotPassword
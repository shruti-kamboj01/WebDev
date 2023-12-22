import React, {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import { apiConnector } from '../../../services/apiconnector';
import {contactusEndpoint} from "../../../services/apis"
import countrycode from "../../../data/countrycode.json"


const ContactUsForm = () => {
    
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm();

    const submitContactForm = async(data) =>{
        console.log("Logging Data", data);
        try{
            setLoading(true);
            const res = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data )
            console.log("Email Res - ", res);
            setLoading(false)

        }catch(error) {
            console.log("ERROR MESSAGE - ", error.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        if(isSubmitSuccessful) {
            reset({
                email:"",
                firstname:"",
                lastname:"",
                dropdown:"",
                message:"",
                phoneNo:"",
            })
        }
    },[reset,isSubmitSuccessful])

  return (
        <div className='max-w-maxContent lg:w-[40%] w-[69%] mx-auto'>
        <form className='flex flex-col gap-7 items-center'
        onSubmit={handleSubmit(submitContactForm)}>
         <div className='flex lg:flex-row gap-5 glex-col'>
            
            <label className='flex flex-col lg-w[48%] gap-2'>
                 <p className='label-style'>First Name</p>
                <input
                type='text'
                    name='firstname'
                    placeholder='Enter first name'
                    className='form-style'
                    id='firstname'
                    {...register("firstname", {required:true})}
                  
                />
                  {
                    errors.firstname && (
                        <span className='text-yellow-50 text-sm'>
                            Please enter your name.
                        </span>
                    )
                }
            </label>
            
            <label className='flex flex-col lg-w[48%] gap-2'>
                 <p className='label-style'>Last Name</p>
                <input
                type='text'
                    name='lastname'
                    placeholder='Enter last name'
                    className='form-style'
                    id='lastname'
                    {...register("lastname", {required:true})}
                  
                />
               
            </label>
         </div>

          <label className='w-full'>
          <p className='label-style'>Phone Number</p>
          <div className='flex flex-row gap-2'>
          <select
            name='dropdown'
            id='dropdown'
            {...register("countrycode", {required:true})}
            className='w-[20%] form-style'
           >
               {
                countrycode.map((ele, i) => {
                    return (
                        <option key={i} value={ele.code}>
                            {ele.code}- {ele.country}
                        </option>
                    )
                })
            }
            </select>
          <input
                type='number'
                name='phonenumber'
                id='phonenumber'
                placeholder='1234567890'
                className='form-style w-full'
                {...register("phoneNo", {required:{
                 value: true,
                 message:"Please enter your Phone Number.",
                 },
                 maxLength:{value:12, message:"Invaid Phone number"},
                 minLength:{value:10, message:"Invalid Phone Number"},
                })}
                 />
          </div>
          {errors.phoneNo && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            {errors.phoneNo.message}
          </span>
        )}
         </label>


         <label className='flex flex-col  w-full  gap-2'>
                 <p className='label-style'> Email Address</p>
                <input
                type='email'
                    name='email'
                    placeholder='Enter your email'
                    className='form-style'
                    id='email'
                    {...register("email", {required:true})}
                  
                />
                  {
                    errors.email && (
                        <span className='text-yellow-50 text-sm'>
                            Please enter your email.
                        </span>
                    )
                }
            </label>

            <label className='flex flex-col  w-full gap-2'>
                 <p className='label-style'> Message</p>
                <textarea
                    
                    name='text'
                    placeholder='Enter your message here'
                    className='form-style'
                    id='message'
                    {...register("message", {required:true})}
                  
                />
                  {
                    errors.message && (
                        <span className='text-yellow-50 text-sm'>
                            Please enter your message.
                        </span>
                    )
                }
            </label> 

            <button type='submit'
            className='bg-yellow-25 text-richblack-900 rounded-md w-full py-2 font-semibold
            hover:scale-95 hover:shadow-none transition-all duration-200'> 
            Send Message</button>

        </form>
    </div>
  )
}

export default ContactUsForm
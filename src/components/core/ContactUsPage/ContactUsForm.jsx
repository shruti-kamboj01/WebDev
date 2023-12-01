import React, {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'


const ContactUsForm = () => {
    
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm();

    useEffect(() => {
        if(isSubmitSuccessful) {
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneNo:"",
            },[reset,isSubmitSuccessful])
        }
    })

  return (
    <div>
        <form className='flex flex-col gap-7 items-center '>
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
                        <span>
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
                  {
                    errors.lastname && (
                        <span>
                            Please enter your name.
                        </span>
                    )
                }
            </label>
         </div>
         <label className='flex flex-col w-full  gap-2'>
                 <p className='label-style'> Email Address</p>
                <input
                type='email'
                    name='email'
                    placeholder='Enter your email'
                    className='form-style w-[40%]'
                    id='email'
                    {...register("email", {required:true})}
                  
                />
                  {
                    errors.email && (
                        <span>
                            Please enter your email.
                        </span>
                    )
                }
            </label>
        </form>
    </div>
  )
}

export default ContactUsForm
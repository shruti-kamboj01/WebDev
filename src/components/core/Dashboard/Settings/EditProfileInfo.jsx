import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const EditProfileInfo = () => {
  const { user } = useSelector((state) => state.profile);
  console.log(user);

  const {
    register,
    submitHandler,
    formState: { error },
  } = useForm();

  return (
    <div>
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-x-4 px-6  mt-8 py-4 rounded-md border-[1px] border-richblack-500 bg-richblack-800"
      >
        <p className="text-white font-semibold text-lg">Profile Information</p>
        <div className="flex gap-x-2">
          <div className="flex flex-col">
            <label htmlFor="firstName" className="label-style">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="form-style"
              disabled
              {...register("firstName", { required: true })}
              defaultValue={user?.firstName}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName" className="label-style">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="form-style"
              disabled
              {...register("lastName", { required: true })}
              defaultValue={user?.lastName}
            />
          </div>
        </div>

        <div className="flex gap-x-2">
          <div className="flex flex-col">
            <label htmlFor="dateOfBirth" className="label-style">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              className="form-style w-full"
              {...register("dateOfBirth", { required: true })}
              defaultValue={user?.additionalDetails?.dateOfBirth}
            />
            {error.dateOfBirth && (
              <span className="text-[12px] text-yellow-100">
                Please enter your DateOfBirth.
              </span>
            )}
          </div>
          {/* <div className="flex flex-col"> */}
            {/* <label htmlFor="gender" className="label-style">
              Gender
            </label>
            <div className="form-style w-full flex gap-x-4">
              <input
                type="radio"
                name="gender"
                id="male"
                className=""
                {...register("gender", { required: true })}
                defaultValue={user?.gender}
              />
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                name="gender"
                id="female"
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-10 "
                {...register("gender", { required: true })}
                defaultValue={user?.gender}
              />
              <span class="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none bottom-[108px] -translate-y-[108px] translate-x-[181px] peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                </svg>
              </span>
              <label htmlFor="">Female</label>
              <input
                type="radio"
                name="gender"
                id="other"
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-10 "
                {...register("gender", { required: true })}
                defaultValue={user?.additionalDetails?.gender}
              />
              <span class="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none bottom-[108px] -translate-y-[108px] translate-x-[181px] peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                </svg>
              </span>
              <label htmlFor="other">Other</label>
            </div>
          </div> */}
        </div>

        <div className="flex gap-x-2">
          <div className="flex flex-col">
            <label htmlFor="contactNumber" className="label-style">
              Contact Number
            </label>
            <input
              type="number"
              name="contactNumber"
              id="contactNumber"
              placeholder="Enter Contact Number"
              className="form-style"
              {...register("contactNumber", { required: true })}
              defaultValue={user?.contactNumber}
            />
            {error.contactNumber && (
              <span className="text-[12px] text-yellow-100">
                Please enter your Contact Number.
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="about" className="label-style">
              About
            </label>
            <input
              type="text"
              name="about"
              id="about"
              className="form-style"
              placeholder="Enter Bio Details"
              {...register("about", { required: true })}
              defaultValue={user?.additionalDetails?.about}
            />
            {error.about && (
              <span className="text-[12px] text-yellow-100">
                Please enter your About.
              </span>
            )}
          </div>
        </div>
      </form>
      <div>
        <button>Cancel</button>
        <button>Save</button>
      </div>
    </div>
  );
};

export default EditProfileInfo;

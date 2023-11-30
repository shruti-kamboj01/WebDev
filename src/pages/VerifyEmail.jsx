import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { RxCountdownTimer } from "react-icons/rx";
import { BiArrowBack } from "react-icons/bi";
import OTPInput from "react-otp-input";
import { sendOtp, signUp } from "../services/operations/authAPI";
import { Link, useNavigate } from "react-router-dom";


const VerifyEmail = () => {
  const { loading, signupData } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(!signupData) {
        navigate("/signup");
    }
  },[]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;
    dispatch(
        signUp(
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            navigate
        )
    );
  }

  return (
    <div>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div>
          <h1 className="text-richblack-5 font-semibold text-3xl">
            Verify email
          </h1>
          <p className="text-richblack-100 font-normal text-lg mb-4">
            A verification code has been sent to you. Enter the code below
          </p>

          <form onSubmit={handleOnSubmit}>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />
          </form>

          <button type="submit"
          className="bg-yellow-50  text-richblack-900  font-medium text-base p-2 rounded-md mt-4 w-full mb-6">
            {" "}
            Verify Email
          </button>
          
          <div className="text-richblack-100">
            <Link to="/login">
              <p className="flex gap-2 items-center">
                <BiArrowBack />
                Back to login
              </p>
            </Link>
            <button className="text-blue-100"
            onClick={() => dispatch(sendOtp(signupData.email))}>
              {/* <RxCountdownTimer /> */}
              Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;

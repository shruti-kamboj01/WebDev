const BASE_URL = process.env.REACT_APP_BASE_URL


//AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

// COURSE ENDPOINTS
export const courseEndpoints = {
  GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
  COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
  EDIT_COURSE_API: BASE_URL + "/course/editCourse",
  COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
}

// CATAGORIES API
export const categories = {
  CATEGORIES_API: BASE_URL + "/course/showAllCategories",
}

//CONTACT-US API
export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/reach/contact",
}

//PROFILE API
export const profileEndpoints = {
  DELETE_PROFLIE: BASE_URL + "/profile/deleteProfile",
  UPDATE_PROFILE:BASE_URL + "/profile/updateProfile",
  UPDATE_DISPLAY_PICTURE: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PASSWORD_API: BASE_URL + "/auth/changepassword"
 }
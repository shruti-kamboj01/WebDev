const BASE_URL = process.env.REACT_APP_BASE_URL


//AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signUp",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

// CATAGORIES API
export const categories = {
  COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
  }
  
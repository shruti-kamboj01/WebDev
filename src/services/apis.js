const BASE_URL = process.env.REACT_APP_BASE_URL


//AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp"
}

// CATAGORIES API
export const categories = {
  COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
  }
  
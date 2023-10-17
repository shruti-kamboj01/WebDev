import React, { useEffect, useState } from 'react'
import {NavbarLinks} from '../../data/navbar-links'
import Logo from '../../assets/Logo/Logo-Full-Light.png'
import {IoIosArrowDropdownCircle} from "react-icons/io"
import { Link, matchPath } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import {AiOutlineShoppingCart} from "react-icons/ai"
import {FiSearch} from "react-icons/fi"
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { ACCOUNT_TYPE } from '../../utils/constants'

// const subLinks = [
//   {
//     title: "Python",
//     link: "/catalog/python",
//   },
//   {
//     title: "javascript",
//     link: "/catalog/javascript",
//   },
//   {
//     title: "web-development",
//     link: "/catalog/web-development",
//   },
//   {
//     title: "Android Development",
//     link: "/catalog/Android Development",
//   },
// ];

const Navbar = () => {
 
  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile);
  const {totalItems} = useSelector((state) => state.cart);
  
  const location = useLocation();
  const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
      }

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState([]);
  const fetchSublinks = async() => {
    setLoading(true);
    try{
         const result = await apiConnector("GET", categories.CATEGORIES_API);
         console.log("Printing Sublinks result:" , result);
         setSubLinks(result.data.data);
    }catch(error) {
      console.log("Could not fetch the category list",error); 
    }
    setLoading(false);
  }
  useEffect(() => {
    fetchSublinks();
  },[])

  return (
    <div className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700
                    ${location.pathname !== "/" ? "bg-richblack-800" : ""} transition-all duration-200`}>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
        {/* Logo */}
          <Link to={'/'}>
             <img src={Logo}
                 alt='AppLogo' loading='lazy' width={160} height={42}
                />
          </Link>
         
        {/* NavLinks */}
        <nav className='hidden md:block'>
           <ul className='flex gap-x-6 text-richblack-25'>
           {
            NavbarLinks.map((link,index) => (
                <li key={index}>
                {
                    link.title === "Catalog" ? (
                      <div className='relative flex items-center gap-2 group cursor-pointer'>
                           <p>{link.title}</p>
                           <IoIosArrowDropdownCircle/> 
                              

                    </div>) : (
                          <Link to={link?.path}  >
                             <p className={`${matchRoute(link?.path) ? 
                                              "text-yellow-25" : 
                                              "text-richblack-25" }`}>
                                {link.title}
                             </p>
                          </Link>
                    )
                }
                </li>
            ))

           }
              
           </ul>
            
        </nav>

        {/* Login/SignUp/Dashboard */}
        <div className='flex gap-x-4 items-center'>
             {
              user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                <Link to="/dashboard/cart" className='relative'>
                <FiSearch/>
                <AiOutlineShoppingCart/>
                {
                  totalItems > 0 && (
                    <span>
                      {totalItems}
                    </span>
                  )
                }

                </Link>
              )
             }
             {
              token === null && (
                <Link to='/login'> 
                        <button className='border border-richblack-700 bg-richblack-800 px-[14px] py-[8px] text-richblack-100 rounded-md hover:bg-richblack-900 hover:text-richblack-25 transition-all duration-200'>
                          LogIn
                        </button>
                </Link>
              )
             }

             {
              token === null && (
                <Link to='/signUp'> 
                <button className='border border-richblack-700 bg-richblack-800 px-[14px] py-[8px] text-richblack-100 rounded-md hover:bg-richblack-900 hover:text-richblack-25 transition-all duration-200'>

                  SignUp
                </button>

                </Link>
              )
             }
             {
              token !== null && <ProfileDropDown/>
             }
        </div>
        </div> 
    </div>
  )
}

export default Navbar

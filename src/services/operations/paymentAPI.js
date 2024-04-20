
import toast from 'react-hot-toast';
import {paymentEndpoints} from '../apis' 
import { apiConnector } from '../apiconnector';


const {
    CAPTUREPAYMENT_API,
    VERIFYSIGNATURE_API} = paymentEndpoints

// Function to load script and append in DOM tree.
const loadScript = src => new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      console.log('razorpay loaded successfully');
      resolve(true);
    };
    script.onerror = () => {
      console.log('error in loading razorpay');
      resolve(false);
    };
    document.body.appendChild(script);
  });
export async function BuyCourse(
    token,
    courses,
    user_details,
    navigate,
    dispatch
)  {
    const toastId = toast.loading("Loading...")
    try{
    // Loading the script of Razorpay SDK
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
    if (!res) {
        console.log('Razorpay SDK failed to load. Are you online?');
        return;
      }
    //Initiating the order in backend
    const orderResponse = await apiConnector(
        "POST",
        CAPTUREPAYMENT_API,
        {
            courses,
        },
        {
            Authorization: `Bearer ${token}`
        }
    )
    if (!orderResponse.data.success) {
        throw new Error(orderResponse.data.message)
      }
      console.log("PAYMENT RESPONSE FROM BACKEND............", orderResponse.data)
    
       // Opening the Razorpay SDK
       const options = {
        key: process.env.RAZORPAY_KEY,
      currency: orderResponse.data.data.currency,
      amount: `${orderResponse.data.data.amount}`,
      order_id: orderResponse.data.data.id,
      name: "StudyNotion",
      description: "Thank you for Purchasing the Course.",
      image: rzpLogo,
      prefill: {
        name: `${user_details.firstName} ${user_details.lastName}`,
        email: user_details.email,
      },
      handler: function (response) {
        sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token)
        verifyPayment({ ...response, courses }, token, navigate, dispatch)
      },
        

       }
    }catch(error) {

    }
} 

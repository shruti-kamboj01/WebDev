const ContactUs = require("../models/ContactUs");
const mailSender = require("../utils/mailSender");

exports.createContactUs = async(req,res) => {
    try{
        //fetch data
        const {firstName, lastName, email, phoneNumber, message} = req.body;
        //validate
        if(!firstName || !lastName || !email || !phoneNumber || !message) {
            return res.status(402).json({
                   success:false,
                   message:'All fields are required',
            })
        }
        //db entry
        const contactUsdtails = await ContactUs.create({
             firstName:firstName,
             lastName:lastName,
             email:email,
             phoneNumber:phoneNumber,
             message:message,
        });
        //send email
        const emailResponse = await mailSender(
             contactUsdtails.email,
             "Thanking You For Contacting Us",
             "Thanking You For Contacting Us! We have received your message."
        );
        console.log("Email response",emailResponse);
        //send response
        return res.status(200).json({
            success:true,
            message:"Email Sent Successfully",
            data:contactUsdtails,
        });

    }catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

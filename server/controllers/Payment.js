const {instance} = require("../config/razorpay");
const Course = require("../models/Course")
const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const {courseEnrollmentEmail} = require("../mail/templates/emailVerificationTemplate")

//capture the payment and initate the razorpay order
exports.capturePayment = async(req,res) => {
    //get courseId and userId
    const {courseId} = req.body;
    const userId = req.user.id; 
    //validations-->
    //1.validate courseId
    if(!courseId) {
        return res.json({
            success:false,
            message:"Please provide valid courseId",
        })
    }
    //2.validate courseDetails
    let course;
    try{
       course = await Course.findById(courseId);
       if(!course){
            return res.json({
                success:false,
                message:"Could not find the course",
            });
       }
    //3.user already paid for this course
    //converting string type userId into objectId
    const uid = new mongoose.Types.ObjectId(userId);
    if(course.studentsEnrolled.includes(uid)) {
        return res.status(200).json({
            success:false,
            message:'Student is already enrolled',
        });
    }
}catch(error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
    
    //create order
    const amount = course.price;
    const currency = 'INR';
    const options ={
        amount: amount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
        notes:{
            course_id:courseId,
            userId,
        }
    };
    try{
//initiate the payment using razorpay
const paymentResponse = await instance.orders.create(options);
console.log(paymentResponse); 
//return response
return res.status(200).json({
    success:true,
    courseName:course.courseName,
    courseDescription:course.courseDescription,
    thumbnail: course.thumbnail,
    orderId: paymentResponse.id,
    currency:paymentResponse.currency,
    amount:paymentResponse.amount,
});
}catch(error){
    console.log(error);
        res.json({
            success:false,
            message:"Could not initiate order",
        });
}
    
};

//verify signature of razorpay and server

exports.verifySignature = async(req,res) => {
    const webhookSecret = "12345678";

    const signature = req.headers["x-razorpay-signature"];
    
    const shasum =  crypto.createHmac("sha256", webhookSecret);
    //convertig code into string format
    shasum.update(JSON.stringify(req.body));
    //converting webhooksecret into digest
    const digest = shasum.digest("hex");

    //compare the signature
    if(signature === digest) {
        console.log("Payment is Authorised");
    
    //extract data from notes not from req.body bcoz is time razorpay work kar raha hai
    const {courseId, userId} = req.body.payload.payment.entity.notes;

    try{
        const enrolledCourse = await Course.findOneAndUpdate(
            {_id: courseId},
            {$push:{studentsEnrolled: userId}},
            {new:true},

        );

        if(!enrolledCourse) {
            return res.status(500).json({
                success:false,
                message:'Course not Found',
            }
            );
        }
       console.log(enrolledCourse);

       //find the student and add course totheir list enrolled courses me
       const studentsEnrolled = await User.findOneAndUpdate(
        {_id:userId},
        {$push:{courses:courseId}},
        {new:true},
       );
       console.loh(studentsEnrolled);

       //mail send kardo confirmation wala
       const emailResponse = await mailSender(
        enrolledStudent.email,
        "Congratulations from StudyNotion",
        "Congratulations, you are onboarded into new StudyNotion Course",
       );
       console.log(emailResponse);
       return res.status(200).json({
           success:true,
           message:"Signature Verified and Course Added",
       });


    }catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
    }
    else{
        return res.status(400).json({
            success:false,
            message:'Invalid request',
        }); 
    }

};
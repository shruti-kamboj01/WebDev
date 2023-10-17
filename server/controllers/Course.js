const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader")

//Function to create a new course
exports.createCourse = async(req, res) =>{
    try{
        // get user ID from request object
        const userId = req.user.id;
        // get data
        let {courseName, courseDescription,price,tag, category,instructions,whatYouWillLearn,status} = req.body;
        //get thumbnail image form request files
        const thumbnail = req.files.thumbnailImage;
        //check if any of the field is missing
        if(
            !courseName ||
			!courseDescription ||
			!whatYouWillLearn ||
			!price ||
			!tag ||
			!thumbnail ||
			!category
        ) {
            return res.status(400).json({
                success:false,
                message:"All fields are mandatory",
            });
        }

        //check the status
        if(!status || status === undefined) {
            status = "Draft";
        }

        //check for instructor
        const instructorDetails = await User.findById(userId,{accountType:"Instructor,"});
        
        if(!instructorDetails) {
            return res.status(404).json({
                success:false,
                message:"Instructor Details Not Found",
            });
        }

        //check if the category given is valid
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails) {
            return res.status(404).json({
                success:false,
                message:"Category Details Not Found",
            });
        }
        // Upload the thumbnail to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
        );
        console.log(thumbnailImage);

        //create db entry
        const newCourse = await Course.create({
            courseName,
			courseDescription,
			instructor: instructorDetails._id,
			whatYouWillLearn: whatYouWillLearn,
			price,
			tag: tag,
			category: categoryDetails._id,
			thumbnail: thumbnailImage.secure_url,
			status: status,
			instructions,
        });

        // Add the new course to the User Schema of the Instructor
        await User.findByIdAndUpdate(
            {
                _id:instructorDetails._id,
            },
            {
            $push:{
                courses:newCourse._id,
            },
        },
        {new:true}
        );
		// Add the new course to the Categories
        await Category.findByIdAndUpdate(
            {_id: category},
            {
                $push:{
                    courses:newCourse._id,
                },
            },
            {new:true}
        );

        //return response
        res.status(200).json({
			success: true,
			data: newCourse,
			message: "Course Created Successfully",
		});
    }catch(error){
        // Handle any errors that occur during the creation of the course
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to create course",
			error: error.message,
		});
    }
};

// GetAll Courses
exports.getAllCourses = async (req, res) => {
	try {
		const allCourses = await Course.find(
			{},
			{
				courseName: true,
				price: true,
				thumbnail: true,
				instructor: true,
				ratingAndReviews: true,
				studentsEnroled: true,
			}
		)
			.populate("instructor")
			.exec();
		return res.status(200).json({
			success: true,
			data: allCourses,
		});
	} catch (error) {
		console.log(error);
		return res.status(404).json({
			success: false,
			message: `Can't Fetch Course Data`,
			error: error.message,
		});
	}
};

//get course details
exports.getCourseDetails = async (req,res) => {
    try{
        //get id
        const {courseId} = req.body;
        //find course details
        const courseDetails = await Course.find(
                                          {_id:courseId})
                                          .populate({
                                            path:"instructor",
                                            populate:{
                                                path:"additionalDetails",
                                            },
                                          })
                                          .populate("category")
                                          .populate("ratingAndreviews")
                                          .populate({
                                            path:"courseContent",
                                            populate:{
                                                path:"subSection",
                                            },
                                           })
                                           .exec();

          //validations                                 
         if(!courseDetails) {
         return res.status(400).json({
                success:false,
                message:`Could not find the course with ${courseId}`,
            });
         }    
         //return response
         return res.status(200).json({
            success:true,
            message:"Course Details fetched successfully",
            data:courseDetails,
        })

    }catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}
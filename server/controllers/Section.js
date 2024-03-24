const Section = require("../models/Section");
const Course = require("../models/Course");

//CREATE a new section
exports.createSection = async(req,res) => {
    try{
        //fetch the data from req body
        
        const { sectionName, courseId} = req.body;
        // console.log(courseId);
        //validations
        if(!sectionName || !courseId) {
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }

        //create a new section 
        const newSection = await Section.create({sectionName});
       
        //Add the new section to the course's content array
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $push:{
                    courseContent: newSection._id,
                },
            },
            {new:true}
        ) 
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();
           

            //Return the updated course object in the response
            res.status(200).json({
                success:true,
                message:"Section created successfully",
                updatedCourse,
            });
    }catch(error) {
        res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
    }
}

//UPDATE a section
exports.updateSection = async(req,res) => {
    try{
       const { sectionName, sectionId, courseId} = req.body;
       if(!sectionName || !sectionId) {
        return res.status(400).json({
            success:false,
            message:"All fields are required",
        });
    }
       const section = await Section.findByIdAndUpdate(
        sectionId,
        {sectionName},
        {new:true}
       );

       const course = await Course.findById(courseId)
       .populate({
        path: "courseContent",
        populate: {
            path: "subSection",
        }
       })
       .exec()
       res.status(200).json({
        success: true,
        message: "Section Updated Successfully",
    });
    }catch(error) {
        console.error("Error updating section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
    }
};

//DELETE a section
exports.deleteSection = async (req,res) => {
    try{
         const {sectionId, courseId} = req.params;
         await Section.findByIdAndDelete(sectionId);
         //Deleting sectionIs from course schema
         const updatedCourseDetail = await Course.findByIdAndDelete (
            courseId,
            {sectionId},
            {new:true}
        );
         res.status(200).json({
            success: true,
            message: "Section Deleted Successfully",
        });
    }catch(error) {
        console.error("Error deleting section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
    }
}
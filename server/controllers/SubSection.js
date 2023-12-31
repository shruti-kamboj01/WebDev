const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary} = require("../utils/imageUploader");

//CREATE subSection
exports.createSubSection = async(req,res) => {
    try{
        //extract neccessary info for a given req body
        const {sectionId, title, description} = req.body;
        const video = req.files.video;
        console.log(video);
        console.log(title + description);
        
        //check if all necessary fields are provided
        if(!sectionId || !title || !description || !video){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }
        

        //upload the video file to Cloudinary
        const uploadDetails = await uploadImageToCloudinary(
            video,
            process.env.FOLDER_NAME
        )
        console.log("Upploading file"+ uploadDetails);

        //create a new sub-section with the necessary info
        const SubSectionDetails = await SubSection.create({
            tilte:title,
            timeDuration:`${uploadDetails.duration}`,
            description:description,
            videoUrl:uploadDetails.secure_url,
        })

        //update the entry in section
        const updatedSection = await Section.findByIdAndUpdate(
            {_id:sectionId},
            {$push:{subSection:SubSectionDetails._id}},
            {new:true}
        ).populate("subSection")

         // Return the updated section in the response
          return res.status(200).json({ success: true, data: updatedSection })

    }catch(error){
         // Handle any errors that may occur during the process
      console.error("Error creating new sub-section:", error)
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
}

//UPDATE subSection
exports.updateSubSection = async (req,res) => {
    try{
        //fetch data
        const {sectionId, title, description} = req.body;
        //fetch the particular subsecion that you wish to be updated
        const subSection = await SubSection.findById(sectionId);
        
        //validations
        if(!subSection) {
            return res.status(404).json({
                secucess:false,
                message:"SubSection not found",
            })
        }
        if(title !== undefined) {
            subSection.title = title
        }
        if(description !== undefined) {
            subSection.description = description
        }
        if(req.files.video !== undefined) {
            const video = req.files.video
            const uploadDetails = await uploadImageToCloudinary (
                video,
                process.env.FOLDER_NAME
            )
            subSection.videoUrl = uploadDetails.secure_url;
            subSection.timeDuration = `${uploadDetails.duration}`     
        }
        //save the changes
        await subSection.save();

        //return response
        return res.json({
            success:true,
            message:"Section updated successfully",
        })

    }catch(error){
        console.error(error)
        return res.status(500).json({
          success: false,
          message: "An error occurred while updating the sub section",
        })
    }
}

//DELETE subSection
exports.deleteSubSection = async(req,res) => {
    try{
          //fetch details
          const {subSectionId, sectionId} = req.body;
          //pull the details from section schema
         await Section.findByIdAndUpdate(
            {_id:sectionId},
            {
                $pull:{
                    subSection:subSectionId,
                },
            }
         )
          //delete the subsection
          const subSection = await SubSection.findByIdAndDelete({_id:subSectionId});

          //validations
          if(!subSection) {
            return res.json({
                success:false,
                message:"SubSction not found"
            })
          }
          //return response
          return res.json({
            success:true,
            message:"Section deleted successfully",
        })

    }catch(error){
        console.error(error)
        return res.status(500).json({
          success: false,
          message: "An error occurred while deleting the sub section",
        })
    }
}

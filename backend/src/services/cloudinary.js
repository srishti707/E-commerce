const cloudinary = require("cloudinary").v2;
const dotenv=require("dotenv");
const fs = require("fs");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,

  api_secret: process.env.CLOUD_API_SECRET,
});

exports.uploadSingleImage = async (filePath) => {
  try {
    if (!filePath) {
      return null;
    }
    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(filePath);//a method to delete file from the file system.
    console.log("file uploaded on cloudinary");
    return response;
  } catch (err) {
    console.log("Error in uploading file to cloudinary");
    console.log(err);
    return null;
  }
};
exports.uploadMultipleImages=async(filePaths)=>{
  try{
    if(!filePaths){
      return null;
    }
   const filesToUpload = filePaths.map(async(path)=>{

      const response= await cloudinary.uploader.upload(path,{resource_type:"auto"});
      fs.unlinkSync(path);
      return response;
    })

    const uploadedFiles=await Promise.all(filesToUpload);
    return uploadedFiles;
  }
  catch(err){
    console.log("Error in uploading multiple files to cloudinary");
    console.log(err);
    return null;
  }
}
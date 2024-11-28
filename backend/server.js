const {app}=require("./app");
const mongoose=require("mongoose");
const PORT=process.env.PORT || 3000;
const URI=process.env.MONGODB_URI ;
mongoose.connect(URI).then(()=>{
    console.log("Connected to MongoDB")
}).catch(err=>{
    console.log(err);
})
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})


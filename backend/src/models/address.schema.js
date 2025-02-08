const mongoose=require("mongoose");
const Address=new mongoose.Schema({
    //userId
    //country,street,city,state,pincode
  user_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Customer",
    required:true
},
country:{
    type:String,
    required:true
},
street:{
    type:String,
    
},
city:{
    type:String,
    required:true
},
state:{
    type:String,
    required:true
},
pincode:{
    type:Number,
    required:true
}
})
const address=mongoose.model("Address",Address);
module.exports=address
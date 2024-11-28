const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const customerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
    },
    phone_no:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        enum:['admin', 'customer'],
        default:'customer'

    },
    gender:{
        type:String,
        required:true,
        enum:['male', 'female', 'other']
    },
    password:{
        type:String,
        required:true,
    },
    reset_password_token:{
        type:String,
        
    },
    reset_password_token_expiry:{
        type:Date,
        
    },
    confirm_password:{
        type:String,
        required:true,
        validate: {
            validator: function(val) {
                return val === this.password;
            },
            message: "Passwords do not match."
        }
    }

        
},{timestamps:true})
//hash the password before saving it to database
customerSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
   this.password=await bcrypt.hash(this.password,12);
   this.confirm_password=undefined;
   next();
})
const Customer=mongoose.model("Customer",customerSchema);
module.exports=Customer;
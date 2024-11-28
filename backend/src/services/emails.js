const nodemailer=require("nodemailer");
const dotenv=require("dotenv");
dotenv.config();
const transporter = nodemailer.createTransport({
    host:process.env.EMAIL_HOST,
    port:process.env.EMAIL_PORT,
    secure:false,
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_API_KEY,
    },
  ignoreTLS: true
})
exports.welcomeEmail=async(email)=>{
const mailOptions={
    from:"<srishtibhatia7070@gmail.com>",
    to:email,
    subject:"Welcome to Our company!",
    text:"Thank you for joining our company! We are excited to have you on board."
}
transporter.sendMail(mailOptions)
.then((info)=>{
    return info
}).catch((error)=>{
    console.log("error in sending mail");
    console.log(error);
    return error;
});
}
exports.resetPasswordEmail=async(link,email)=>{
const mailOptions={
    from:"<srishtibhatia7070@gmail.com>",
    to:email,
    subject:"You have forgotten your password.You can now reset it here!",
    text:`Please click on the link below to reset your password as it will expire in 10 minutes!${link}`
}
transporter.sendMail(mailOptions)
.then((info)=>{
    return info
}).catch((error)=>{
    console.log("error in sending mail");
    console.log(error);
    return error;
});
}
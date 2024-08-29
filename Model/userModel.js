// import mongoose
const mongoose=require("mongoose")
// create schema
const userSchema =new mongoose.Schema({
    username:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    },
    github:{
        type:String
    },
    linkedin:{
        type:String
    },
    profile:{
        type:String
    }
})
// model method
const users=mongoose.model("users",userSchema)

module.exports=users
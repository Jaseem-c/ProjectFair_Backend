// import mangoose
const mongoose=require("mongoose")
// create schema
const projectSchema= new mongoose.Schema({
    title:{
        required:true,
        type:String,
    },
    language:{
        required:true,
        type:String,
    },
    github:{
        required:true,
        type:String,
    },
    website:{
        required:true,
        type:String,
    },
    overview:{
        required:true,
        type:String,
    },
    projectImage:{
        required:true,
        type:String,
    },
    userId:{
        required:true,
        type:String,
    }
})
// create model
const projects=mongoose.model("projects",projectSchema)

module.exports=projects
// import mongoose
const mongoose=require("mongoose")
// import url
const connectionString=process.env.DATABASE
// connect() method 
mongoose.connect(connectionString).then(()=>{
    console.log("mongodb connected successfully"); 
}).catch((err)=>{
    console.log(`connection failed due to ${err}`);
    
})
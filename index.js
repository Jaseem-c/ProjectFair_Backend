// import dotenv
require("dotenv").config() //load environment variables
// import express
const express=require("express")
// import cors
const cors = require("cors");

// import router(register)
const router=require('./routes')

// import mongodb connection file
require("./connection")

// create server
const pfServer=express()

// use cors to connect front end
pfServer.use(cors())

// parse jsondata
pfServer.use(express.json())

// use router 
pfServer.use(router)

// static method is used to export file or folder from the server side
// first argument-filename shoulde be use other appliaction 
// 2nd argument - pathof file or folder
pfServer.use("/Uploads",express.static("./Uploads"))

// set port
const PORT = 4000 || process.env.PORT
// listen the port
pfServer.listen(PORT,()=>{
    console.log(`Server Running Succesfully at port number ${PORT}`);
    
})

// logic(operations)
// pfServer.get('/get',(req,res)=>{
//     res.send("get Request received")
// })
// pfServer.post('/post',(req,res)=>{
//     res.send("post Request received")
// })
// pfServer.put('/put',(req,res)=>{
//     res.send("put Request received")
// })
// pfServer.delete('/delete',(req,res)=>{
//     res.send("delete Request received")
// })


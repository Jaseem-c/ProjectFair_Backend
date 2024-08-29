// jsown web token
const jwt= require("jsonwebtoken")
const jwtMiddleware=(req,res,next)=>{
// logic
// res.status(200).json("success")
// console.log("inside middle ware");
const token =req.headers["authorization"].split(' ')[1]
// console.log(token);

try {
    const jwtResponse=jwt.verify(token,"supersecretkey")
    // console.log(jwtResponse);
    req.payload=jwtResponse.userId
    next()
    
} catch (error) {
    res.status(401).json("authorization failed")
    console.log(error);
    
}


}

module.exports =jwtMiddleware
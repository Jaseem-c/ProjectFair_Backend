const users = require("../Model/userModel");
// library for tocken
const jwt=require("jsonwebtoken")
// register 
exports.registerController =async (req, res) => {
    //logic
    const { username, email, password } = req.body
    console.log(username, email, password);
    try {
      const existingUser=  await users.findOne({email})
      if(existingUser){
        res.status(406).json("account already exists")
      }
      else{
        const newUser=new users({
            username,
            email,
            password,
            github:"",
            linkedin:"",
            profile:""
        })
        await newUser.save()
        res.status(200).json("Registration successfully")
      }
    } catch (error) {
        res.status(401).json(error)
    }
}

// login 
exports.loginController = async (req, res) => {
  const {email,password} =req.body
  console.log(email,password);  
  try {
    const existingUser = await users.findOne({email,password})
    if(existingUser){
      const token = jwt.sign({userId:existingUser._id},"supersecretkey")
      res.status(200).json({existingUser,token})
    }
    else{
      res.status(406).json("Invalid email or password")
    }
    
  } catch (error) {
    res.status(401).json("Something Went Wrong")
  }
  
}
// to update profile
exports.updateProfileController = async (req, res) => {
  const userId=req.payload
  const {username,email,password,github,linkedin,profile}=req.body
  const profileImg=req.file?req.file.filename:profile

  try {
    const existingUser=await  users.findByIdAndUpdate({_id:userId},{
      username,
      email,
      password,
      github,
      linkedin,
      profile:profileImg
    },{new:true})
    await existingUser.save()
    res.status(200).json(existingUser)
  } catch (error) {
    res.status(401).json(error)
  }
}
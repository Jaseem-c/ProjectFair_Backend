// import express
const express=require("express")
// import usercontroller
const userController=require("./Controllers/userController")
const projectController = require("./Controllers/projectController")
const jwtMiddleware = require("./Middleware/jwtMiddleware")
const multer = require("./Middleware/multer")
// routing based on the class Routes present in the express library
// create object
const router=new express.Router()

// register
router.post('/register',userController.registerController)
// login 
router.post('/login',userController.loginController)
// add projects
router.post("/add-projects",jwtMiddleware,multer.single("projectImg"),projectController.addProjectController)

// get all projects
router.get("/all-projects",projectController.getAllProjectController)
// get home projects
router.get("/home-projects",projectController.getHomeProjectController)
// to get userprojects
router.get("/user-projects",jwtMiddleware,projectController.getUserProjectController)
// to delete userproject
router.delete("/delete-userproject/:id",projectController.deleteUserProjectController)
// to edit user projects
router.put("/edit-userproject/:id",jwtMiddleware,multer.single("projectImg"),projectController.editUserProjectController)
// to update profile
router.put("/update-profile",jwtMiddleware,multer.single("profile"),userController.updateProfileController)

module.exports=router
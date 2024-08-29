// add project
const projects=require('../Model/projectModel')
exports.addProjectController = async (req, res) => {

    // console.log("inside the project control");
    // userid
    const userId = req.payload
    // console.log(userId);

    const { title, language, github, website , overview}=req.body
    // console.log( title, language, github, website , overview);

    const projectimage=req.file.filename
    // console.log(projectimage);
    
    try {
        const existingProject= await projects.findOne({github})
        if(existingProject){
            res.status(406).json("project already exists")
        }
        else{
            const newProject= new projects({
                title,
                language,
                github,
                website ,
                overview,
                projectImage:projectimage,
                userId,
            })
            await newProject.save()
            res.status(200).json("project added successfully")
        }
       
        
    } catch (error) {
        res.status(401).json(error)
    }
}

// to get all projects
exports.getAllProjectController = async (req, res) => {
    // body-req.body
    // path -req.params
    // query paramter- req.query
    const serachKey=req.query.search
    console.log(serachKey);
    
    const query={
        language:{
            // options-i => to remove case sensitivity
            $regex:serachKey,$options:"i"
        }
    }

try {
    const allProjects= await projects.find(query)
    res.status(200).json(allProjects)
} catch (error) {
    res.status(401).json(error)
}
}

// to get home projects(to show 3 projects)
exports.getHomeProjectController=async(req,res)=>{
    try {
        const homeProjects=await projects.find().limit(3)
        res.status(200).json(homeProjects)
    } catch (error) {
        res.status(401).json(error)
    }
}

// to get user project details
exports.getUserProjectController=async(req,res)=>{
    const userId=req.payload
    try {
        const userProjects=await projects.find({userId})
        res.status(200).json(userProjects)
    } catch (error) {
        res.status(401).json(error)
    }
}

// to delete userproject
exports.deleteUserProjectController=async(req,res)=>{
    // const  projectId=req.params.id
    const {id}=req.params
    try {
        
        const item=await projects.findByIdAndDelete({_id:id})
        res.status(200).json("Delete success")

    } catch (error) {
         res.status(401).json(error)
    }
}

// to  edit userprojects
exports.editUserProjectController=async(req,res)=>{
    const {title,language,github,website,overview,projectImg}=req.body
    // if image updated
    const projectimage=req.file?req.file.filename:projectImg


    const userId=req.payload
    const {id}=req.params
   

    try {
        const existingProject=await projects.findByIdAndUpdate({_id:id},{
            title,
            language,
            github,
            website,
            overview,
            projectImage:projectimage,
            userId
        },{new:true})
        await existingProject.save()
        res.status(200).json(existingProject)
    } catch (error) {
        res.status(401).json(error)
    }
}
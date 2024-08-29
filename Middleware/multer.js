// import multer
const multer=require("multer")


const storage=multer.diskStorage({
    destination:(req,file,callBack)=>{
        callBack(null,"./Uploads")
    },
    filename:(req,file,callBack)=>{
        const filename=`image-${Date.now()}-${file.originalname}`
        callBack(null,filename)
    }
})

// filter- to control uploading datas
const fileFilter=(req,file,callBack)=>{

    if(file.mimetype=='image/png' || file.mimetype=='image/jpeg' || file.mimetype=='image/jpg')
    {
        callBack(null,true)
    }
    else{
        callBack(null,false)
        return callBack(new Error('only allows jpg,jpeg and png files'))
    }

}

// create multer
const multerConfig=multer({
storage,
fileFilter
})

module.exports=multerConfig;

const router = require("express").Router();

// This route exist only for receive an image, bring to cloudinary and send the URL to the front.E
const uploader = require("../middlewares/cloudinary.middlewares")

router.post("/", uploader.single("picture"), (req,res,next)=> {

    if(req.file === undefined) {
        res.status(400).json("problemas subiendo la imagen")
        return
    }
    console.log(req.file.path)//CLOUDINARY URL
    res.status(400).json({ picture:req.file.path })
})



module.exports = router;
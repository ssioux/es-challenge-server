// const router = require("express").Router();

// // This route exist only for receive an image, bring to cloudinary and send the URL to the front.E
// const uploader = require("../middlewares/cloudinary.middlewares")

// router.post("/", uploader.single("image"), (req,res,next)=> {

//     if(req.file === undefined) {
//         res.status(400).json("problemas subiendo la imagen")
//         return
//     }
//     console.log(req.file.path)
//     res.status(400).json({image:})
// })



// module.exports = router;
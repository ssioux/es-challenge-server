const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// * authRoutes
 
const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)


module.exports = router;


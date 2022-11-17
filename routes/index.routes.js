const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// * authRoutes

const authRoutes = require("./auth.routes");
router.use("/auth", authRoutes);

const gameRoutes = require("./game.routes");
router.use("/game", gameRoutes);

const teamRoutes = require("./team.routes");
router.use("/team", teamRoutes);

const tourneyRoutes = require("./tourney.routes");
router.use("/tourney", tourneyRoutes);

const profileRoutes = require("./profile.routes");
router.use("/profile", profileRoutes);

const uploadRoutes = require("./upload.routes");
router.use("/upload", uploadRoutes);

module.exports = router;

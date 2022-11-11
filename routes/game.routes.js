const router = require("express").Router();

const isAuthenticated = require("../middlewares/auth.middlewares");
// const uploader = require("../middlewares/cloudinary.middlewares")
const Game = require("../models/Game.model");

// GET "/game" => List of games from BD
router.get("/list", async (req, res, next) => {
  try {
    const response = await Game.find();
    res.status(200).json("game list sende it");
    console.log(response);
  } catch (error) {
    next(error);
  }
});

// POST "/game/create" => create new game in BD
router.post("/create", isAuthenticated, async (req, res, next) => {
  const { name, description, picture } = req.body;

  try {
    const response = await Game.create({
      name: name,
      description: description,
      picture: picture,
      creator: req.payload._id,
    });

    res.status(200).json("Game Created");
    console.log(response);
  } catch (error) {
    next(error);
  }
});

// GET "/game/gameId/details" => details game in BD
router.get("/:gameId/details", isAuthenticated, async (req, res, next) => {
  const { gameId } = req.params;

  try {
    const response = await Game.findById(gameId);

    // sending info to client
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

// PATCH "/game/gameId/edit" => update a game in BD
router.patch("/:gameId/edit", isAuthenticated, async (req, res, next) => {
  const { gameId } = req.params;
  const { name, description, picture } = req.body;

  try {
    await Game.findByIdAndUpdate(gameId, {
      name: name,
      description: description,
      picture: picture,
      creator: req.payload._id,
    });

    // sending info to client
    res.status(200).json("game updated correctly");
  } catch (error) {
    next(error);
  }
});

// DELETE "/game/gameId/edit" => delete a game in BD
router.delete("/:gameId/delete", isAuthenticated, async (req, res, next) => {
  const { gameId } = req.params;

  try {
    await Game.findByIdAndDelete(gameId);

    // sending info to client
    res.status(200).json("game deleted");
  } catch (error) {
    next(error);
  }
});

module.exports = router;

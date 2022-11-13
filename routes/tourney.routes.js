



const router = require("express").Router();
const isAuthenticated = require("../middlewares/auth.middlewares");

const Tourney = require("../models/Tourney.model");

// POST "/tourney/create" . Create Tourney
router.post("/create", isAuthenticated, async (req, res, next) => {
    const { name, game } = req.body;
    console.log(req.body)
    
    try {
      await Tourney.create({
        name: name,
        game: game,
        creator: req.payload._id
      });
      // send message to client
      res.status(201).json("Tourney created correctly");
    } catch (error) {
      next(error);
    }
  });

  // GET "/tourney/list" => list of Tourneys
router.get("/list", async (req, res, next) => {
    try {
      const tourneyList = await Tourney.find().populate("game").populate("creator");
      // send info to client
      res.status(200).json(tourneyList);
    } catch (error) {
      next(error);
    }
  });

  // GET "/team/tourneyId/details" => each Tourney details
router.get("/:tourneyId/details", async (req, res, next) => {
    const { tourneyId } = req.params;
    try {
      const tourneyDetails = await Tourney.findById(tourneyId);
      // send info to client
      res.status(200).json(tourneyDetails);
    } catch (error) {
      next(error);
    }
  });

  // PATCH "/tourney/:tourneyId/edit" => Update Tourney
router.patch("/:tourneyId/edit", isAuthenticated, async (req, res, next) => {
    const { teamId } = req.params;
    const { name, game } = req.body;
   
    try {
      await Tourney.findByIdAndUpdate(teamId, {
        name: name,
        game: game
      });
      // send message to client
      res.status(201).json("Tourney updated correctly");
    } catch (error) {
      next(error);
    }
  });
  // DELETE "/tourney/:tourneyId/delete" => Delete Tourney
  router.delete("/:tourneyId/delete", isAuthenticated, async (req, res, next) => {
    const { tourneyId } = req.params;
    await Tourney.findByIdAndDelete(tourneyId);
  
    // send message to client
    res.status(200).json("Tourney Deleted");
  });










module.exports = router;
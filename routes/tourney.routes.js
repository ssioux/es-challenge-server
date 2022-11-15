



const router = require("express").Router();
const isAuthenticated = require("../middlewares/auth.middlewares");

const Tourney = require("../models/Tourney.model");
const Team = require("../models/Team.model");

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
      const tourneyDetails = await Tourney.findById(tourneyId).populate("teams");
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
 
   // PATCH "/tourney/:tourneyId/add-team" => add team to torney
   router.patch("/:tourneyId/add-team", isAuthenticated, async(req,res,next) => {
    const {tourneyId} = req.params
    try {
      const findTeamCreator = await Team.findOne({creator:req.payload._id})
        

      await Tourney.findByIdAndUpdate(tourneyId, {$addToSet:{teams:findTeamCreator}})
    } catch (error) {
      next(error)
      
    }

   })

   // GET "/tourney/:tourneyId/sort-teams" => sort the teams in each Tourney for start the tournament
   router.get("/:tourneyId/sort-teams", isAuthenticated, async(req, res, next)=> {
    const {tourneyId} = req.params

    try {
      const response = await Tourney.findById(tourneyId).populate("teams")
      const eachTourneyTeamsArr = [...response.teams]
      const sorty = eachTourneyTeamsArr.sort(function(a,b){return (Math.random()-0.5)})
      res.status(200).json(sorty)
      
    } catch (error) {
      next(error)
    }






   })








module.exports = router;
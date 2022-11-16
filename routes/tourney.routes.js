



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
      const tourneyDetails = await Tourney.findById(tourneyId).populate("teams").populate("quarterA").populate("quarterB").populate("quarterC").populate("quarterD")
      // send info to client
      res.status(200).json(tourneyDetails);
    } catch (error) {
      next(error);
    }
  });

  // PATCH "/tourney/:tourneyId/edit" => Update Tourney
router.patch("/:tourneyId/edit", isAuthenticated, async (req, res, next) => {
    const { tourneyId } = req.params;
    const { name, game,scoreQA1, scoreQA2, scoreQB1,scoreQB2, scoreQC1, scoreQC2, scoreQD1, scoreQD2,scoreSA1,scoreSA2,scoreSB1,scoreSB2,scoreF1,scoreF2} = req.body;
   
    try {
      await Tourney.findByIdAndUpdate(tourneyId, {
        name: name,
        game: game,
        scoreQA1:scoreQA1,
        scoreQA2:scoreQA2,
        scoreQB1:scoreQB1,
        scoreQB2:scoreQB2,
        scoreQC1:scoreQC1,
        scoreQC2:scoreQC2,
        scoreQD1:scoreQD1,
        scoreQD2:scoreQD2,
        scoreSA1:scoreSA1,
        scoreSA2:scoreSA2,
        scoreSB1:scoreSB1,
        scoreSB2:scoreSB2,
        scoreF1:scoreF1,
        scoreF2:scoreF2,
      });
       
       const response = await Tourney.findById(tourneyId)
         if(response.scoreQA1 > response.scoreQA2  ) {
          await Tourney.findByIdAndUpdate(tourneyId,{$addToSet:{semiA:response.quarterA[0]}})
         }

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
   router.patch("/:tourneyId/sort-teams", isAuthenticated, async(req, res, next)=> {
    const {tourneyId} = req.params

    try {
      const response = await Tourney.findById(tourneyId).populate("teams")
  
      const eachTourneyTeamsArr = [...response.teams]
      const sorty = eachTourneyTeamsArr.sort(function(a,b){return (Math.random()-0.5)})
     
      

      const r1 = await Tourney.findByIdAndUpdate(tourneyId, {$addToSet:{quarterA: sorty[0]}}, {new:true})
      const r2 = await Tourney.findByIdAndUpdate(tourneyId, {$addToSet:{quarterA: sorty[1]}}, {new:true})
      const r3 = await Tourney.findByIdAndUpdate(tourneyId, {$addToSet:{quarterB: sorty[2]}}, {new:true})
      const r4 = await Tourney.findByIdAndUpdate(tourneyId, {$addToSet:{quarterB: sorty[3]}}, {new:true})
      const r5 = await Tourney.findByIdAndUpdate(tourneyId, {$addToSet:{quarterC: sorty[4]}}, {new:true})
      const r6 = await Tourney.findByIdAndUpdate(tourneyId, {$addToSet:{quarterC: sorty[5]}}, {new:true})
      const r7 = await Tourney.findByIdAndUpdate(tourneyId, {$addToSet:{quarterD: sorty[6]}}, {new:true})
      const r8 = await Tourney.findByIdAndUpdate(tourneyId, {$addToSet:{quarterD: sorty[7]}}, {new:true})
    
      res.status(200).json(sorty)
      
    } catch (error) {
      next(error)
    }

  })













module.exports = router;
const router = require("express").Router();
const isAuthenticated = require("../middlewares/auth.middlewares");
const Team = require("../models/Team.model");
const User = require("../models/User.model");

// GET "/team/list" => list of teams
router.get("/list", async (req, res, next) => {
  try {
    const teamList = await Team.find();
    // send info to client
    res.status(200).json(teamList);
  } catch (error) {
    next(error);
  }
});

// POST "/team/create" . Create Team
router.post("/create", isAuthenticated, async (req, res, next) => {
  const { name, nameTag, picture, joinPassword} = req.body;
  const teamToCreate = { 
    name : name,
    nameTag: nameTag,
    picture: picture,
    creator: req.payload._id,
    joinPassword: joinPassword
   };
  try {
    
    await Team.create(teamToCreate);
    // send message to client
    res.status(201).json("Team created correctly");
  } catch (error) {
    next(error);
  }
});

// PATCH "/team/:teamId/edit" . Update team
router.patch("/:teamId/edit", isAuthenticated, async (req, res, next) => {
  const { teamId } = req.params;
  const { name, nameTag, picture, creator } = req.body;
  const teamToEdit = { name, nameTag, picture, creator: req.payload._id };
  try {
    await Team.findByIdAndUpdate(teamId, teamToEdit);
    // send message to client
    res.status(201).json("Team updated correctly");
  } catch (error) {
    next(error);
  }
});
// DELETE "/team/:teamId/delete" . Delete team
router.delete("/:teamId/delete", isAuthenticated, async (req, res, next) => {
  const { teamId } = req.params;
  await Team.findByIdAndDelete(teamId);

  // send message to client
  res.status(200).json("Team deleted");
});

// GET "/team/teamId/details" . team details
router.get("/:teamId/details", isAuthenticated, async (req, res, next) => {
  const { teamId } = req.params;
  try {
    const details = await Team.findById(teamId).populate("members");
    // send info to client
    res.status(200).json(details);
  } catch (error) {
    next(error);
  }
});

// GET "/team/find-creator"
router.get("/find-creator",isAuthenticated, async (req,res,next) => {
 
  console.log(req.payload)
  //  const {creatorId} = req.payload._id
  try {
    const findCreator = await Team.findOne({creator:req.payload._id}).populate("members")
    console.log(findCreator)
    if(findCreator !==  null){
     res.status(200).json(findCreator)
    }else{
      res.status(200).json(null)

    }

  } catch (error) {
    next(error)
    
  }

})

// PATCH "/team/:teamId/add-member" => adds a member to the team.
router.patch("/:teamId/add-member", isAuthenticated, async (req, res, next)=> {
  const {teamId} = req.params

  try {
    await Team.findByIdAndUpdate(teamId, {$addToSet: { members: req.payload._id}})
    res.status(201).json("Member added correctly");
  } catch (error) {
    next(error)
  }


})

module.exports = router;

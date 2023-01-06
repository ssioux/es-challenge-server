const router = require("express").Router();
const { isAuthenticated, isAdmin } = require("../middlewares/auth.middlewares");
const uploader = require("../middlewares/cloudinary.middlewares");
const Team = require("../models/Team.model");
const User = require("../models/User.model");

// GET "/team/list" => list of teams
router.get("/list", async (req, res, next) => {
  try {
    const teamList = await Team.find().populate("members");
    // send info to client
    res.status(200).json(teamList);
  } catch (error) {
    next(error);
  }
});

// POST "/team/create" . Create Team
router.post("/create", isAuthenticated, async (req, res, next) => {
  const { name, nameTag, joinPassword, picture } = req.body;

  const teamToCreate = {
    name: name,
    nameTag: nameTag,
    picture: picture,
    creator: req.payload._id,
    joinPassword: joinPassword,
  };
  try {
    // Validation 1: fields mustn't be empty
    if (name === "" || nameTag === "" || joinPassword === "") {
      res
        .status(400)
        .json({ errorMessage: "All the fields must be completed",
          errorMessage2: "*",
       });
      return;
    }

    // Validation 2: Name must have more than 4 letters
    if (name.length < 4){
      res
      .status(400)
      .json({ errorMessage: "Name must have min 4 letters",
        errorMessage2: "*",
     });
    return;
    }

     // Validation 3: Name Tag must have max 3 characters
     if (nameTag.length > 3){
      res
      .status(400)
      .json({ errorMessage: "Name Tag must have max 3 characters",
        errorMessage2: "*",
     });
    return;
    }

  // Validation 4: Join Password must have min 4 characters
    if (joinPassword.length < 4){
      res
      .status(400)
      .json({ errorMessage: "Join Password must have min 4 characters",
        errorMessage2: "*",
     });
    return;
    }
    await Team.create(teamToCreate);
    // send message to client
    res.status(201).json("Team created correctly");

    const findTeamCreator = await Team.findOne({
      creator: req.payload._id,
    });
    console.log(
      "🚀 ~ file: team.routes.js:36 ~ router.patch ~ findTeamCreator",
      findTeamCreator
    );
    await Team.findByIdAndUpdate(findTeamCreator._id, {
      $addToSet: { members: req.payload._id },
    });
  } catch (error) {
    next(error);
  }
});

// PATCH "/team/:teamId/edit" . Update team
router.patch(
  "/:teamId/edit",
  isAuthenticated,
  isAdmin,
  async (req, res, next) => {
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
  }
);
// DELETE "/team/:teamId/delete" . Delete team
router.delete(
  "/:teamId/delete",
  isAuthenticated,
  isAdmin,
  async (req, res, next) => {
    const { teamId } = req.params;
    await Team.findByIdAndDelete(teamId);

    // send message to client
    res.status(200).json("Team deleted");
  }
);

// GET "/team/teamId/details" . team details
router.get("/:teamId/details", async (req, res, next) => {
  const { teamId } = req.params;
  try {
    const details = await Team.findById(teamId).populate("members");
    // send info to client
    res.status(200).json(details);
  } catch (error) {
    next(error);
  }
});

// GET "/team/find-creator" => Find Team Creator
router.get("/find-creator", isAuthenticated, async (req, res, next) => {
  console.log(req.payload);
  //  const {creatorId} = req.payload._id
  try {
    const findTeamCreator = await Team.findOne({
      creator: req.payload._id,
    }).populate("members");
    console.log(findTeamCreator);
    if (findTeamCreator !== null) {
      res.status(200).json(findTeamCreator);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    next(error);
  }
});

// PATCH "/team/:teamId/add-member" => adds a member to the team.
router.patch("/:teamId/add-member", isAuthenticated, async (req, res, next) => {
  const { teamId } = req.params;
  const {password} = req.body
  console.log("req.body",req.body)
  try {
    const currentTeam = await Team.findById(teamId)
    if (currentTeam.joinPassword === password){
      await Team.findByIdAndUpdate(teamId, {
        $addToSet: { members: req.payload._id },
      });
      res.status(201).json("Member added correctly");
    }else{
      res.status(400).json({errorMessage:"Incorrect Password"})
      return
    }
    
  } catch (error) {
    next(error);
  }
});

//PATCH "/team/:teamId/remove-member" => remove current user from the current team
router.patch("/:teamId/remove-member", isAuthenticated, async(req, res, next) => {
const {teamId} = req.params
try {
  await Team.findByIdAndUpdate(teamId, {$pull: {members: req.payload._id}})
  res.status(200).json({okMessage: "Member removed from team correctly"})
} catch (error) {
  next(error)
}
})
// GET "/team/find-team-user"
router.get("/find-team-user", isAuthenticated, async (req, res, next) => {
  try {
    const findUserIncluded = await Team.find({
      members: req.payload._id,
    }).populate("members");
    console.log(findUserIncluded);
    if (findUserIncluded !== null) {
      res.status(200).json(findUserIncluded);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;

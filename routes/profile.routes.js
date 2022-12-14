const router = require("express").Router();
const { isAuthenticated, isAdmin } = require("../middlewares/auth.middlewares");
const uploader = require("../middlewares/cloudinary.middlewares");
const User = require("../models/User.model");

// GET "/profile/user-list"  Users list
router.get("/user-list", async (req, res, next) => {
  try {
    const userList = await User.find();
    // send info to client
    res.status(200).json(userList);
  } catch (error) {
    next(error);
  }
});

// GET "/profile/:userId/details" User details
router.get("/:userId/details", async (req, res, next) => {
  const { userId } = req.params;

  try {
    const userDetails = await User.findById(userId);
    // send info to client
    res.status(200).json(userDetails);
  } catch (error) {
    next(error);
  }
});

// PATCH "/profile/:userId/edit" edit User
router.patch(
  "/:userId/edit",
  isAuthenticated,
  uploader.single("picture"),
  async (req, res, next) => {
    const { userId } = req.params;
    const { username, email, password, picture } = req.body;
    const userEdit = { username, email, password, picture };

    try {
      await User.findByIdAndUpdate(userId, userEdit);
      // send info to client
      res.status(200).json("User updated correctly");
    } catch (error) {
      next(error);
    }
  }
);

// DELETE "/profile/:userId/delete" delete User
router.delete("/:userId/delete", isAdmin, async (req, res, next) => {
  const { userId } = req.params;
  try {
    await User.findByIdAndDelete(userId);
    // send info to client
    res.status(200).json("User deleted correctly");
  } catch (error) {
    next(error);
  }
});

module.exports = router;

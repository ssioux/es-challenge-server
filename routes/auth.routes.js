const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middlewares/auth.middlewares");

// * Authentication Routes

// POST "/api/auth/signup" => user register
router.post("/signup", async (req, res, next) => {
  const { username, email, password, picture } = req.body;

  // Validation 1: All the fields must not be empty
  if (username === "" || email === "" || password === "") {
    res.status(400).json({ errorMessage: "All the fields must be completed" });
    return;
  }

  // Validation 2: username should at least contain 4 characters
  if (username.length < 4) {
    res
      .status(400)
      .json({ errorMessage: "Username must contain at least 4 characters" });
      return;
  }
  // Validation 3: Email format validation
  const emailFormat =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
  if (!emailFormat.test(email)) {
    res.status(406).json({ errorMessage: "Incorrect email format" });
    return;
  }
  // Validation 4: Password format validation
  const passwordFormat =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  if (!passwordFormat.test(password)) {
    res.status(406).json({
      errorMessage:
        "Password should have at least 8 characteres, an uppercase letter and a number",
    });
    return;
  }

  try {
    // Validation 5: Email doesn't already exists in the DB
    const foundEmail = await User.findOne({ email: email });
    if (foundEmail !== null) {
      res
        .status(406)
        .json({
          errorMessage: "Email has been already registered in the website.",
        });
      return;
    }

    // Validation 6: User doesn't already exists in the DB
    const foundUser = await User.findOne({ username: username });
    if (foundUser !== null) {
      res
        .status(406)
        .json({
          errorMessage: "Username has been already registered in the website.",
        });
      return;
    }

    // Code Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = {
      username: username,
      email: email,
      password: hashPassword,
      picture: picture,
    };
    // Create User
    await User.create(newUser);
    // Send Ok message to Front End
    res.status(201).json("User registered correctly.");
  } catch (error) {
    next(error);
  }
});

// POST "/api/auth/login" user loger
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  // Validation 1. Fields musn´t be empty
  if (email === "" || password === "") {
    res.status(400).json({ errorMessage: "All the fields must be completed" });
    return;
  }
  // Validation 2: Email format validation
  const emailFormat =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
  if (!emailFormat.test(email)) {
    res.status(406).json({ errorMessage: "Incorrect email format" });
    return;
  }
  // Validation 3: Password format validation
  const passwordFormat =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  if (!passwordFormat.test(password)) {
    res.status(406).json({
      errorMessage:
        "Password should have at least 8 characteres, an uppercase letter and a number",
    });
    return;
  }

  try {
    // Validation 4: User is already registered in the DB
    const foundUser = await User.findOne({ email: email });
    console.log(foundUser);
    if (foundUser === null) {
      res.status(400).json({ errorMessage: "Incorrect credentials" });
      return;
    }
    // Validation 5: Password is already registered in the DB
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if (isPasswordValid === false) {
      res.status(400).json({ errorMessage: "Incorrect credentials" });
      return;
    }

    // Token User info by payload
    const payload = {
      _id: foundUser._id,
      username: foundUser.username,
      email: foundUser.email,
      role: foundUser.role,
      picture: foundUser.picture,
    };
    // Token config
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "6h",
    });

    // Send Token to client
    res.status(200).json({ authToken: authToken });
  } catch (error) {
    next(error);
  }
});

// GET "/api/auth/verify" => Back End confirms user has been validated to Front End

router.get("/verify", isAuthenticated, (req, res, next) => {
  res.status(200).json({ user: req.payload });
});

module.exports = router;

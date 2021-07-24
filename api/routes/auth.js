const router = require("express").Router();
const User = require("../models/User"); //importing user from models for register and login work.
const bcrypt = require("bcrypt");
// GET---> to fetch existing data
// PUT---> to update existing data
// DEL---> to delete existing data
// POST---> to create new data

//REGISTER:

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hp = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hp,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
// LOGIN:

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username, // the req.body.username is linked with the key used in login.js to take the username from the input field.
    });
    !user && res.status(400).json("wrong credentials!");
    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("wrong credentials");
    const { password, ...rest } = user._doc; // important stuffff
    res.status(200).json(rest);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

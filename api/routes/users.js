const router = require("express").Router();
const User = require("../models/User"); //importing user from models for register and login work.
const bcrypt = require("bcrypt");
const Post = require("../models/Post");
// GET---> to fetch existing data

// PUT---> to update existing data
// DEL---> to delete existing data
// POST---> to create new data

//UPDATE:

router.put("/:id", async (req, res) => {
  if (req.body.userid === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updUser);
    } catch (err) {
      res.status(500).json(err);
      console.log("ni hori be");
    }
  } else {
    res.status(401).json("You can update only your account!");
  }
});

//DELETE:

router.delete("/:id", async (req, res) => {
  if (req.body.userid === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("user not found !");
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
});

//GET USER:

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

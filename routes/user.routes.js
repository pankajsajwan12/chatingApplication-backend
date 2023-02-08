const { Router } = require("express");
const { UserModel } = require("../model/User.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRoutes = Router();
require("dotenv").config();

//Account Creation
userRoutes.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const isUserRegistered = await UserModel.findOne({ email });

  if (isUserRegistered) {
    return res.status(400).send({ "msg": "User alreday registered" });
  }

  bcrypt.hash(password, 4, async(err,hash) => {
    if (err) {
      return res.status(500).send({ "msg": "Internal server error" });
    }
    const newUser = new UserModel({
      name,
      email,
      password: hash,
    });

    try {
      await newUser.save();
      res.send({ msg: "User registered successfully" });
    } catch (err) {
      return res.status(500).send({ msg: "Internal server error" });
    }
  });
});

userRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  const hashPassword = user.password;

  bcrypt.compare(password, hashPassword, async (err, result) => {
    if (err) {
      return res.status(500).send({ msg: "Internal Server Error" });
    }
    if (result) {
      const token = jwt.sign({ userId: user._id }, process.env.secret_key);
      return res
        .status(200)
        .send({ msg: "Login successful", token: token, userId: user._id });
    } else {
      return res.status(400).send({ msg: "Invalid Credentials" });
    }
  });
});

module.exports = {
  userRoutes,
};

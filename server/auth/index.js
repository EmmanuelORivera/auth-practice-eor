const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");

const db = require("../db/connection");
const users = db.get("users");
users.createIndex("username", { unique: true });

const schema = Joi.object({
  username: Joi.string().pattern(new RegExp("^[a-zA-Z0-9_]{2,30}$")).required(),

  password: Joi.string().trim().min(6).required(),
});

router.get("/", (req, res) => {
  res.json({ message: "GET auth" });
});

router.post("/signup", async (req, res, next) => {
  try {
    const user = await schema.validateAsync(req.body);
    const userExist = await users.findOne({ username: user.username });

    if (userExist) {
      const error = new Error("The user already exists");
      next(error);
    } else {
      //Hash password
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      const insertedUser = await users.insert({
        username: req.body.username,
        password: hashPassword,
      });
      delete insertedUser.password;
      res.json(insertedUser);
    }
  } catch (error) {
    console.log(error);
    res.status(400);
    next(error);
  }
});

module.exports = router;

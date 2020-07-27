const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/connection');
const users = db.get('users');
users.createIndex('username', { unique: true });

const schema = Joi.object({
  username: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9_]{2,30}$'))
    .message('Invalid username')
    .required(),

  password: Joi.string().trim().min(6).required(),
});

router.get('/', (req, res) => {
  res.json({ message: 'GET auth' });
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await schema.validateAsync(req.body);
    const userExist = await users.findOne({ username: user.username });

    if (userExist) {
      const error = new Error('The user already exists');
      res.status(409);
      next(error);
    } else {
      //Hash password
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(req.body.password.trim(), salt);

      const insertedUser = await users.insert({
        username: req.body.username,
        password: hashPassword,
      });
      delete insertedUser.password;
      res.json(insertedUser);
    }
  } catch (error) {
    res.status(422);
    next(error);
  }
});

const respondError422 = (res, next) => {
  res.status(422);
  const error = new Error('Unable to login');
  next(error);
};

router.post('/login', async (req, res, next) => {
  try {
    const user = await schema.validateAsync(req.body);

    const userDb = await users.findOne({
      username: req.body.username,
    });

    if (userDb) {
      //found user in the db
      //compare the password
      const result = await bcrypt.compare(req.body.password, userDb.password);
      console.log(result);
      if (!result) {
        respondError422(res, next);
      } else {
        const payload = {
          _id: userDb._id,
          username: userDb.username,
        };
        jwt.sign(
          payload,
          process.env.TOKEN_SECRET,
          { expiresIn: '1h' },
          (err, token) => {
            if (err) {
              respondError422(res, next);
            } else {
              res.json({ token });
            }
          }
        );
      }
    } else {
      respondError422(res, next);
    }
  } catch (err) {
    res.status(422);
    next(err);
  }
});
module.exports = router;

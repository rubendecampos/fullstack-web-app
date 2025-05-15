const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const { Op } = require('sequelize');
const bcrypt = require("bcrypt");

const { sign } = require('jsonwebtoken');


// create a new User
router.post('/', async (req, res) => {
    const { username, password, email } = req.body;
    bcrypt.hash(password, 10).then((hash) => {    // encrypt the password
      Users.create({
        username: username,
        password: hash,
        email: email,
      });
      res.json("New user created");
    });
});

router.post('/login', async (req, res) => {
  const { identifier, password } = req.body;

  const user = await Users.findOne({ where: { [Op.or]: [{ username: identifier }, { email: identifier }] }});

  if (!user) {
    res.json({ error: "User not found !" });
  }

  // compare the hashed password entered with the registered password (already hashed)
  bcrypt.compare(password, user.password).then((match) => {
    if (!match) {
      res.json({ error: "Incorrect Password !" });
    } else {
      const accessToken = sign({
        username: user.username, id: user.id},
        "IMPORT_SECRET_CHANGE_LATER"
      );

      res.json({ token: accessToken });
    }
  });
});

module.exports = router;
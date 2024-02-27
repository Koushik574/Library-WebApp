const express = require('express');
const router = express.Router();
const { createUser, findUser } = require('../models/User');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await findUser(username);
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const newUser = await createUser(username, password);
    req.session.userId = newUser.user_id;
    res.status(201).json({ user: newUser.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await findUser(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    req.session.userId = user.user_id;
    res.status(200).json({ user: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
});

module.exports = router;

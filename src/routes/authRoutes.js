 
const express = require('express');
const {   generateToken } = require('../auth');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("email=" + email + "&password=" + password);

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/signin', async (req, res) => { 
  console.log(req.headers);
  try {
    const { email, password } = req.body;

    console.log("email=" + email + "&password=" + password); 

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create and sign a JWT
    const token = generateToken(user);


    console.log(token);
    res.json({ token,user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

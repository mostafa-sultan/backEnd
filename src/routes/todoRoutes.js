// routes/todoRoutes.js
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();

router.post('/todos', async (req, res) => {
  console.log(req.headers);

  try {
    const { text, userId } = req.body;
    console.log("text=" + text + "&userId=" + userId);

    const newTodo = await prisma.todo.create({
      data: {
        text,
        userId,
      },
    });

    res.json(newTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/todos', async (req, res) => {
  console.log(req.headers);

  try {
    const todos = await prisma.todo.findMany();
    console.log(todos);
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    console.log("id" + id + "text" + text);
    const updatedTodo = await prisma.todo.update({
      where: { id: parseInt(id) },
      data: { text },
    });

    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id" + id);
    await prisma.todo.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;

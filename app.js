const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/authRoutes');
const todoRoutes = require('./src/routes/todoRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(authRoutes);
app.use(todoRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

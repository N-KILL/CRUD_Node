const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

// middlewares

app.use(express.json());

// Routes

app.use(require('./routes/routes.js'));

// app corriendo

app.listen(3000);
console.log('Server on port', 3000);
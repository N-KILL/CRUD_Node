const express = require('express');
const env = require('./util/config')

const app = express();

// middlewares

app.use(express.json());

// Routes

app.use(require('./env_Test/routes/routes.js'));

// app corriendo

app.listen(env.PORT);
console.log('Server corriendo en el puerto', env.PORT);
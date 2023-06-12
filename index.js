const express = require('express');
const env = require('./util/config')

const app = express();

// middlewares

app.use(express.json());

// Routes

app.use(require(`./${process.env.FILE_LOCATION}/routes/routes.js`))

// app corriendo

app.listen(env.PORT);
console.log('Server corriendo en el puerto', env.PORT);
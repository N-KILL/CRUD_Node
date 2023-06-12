/// Dependencias: Express - PG - Jsonwebtoken

const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

// middlewares

app.use(express.json());

app.use(express.urlencoded({extended: false})); 
// no recibe datos como fotos, solo texto o .json (probar borrar)

// Routes

app.use(require('./routes/routes.js'));

// paths

const path = require('path');

// app corriendo

app.listen(3000);
console.log('Server on port', 3000);
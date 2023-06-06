const { Router } = require('express');
const router = Router();
const path = require('path');
const {     
    getUsers,
    getUserById,
    getContactsByUserId,
    createUser,
    updateUser,
    deleteUser,
    createContact,
    updateContact,
    deleteContact,
    login,
} = require('../controllers/controllers.js');

// index

router.get('/', function(req,res){
    res.sendFile(path.join(__dirname+'/templates/index.html'));
    });

// Login

router.post("/login", login);

// USUARIOS

// Leer todos los usuarios

router.get('/users', getUsers);

// Leer usuarios por Id

router.get('/users/:id', getUserById);

// Crear un usuario

router.post('/users', createUser);

// Modificar un usuario

router.put('/users/:id', updateUser);

// Borrar Usuario

router.delete('/users/:id', deleteUser);

// CONTACTOS

// Leer contactos por Id de usuario

router.get('/users/contacts/:id', getContactsByUserId);

// Crear un contacto

router.post('/users/contacts/:id/', createContact);

// Modificar un contacto

router.put('/users/contacts/:id/:idcontact', updateContact);

// Borrar contacto

router.delete('/users/contacts/:id/:idcontact', deleteContact);

// EXTRAS

// 404 Routes

router.get("*",(req,res) => {res.send("404 - Page not found")});

// Export
module.exports = router;
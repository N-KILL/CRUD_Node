const { Router } = require('express');
const router = Router();

const {     
    getUsers,
    getUserById,
    getContactsByUserId,
    getContactsByUserIdAndFav,
    createUser,
    updateUser,
    deleteUser,
    createContact,
    updateContact,
    deleteContact,
    login,
    verifyToken,
} = require('../controllers/controllers.js');

// index

router.get('/', function(req,res){
    res.redirect("/login");
    });

// Login

router.post("/login", login);


// #region Usuarios

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

// #endregion

// #region Contactos

// Leer contactos por Id de usuario

router.get('/users/contacts/:id', verifyToken ,getContactsByUserId);

// Leer contactos por ID y Favoritos

router.get('/users/contacts/:id/fav', verifyToken ,getContactsByUserIdAndFav);

// Crear un contacto

router.post('/users/contacts/:id/', verifyToken, createContact);

// Modificar un contacto

router.put('/users/contacts/:id/:idcontact', verifyToken, updateContact);

// Borrar contacto

router.delete('/users/contacts/:id/:idcontact',verifyToken, deleteContact);
//#endregion

// EXTRAS
// 404 Routes

router.get("*",(req,res) => {res.send("404 - Page not found")});

// Export

module.exports = router;
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const { response } = require('express');

//conexion con la base de datos

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'admin',
    database: 'crud',
    port: '5432'
});


// Verificar Token JWT

function verifyToken(req,res,next){
    const bearerHeader =  req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        baererToken = bearerHeader.split(" ")[1];
        req.token = baererToken
        next()
    }else{
        res.sendStatus(403);
    }
}

// Login 

const login = async (req, res) => {
    const {nombre, email} = req.body
    const user = await pool.query("SELECT * FROM users WHERE nombre = $1 AND email = $2", [nombre, email])
    if(user.rows.length !=0){
        if(user.rows != 'undefined'){
            const token = jwt.sign({
                user: user.rows
            }, "secretKey", {expiresIn: '50000s'})
            res.send({
                token,
                user: user.rows
            })
        }
    }
}


//Consultar todos los usuarios

const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM users ORDER BY id ASC');
    res.status(200).json(response.rows);
};


//Consultar un usuario por id

const getUserById = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    res.json(response.rows);
};

//Crear un usuario

const createUser = async (req, res) => {
    const { nombre , email } = req.body;
    const response = await pool.query('INSERT INTO users (nombre, email) VALUES ($1, $2)', [nombre, email]);
    res.json({
        message: 'User Added successfully',
        body: {
            user: {nombre, email}
        }
    })
};


//Editar un usuario 

const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, email } = req.body;

    const response =await pool.query('UPDATE users SET nombre = $1, email = $2 WHERE id = $3', [
        nombre,
        email,
        id
    ]);
    res.json('User Updated Successfully');
};


//Eliminar un usuario

const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    var read = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    await pool.query('DELETE FROM users where id = $1', [
        id
    ]);
    res.json({
        mensaje: "Usuario eliminado correctamente",
        usuario_eliminado: read.rows
    });
};

//Consultar los contactos por el id del usuario


const getContactsByUserId =  async (req, res) => {
    const id = req.params.id
    const response = await pool.query('SELECT * FROM contacts WHERE userid = $1', [id]);
    jwt.verify(req.token, 'secretKey',(error, authData) => {
        if (error){
            res.sendStatus(403);
        }else{
            res.json({
                mensaje: "Contactos: ",
                response : response.rows,
            })
            }
        })
};

// Crear un contacto

const createContact = async (req, res) => {
    const userId = parseInt(req.params.id);
    const { nombre , telefono, email} = req.body;
    const response = await pool.query('INSERT INTO contacts (nombre, telefono, email, userid) VALUES ($1, $2, $3, $4)', [nombre, telefono ,email, userId]);
    jwt.verify(req.token, 'secretKey',(error, authData) => {
        if (error){
            res.sendStatus(403);
        }else{
            res.json({
                message: 'Se añadio el contacto',
                body: {
                    user: response.rows
                }});
            };
        });
};

// Editar un contacto

const updateContact = async (req, res) => {
    const id = parseInt(req.params.idcontact);
    const { nombre, telefono ,email } = req.body;
    response =await pool.query('UPDATE contacts SET nombre = $1, telefono = $2 ,email = $3 WHERE id = $4', [
        nombre,
        telefono,
        email,
        id
    ]);
    jwt.verify(req.token, 'secretKey',(error, authData) => {
        if (error){
            res.sendStatus(403);
        }else{
            res.json({
                mensaje: 'Contacto actualizado!',
                nombre,telefono,email
                
            })};
        });
};



//Eliminar un contacto

const deleteContact = async (req, res) => {
    const id = parseInt(req.params.idcontact);
    var read = await pool.query('SELECT * FROM contacts WHERE id = $1', [id]);
    await pool.query('DELETE FROM contacts where id = $1', [id]);
    jwt.verify(req.token, 'secretKey',(error, authData) => {
        if (error){
            res.sendStatus(403);
        }else{
            res.json({
                mensaje: "Se elimino correctamente el contacto:",
                contacto_eliminado: read.rows
            });
            };
        });
};


//Exportar los controladores

module.exports = {
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
    verifyToken,
};
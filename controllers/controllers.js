const jwt = require('jsonwebtoken');
const {
    usuarios,
    contactos,
} = require("../models/models.js")

// Verificar Token JWT

function verifyToken(req,res,next){
    const bearerHeader =  req.headers['authorization'];
    try {
        if(typeof bearerHeader !== 'undefined'){
            baererToken = bearerHeader.split(" ")[1];
            req.token = baererToken
            jwt.verify(req.token, 'secretKey',(error, authData) => {
                if (error){
                    res.sendStatus(403);
                }})
            next()
        }
        
    } catch (error) {
        res.sendStatus(403);
    }
}

// Login 

const login = async (req, res) => {
    const {nombre, email} = req.body
    const user = await usuarios.findOne({where:{nombre: nombre, email: email}})
    if(user.dataValues !=0){
        if(user.dataValues != 'undefined'){
            var token = jwt.sign({
            "nombre":user.dataValues["nombre"],
            "email":user.dataValues["email"],
            }, "secretKey", {expiresIn: '50000s'})
            res.send({
                token,
                user: user
            });
        }};
};


//Consultar todos los usuarios

const getUsers = async (req, res) => {
    try {
        const response = await usuarios.findAll()
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};


//Consultar un usuario por id

const getUserById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await usuarios.findByPk(id);
        res.json(response);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

//Crear un usuario

const createUser = async (req, res) => {

    try {
        const { nombre , email } = req.body;
        const response = await usuarios.create({
            nombre: nombre,
            email:email
        })
        res.json({
            message: 'User Added successfully',
            body: {
                user: response
            }
        })
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
    
};


//Editar un usuario 

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, email } = req.body;
        const response = await usuarios.findByPk(id)
        response.nombre = nombre
        response.email = email
        await response.save()
        res.json({
            message: 'User Updated Successfully',
            body:{
                response
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
    
    
    
};


//Eliminar un usuario

const deleteUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await usuarios.destroy({
            where: {
                id: id,
            }
        })
        res.json({
            mensaje: "Usuario eliminado correctamente",
        }); 
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
    
};

//Consultar los contactos por el id del usuario


const getContactsByUserId =  async (req, res) => {
    const id = req.params.id
    const response = await contactos.findOne({where:{userid:id}});
    res.json({
        mensaje: "Contactos: ",
        response : response,
    })
};

// Crear un contacto

const createContact = async (req, res) => {
        const userId = parseInt(req.params.id);
        const { nombre , telefono, email} = req.body;
        const response = await contactos.create({
            nombre: nombre,
            telefono: telefono,
            email:email,
            userid: userId
        });
        res.json({
            message: 'Se añadio el contacto',
            body: {
                contacto: response
            }});
};



// Editar un contacto

const updateContact = async (req, res) => {
    try {
        const id = parseInt(req.params.idcontact);
        const { nombre, telefono,email } = req.body;
        console.log(nombre, telefono,email)
        const response = await contactos.findByPk(id)
        console.log(response)
        response.nombre = nombre
        response.telefono = telefono
        response.email = email
        await response.save()
        res.json({
            message: 'User Updated Successfully',
            body:{
                response
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};



//Eliminar un contacto

const deleteContact = async (req, res) => {
    const id = parseInt(req.params.idcontact);
    await contactos.destroy({where:{id:id}})
    console.log("Se culiaron a carlitos")
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
const jwt = require('jsonwebtoken');
const {
    usuarios,
    contactos,
} = require("../models/models.js")

// Verificar Token JWT

function verifyToken(req,res,next){
    const bearerHeader =  req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        baererToken = bearerHeader.split(" ")[1];
        req.token = baererToken
        jwt.verify(req.token, 'secretKey',(error, authData) => {
            if (error){
                res.sendStatus(403);
                exit()
            }})
        next()
    }
}

// Login 

const login = async (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
    
};


//Consultar todos los usuarios

const getUsers = async (req, res) => {
    try {
        const response = await usuarios.findAll()
        if (response.length !== 0){
            res.status(200).json(response);
        }else{
            res.json({
                mensaje: "No se encontraron usuarios"
            })
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};


//Consultar un usuario por id

const getUserById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await usuarios.findByPk(id);
        if (response.length !== 0){
            res.status(200).json(response);
        }else{
            res.json({
                mensaje: "No se encontraron usuarios"
            })
        }
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
        if (response.length !== 0){
            response.nombre = nombre
            response.email = email
            await response.save()
            res.json({
                message: 'User Updated Successfully',
                body:{
                    response
                }
            });
        }else{
            res.json({
                mensaje: "No se encontraron usuarios"
            })
        }
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
    
    
    
};


//Eliminar un usuario

const deleteUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const verify = await usuarios.findByPk(id)
        if (verify.length !== 0){
            await usuarios.destroy({
                where: {
                    id: id,
                }
            })
            res.json({
                mensaje: "Usuario eliminado correctamente",
            }); 
        }else{
            res.json({
                mensaje: "No se encontro el usuario"
            })
        }
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
    
};

//Consultar los contactos por el id del usuario


const getContactsByUserId =  async (req, res) => {
    try {
        const id = req.params.id
        const response = await contactos.findAll({where:{userid:id}});
        const verify = await usuarios.findByPk(id)
        if (verify.length !== 0){
            res.json({
                mensaje: "Contactos: ",
                response : response,
            })
        }else{ 
            res.json({
                mensaje: "El usuario ingresado no existe"
            })
        }
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
    
};

// Crear un contacto

const createContact = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const verify = await usuarios.findByPk(userId); 
        if (verify.length !== 0){
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
        }else{ 
            res.json({
                mensaje: "El usuario ingresado no existe"
            })
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
        
};



// Editar un contacto

const updateContact = async (req, res) => {
    try {
        const id = parseInt(req.params.idcontact);
        const { nombre, telefono,email,userid} = req.body;
        const response = await contactos.findByPk(id)
        if (response.length !== 0){
            response.nombre = nombre
            response.telefono = telefono
            response.email = email
            response.userid = userid
            await response.save()
            res.json({
                message: 'User Updated Successfully',
                body:{
                    response
                }
            });
        }else{ 
            res.json({
                mensaje: "El contacto ingresado no existe"
            })
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};



//Eliminar un contacto

const deleteContact = async (req, res) => {
    try {
        const id = parseInt(req.params.idcontact);
        const response = await contactos.findOne({where:{id:id}});
        if (response.length !== 0){
            await contactos.destroy({where:{id:id}})
            res.json({
                message: 'Se elimino correctamente al contacto',
                body:{
                    response
                }
            });
        }else{ 
            res.json({
                mensaje: "El contacto ingresado no existe"
            })
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message});
    }

    
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
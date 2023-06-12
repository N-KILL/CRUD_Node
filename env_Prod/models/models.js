const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database.js')

//Modelo de usuarios

const usuarios = sequelize.define('usuarios',{
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre : {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false  
    },
    
},{
    timestamps:false,
    tableName:"users"
})


//Modelo de contactos

const contactos = sequelize.define('contacts',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono : {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false  
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false  
    },
    favorito: {
        type: DataTypes.BOOLEAN,
        allowNull: false  
    },
   
},{
    timestamps:false,
    tableName:"contacts"
})


//#region Relacion de las tablas

usuarios.hasMany(contactos,{
    foreignKey: 'userid',
    sourceKey: 'id'
})

contactos.belongsTo(usuarios, {
    foreignKey: "userid",
    targetId: "id"
})
//#endregion

module.exports = {
    usuarios,
    contactos,
}

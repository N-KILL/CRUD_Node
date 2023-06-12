/// Production DATABASE

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('production-db', 'postgres', 'admin', {
    host: 'localhost',
    dialect: 'postgres'
  });


const bdd = async (req, res) => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

module.exports = {
    bdd,
    sequelize,
}
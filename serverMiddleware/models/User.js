
const Sequelize  = require('sequelize');
const sequelize = require('../utils/database');


const User = sequelize.define('User', {
     // Model attributes are defined here
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isAdmin: {
    type: Sequelize.INTEGER,
  }
});





module.exports = User;
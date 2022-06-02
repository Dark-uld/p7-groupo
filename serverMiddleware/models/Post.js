const Sequelize  = require('sequelize');
const sequelize = require('../utils/database');
const User = require ('../models/User');

const Post = sequelize.define('Post', {
     // Model attributes are defined here
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    userid: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    url: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    
    urlTitle: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    
    urlDesc: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    
    urlImage: {
        type: Sequelize.TEXT,
        allowNull: true
    },

  
});

User.hasMany(Post)
Post.belongsTo(User)

module.exports = Post;
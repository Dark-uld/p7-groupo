const Sequelize  = require('sequelize');
const sequelize = require('../utils/database');
const User = require ('../models/User');
const Post = require ('../models/Post');

const Like = sequelize.define('Like', {
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
    postid: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
  
});

User.hasMany(Like)
Post.hasMany(Like)
Like.belongsTo(User)
Like.belongsTo(Post)


module.exports = Like;
const Sequelize  = require('sequelize');
const sequelize = require('../utils/database');
const User = require ('../models/User');
const Post = require ('../models/Post');

const Comment = sequelize.define('Comment', {
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
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    image: {
        type: Sequelize.TEXT,
    },
    image_desc: {
        type: Sequelize.TEXT,
    }
  
});

User.hasMany(Comment)
Post.hasMany(Comment)
Comment.belongsTo(User)
Comment.belongsTo(User)


module.exports = Comment;
const Comment = require ('../models/Comment');
const Post = require ('../models/Post');
const User = require ('../models/User');

exports.getAllComment = (req, res, next ) => {
    Comment.findAll({ 
      include: [{
        model: User,
        required: true,
        attributes:['name']
       },],
       order: [ [ 'createdAt', 'DESC' ]]
    })
    .then(
      (posts) => {
        res.status(200).json(posts);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
};
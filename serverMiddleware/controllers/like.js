const Like = require ('../models/Like');
const Post = require ('../models/Post');
const User = require ('../models/User');

exports.getAllLike = (req, res, next ) => {
  

    Like.findAll({
      attributes: ['userid', 'postid']
    })
    .then(
      (like) => {
        res.status(200).json(like);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          message:'Erreur lors de la récupération des likes'
        });
      }
    );
};

exports.likePost = (req, res, next) => {
  
  Like.findAll({where: {
    postid: req.body.postid,
    userid: req.body.userid
  }}).then(
    (like) => {
      if(like.length==0){
        const newLike = Like.create({
          postid: req.body.postid,
          userid: req.body.userid
        })
      
        return newLike
        .then((like) => res.status(201).json({ message: 'Post liké!' }))
        .catch(error => res.status(400).json({  message: 'Problème rencontré lors du like de post' }));
      } else {
        res.status(409).json({ message : 'Post déjà liké!'})
      }
    }
  )
};

exports.dislikePost = (req, res, next) => {
  Like.findAll({where: {
      postid: req.params.id,
      userid: req.auth.userId
  }})
  .then(
      (like) => {
        if (!like[0]) {
          res.status(404).json({ error: new Error('Post non liké!')})
        } else {
          Like.destroy({
              where: {
                postid: req.params.id,
                userid: req.auth.userId
              }
          }).then( // supression du like 
            () => {
              res.status(200).json({
                message: 'Disliked!'
              });
            }
          ).catch(
            error => 
              res.status(400).json({
                message: 'Problème lors de la suppression!'
              })
          );
        }
        
      }
  )
  .catch(error => res.status(400).json({ error: error.message }));
}



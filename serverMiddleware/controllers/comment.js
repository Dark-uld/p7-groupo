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
       ,
       where: {
        postid: req.body.postid
      }
    })
    .then(
      (comments) => {
        res.status(200).json(comments);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
};

exports.createComment = (req, res, next) => {
  const comment = Comment.create({
      content: req.body.content,
      userid: req.body.userid,
      postid: req.body.postid
    })
    return comment
    .then(() => res.status(201).json({ message: 'Comment créé !'}))
    .catch(error => res.status(400).json({  message: 'Problème rencontré lors de la création du post' }));
};

exports.modifyComment = (req, res, next) => {
  Comment.update({
      content: req.body.content
      },
      { where: {id: req.params.id} }) // modification de la sauce
    .then(() => res.status(200).json({ message: 'Commentaire modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteComment = (req, res, next) => {
  Comment.findAll({where: {
      id: req.params.id
  }})
  .then(
      (post) => {
        // Si pas une sauce existance
        console.log("au"+req.auth.userId+"id"+post[0].userid);

        if (!post) {
          res.status(404).json({
            error: new Error('No such Comment!')
          });
        } else if (post[0].userid !== req.auth.userId) { // si id créateur sauce n'est pas id utilisateur
          res.status(400).json({
            error: new Error('Unauthorized request!')
          });
        } else {
          Comment.destroy({
              where: {
                  id: req.params.id
              }
          }).then( // supression de la sauce 
            () => {
              res.status(200).json({
                message: 'Deleted!'
              });
            }
          ).catch(
            (error) => {
              res.status(400).json({
                error: new Error('Problème lors de la suppression!')
              });
            }
          );
        }
        
      }
    )
  .catch(error => res.status(400).json({ error: new Error('Problème lors de la suppression!') }));
}
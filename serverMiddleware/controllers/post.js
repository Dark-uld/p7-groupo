const Post = require ('../models/Post');
const User = require ('../models/User');
const Comment = require ('../models/Comment');

exports.createPost = (req, res, next) => {
  const post = Post.create({
      title: req.body.title,
      content: req.body.content,
      userid: req.body.userid,
      url: req.urlData.url,
      urlDesc: req.urlData.desc,
      urlTitle: req.urlData.title,
      urlImage: req.urlData.images,
    })
    return post
    .then((post) => res.status(201).json({ message: 'Post créé !', id: post._id }))
    .catch(error => res.status(400).json({  message: 'Problème rencontré lors de la création du post' }));
};

exports.getAllPost = (req, res, next ) => {
  Post.findAll({ 
    include: [{
      model: User,
      required: true,
      attributes:['name']
     },
     {
      model: Comment,
      required: false,
      attributes:['id'],
     },
    ],
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

exports.getOnePost = (req, res, next) => {
    Post.findOne({where: {
        id: req.params.id
    },
    include: [{
        model: User,
        required: true,
        attributes:['name']
      },
      {
        model: Comment,
        required: false,
        attributes:['id','userid','content','createdAt','updatedAt'],
        order: [ [ 'id', 'DESC' ]],
        include: [{
          model: User,
          required: true,
          attributes:['name']
        }],
        
      },
     ]
  }).then( 
      (post) => {
        res.status(200).json(post);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
};

exports.modifyPost = (req, res, next) => {
    Post.update({
        title: req.body.title,
        content: req.body.content,
        url: req.urlData.url,
        urlDesc: req.urlData.desc,
        urlTitle: req.urlData.title,
        urlImage: req.urlData.images,
        },
        { where: {id: req.params.id} }) // modification de la sauce
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.deletePost = (req, res, next) => {
    Post.findAll({where: {
        id: req.params.id
    }})
    .then(
        (post) => {
          // Si pas une sauce existance
          if (!post[0]) {
            res.status(404).json({
              error: new Error('No such Post!')
            });
          } else if (post[0].userid !== req.auth.userId && !req.utilisateur.isAdmin) { // si id créateur sauce n'est pas id utilisateur
            res.status(400).json({
              error: new Error('Unauthorized request!')
            });
          } else {
            Post.destroy({
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
    .catch(error => res.status(400).json({ error: error.message}));
}

exports.modifyLike = (req, res, next) => {
  // récupérer l'id dans l'url de la requete
  Post.findAll({where: {
    id: req.params.id
  }}).then(
    (post) => {
      console.log(post)
      const userLiked = post.userLiked.split(' ');
      console.log(userLiked)
      let userAlreadyLiked = false;
      console.log("userlike" + userLiked)
        for (let i =0; i<userLiked.length;++i){
          if(userLiked[i]==req.body.userId) {
             userAlreadyLiked=true;
          }
       }
      
      
      // Ajout d'un like 
        // verification non présence de l'user dans la liste des like et si requete est un like
        if (!userAlreadyLiked && req.body.like === 1){
          console.log("update notlike")
          Post.update(
              { where: {id: req.params.id} }, 
                {
                    likes: sequelize.literal('like + 1'), 
                    userLiked: req.body.userid
                }
            )
            .then(() => res.status(200).json({ message: 'Like modifié !'}))
            .catch(error => res.status(400).json({ error })); 
        } 
        // Retirer un like
        // verification  présence de l'user dans la liste des like et si requete est un déjà like
        if (userAlreadyLiked && req.body.like === 0){
          Post.update(
              { where: {id: req.params.id} }, 
                {
                  likes: sequelize.literal('like - 1'),  
                  usersLiked: ""
                }
            )
            .then(() => res.status(200).json({ message: 'Like modifié !'}))
            .catch(error => res.status(400).json({ error })); 
        }
      }

  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );

}

exports.getAdminPost = (req, res, next ) => {
  Post.findAll({ 
    include: [{
      model: User,
      required: true,
      attributes:['name']
     },
     {
      model: Comment,
      required: false,
      attributes:['id','userid','content','createdAt','updatedAt'],
      include: [{
        model: User,
        required: true,
        attributes:['name']
       }]
     },
    ],
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
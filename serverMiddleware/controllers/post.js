const Post = require ('../models/Post');
const User = require ('../models/User');

exports.createPost = (req, res, next) => {
  const post = Post.create({
      title: req.body.title,
      content: req.body.content,
      userid: req.body.userid
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
       }],
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
    Post.findAll({where: {
        id: req.params.id
    },
    include: [{
      model: User,
      required: true,
      attributes:['name']
     }]
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
    // test si il y a une nouvelle image
    /*const sauceObject = req.file ?
      {
        // si fichier existe, on recup la nouvelle image
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        
      } : { ...req.body }; // sinon on reprend body*/
    Post.update({
        title: req.body.title,
        content: req.body.content
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
          console.log("au"+req.auth.userId+"id"+post[0].userid);

          if (!post) {
            res.status(404).json({
              error: new Error('No such Post!')
            });
          } else if (post[0].userid !== req.auth.userId) { // si id créateur sauce n'est pas id utilisateur
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
    .catch(error => res.status(400).json({ error: new Error('Problème lors de la suppression!') }));
}

exports.modifyLike = (req, res, next) => {
  // récupérer l'id dans l'url de la requete
  Post.findAll({where: {
    id: req.params.id
  }}).then(
    (post) => {
      console.log(post.userLiked)
      const userLiked = post.userLiked.split(' ');
      let userAlreadyLiked = false;
      console.log("userlike" + userLiked)
      if (userLiked.length <= 0) {
        userAlreadyLiked = false;
      } else {
        for (let i =0; i<userLiked.length;++i){
          if(userLiked[i]==req.body.userId) {
             userAlreadyLiked=true;
          }
          console.log(userLiked[i])
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
                    userLiked: req.body.userId
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
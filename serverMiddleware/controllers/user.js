const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require ('../models/User');
const sequelize = require('../utils/database');


// ENREGISTREMENT DE NOVUEAU UTILISATEUR

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            
            User.create({
            userid: req.body.userid,
            email: req.body.email,
            password: hash,
            name: req.body.name,
            age: req.body.age
            })
            .then(result => res.status(201).json({ message: 'utilisateur créé', _id: result.id}))
            .catch(error => res.status(400).json({ error }));
            
        }
        )
        .catch(error => res.status(400).json({ error : "meme pas hash" }));
        
};

exports.login = (req, res, next) => {
    // chercher un utilisateur dont l'addresse mail correspond dans la requete
  User.findOne({where:{ email: req.body.email }})
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }

      // comparé mdp dans req body avec user dans base de donnée
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          // on renvoie un objet json qui contient un user id et un token pour la connection
          res.status(200).json({
            userId: user.id,
            token: jwt.sign(
                { id: user.id },
                 process.env.secretToken,
                { expiresIn: '5h' }
              )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.user = function(req, res) {
  var token = req.headers.authorization
  /*if (token) {
    // verifies secret and checks if the token is expired
    jwt.verify(token.replace(/^Bearer\s/, ''),  process.env.secretToken, function(err, decoded) {
      if (err) {
        return res.status(401).json({message: 'unauthorized'})
      } else {
        return res.json({ user: decoded })
      }
    });
  }
  else{
    return res.status(401).json({message: 'unauthorized'})
  }*/
  User.findOne({
    where:{ id: req.auth.userId},
    attributes: ['isAdmin']
  })
  .then(
    (user) => {
      if (token) {
        // verifies secret and checks if the token is expired
        jwt.verify(token.replace(/^Bearer\s/, ''),  process.env.secretToken, function(err, decoded) {
          if (err) {
            return res.status(401).json({message: 'unauthorized'})
          } else {
            return res.json({ user: {decoded, isAdmin: user.isAdmin } })
          }
        });
      }
      else{
        return res.status(401).json({message: 'unauthorized'})
      }
    }
  ).catch(
    (error) => {
      res.status(400).json({
        message:"Erreur lors de la récupération de l'user"
      });
    }
  );
}

exports.getUser = function(req, res){
  User.findOne({
    where:{ id: req.params.id },
    attributes: ['id', 'name','email','isAdmin']
  })
  .then(
    (user) => {
      res.status(200).json(user);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        message:"Erreur lors de la récupération de l'user"
      });
    }
  );
}

exports.getAllUser = function(req, res){
  User.findAll({
    attributes: ['id', 'name','email','isAdmin','createdAt','updatedAt']
  })
  .then(
    (users) => {
      res.status(200).json(users);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        message:"Erreur lors de la récupération de la liste des users"
      });
    }
  );
}

exports.modifyUser = function(req, res){
  User.update({
    isAdmin: req.body.isAdmin
    },
    { where: {id: req.params.id} })
  .then(() => res.status(200).json({ message: 'Utilisateur Modifié !'}))
  .catch(error => res.status(400).json({ error }));
}

exports.deleteUser = (req, res, next) => {
  User.findAll({where: {
    id: req.params.id
  }})
  .then(
      (user) => {
        if (!user[0]) {
          res.status(404).json({
            error: new Error('No such User!')
          });
        } else if (user[0].id != req.auth.userId && !req.utilisateur.isAdmin) { // si id créateur correspond pas à l'id user qui requete ou pas un admin
          console.log('lol')
          res.status(400).json({
            error: new Error('Unauthorized request!')
          });
        } else {
          User.destroy({
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



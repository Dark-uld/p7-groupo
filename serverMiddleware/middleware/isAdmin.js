const User = require ('../models/User');
const sequelize = require('../utils/database');

module.exports = (req, res, next) => {
    try {
        User.findOne({
            where:{ id: req.auth.userId }
        }).then((user)=>{
            console.log(user)
            if (user.isAdmin){ 
                req.utilisateur = {
                    id : user.id,
                    isAdmin: user.isAdmin
                }
                return next();
            } else {
                throw 'User Not Admin';
            }
        })
    } catch (error){
        res.status(403).json({
          error
        });
      }
  };
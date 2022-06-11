const User = require ('../models/User');
const sequelize = require('../utils/database');

module.exports = (req, res, next) => {
    try {
        User.findOne({
            where:{ id: req.auth.userId }
        }).then((user)=>{
            if (user.isAdmin){ 
                req.utilisateur = {
                    id : user.id,
                    isAdmin: user.isAdmin
                }
                return next();
            } else {
                res.status(403).json({
                    error: 'Not an Admin!'
                  });
            }
            
        })
    } catch (error){
        res.status(403).json({
          error
        });
      }
  };
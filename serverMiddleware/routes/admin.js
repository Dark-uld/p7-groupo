const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const postCtrl = require ('../controllers/post');
// middleware pour proteger la route
const authent = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

// Route Récuperer liste de tout les users
router.get('/users', authent, isAdmin, userCtrl.getAllUser);
//router.delete('/user/:id', authent, isAdmin, userCtrl.getAllUser);
//
router.put('/user/:id', authent, isAdmin, userCtrl.modifyUser);
router.delete('/user/:id', authent, isAdmin, userCtrl.deleteUser);
router.delete('/post/:id', authent, isAdmin, postCtrl.deletePost);


module.exports = router;
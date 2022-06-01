const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const postCtrl = require ('../controllers/post');
const comCtrl = require ('../controllers/comment');

// middleware pour proteger la route
const authent = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

// Route Récuperer liste de tout les users
router.get('/users', authent, isAdmin, userCtrl.getAllUser);
// Route pour modifier un user
router.put('/user/:id', authent, isAdmin, userCtrl.modifyUser);
// Route pour supprimer un user
router.delete('/user/:id', authent, isAdmin, userCtrl.deleteUser);
// Route pour supprimer un post
router.delete('/posts/:id', authent, isAdmin, postCtrl.deletePost);
// Route pour supprimer un commentaire
router.delete('/comment/:id', authent, isAdmin, comCtrl.deleteComment);


module.exports = router;
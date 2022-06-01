// ROUTER 
const express = require('express');
// CREATION D UN ROUTER
const router = express.Router();

// middleware pour proteger la route
const authent = require('../middleware/auth');

// appel du model mongoose dans ce fichier
const postCtrl = require ('../controllers/post');
//const likeCtrl = require ('../controllers/like')

// Route Affichage de toutes les posts
router.get('/', authent, postCtrl.getAllPost);
// Route Creation d'un post
router.post('/', authent, postCtrl.createPost);
// Route Affichage d'un post
router.get('/:id', authent, postCtrl.getOnePost);
// Route Modification d'un post
router.put('/:id', authent, postCtrl.modifyPost);
// Route Supression d'un post
router.delete('/:id', authent, postCtrl.deletePost);
// Route Modification des likes d'un post
router.put('/:id/like', authent, postCtrl.modifyLike);
module.exports = router;
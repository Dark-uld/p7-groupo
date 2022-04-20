// ROUTER 
const express = require('express');
// CREATION D UN ROUTER
const router = express.Router();

// middleware pour proteger la route
const auth = require('../middleware/auth');
//middleware pour l'image
//const multer = require('../middleware/multer-config');
//middleware pour verifier input du formulaire
//const validateInput = require('../middleware/validateInput');


// appel du model mongoose dans ce fichier
const postCtrl = require ('../controllers/post');
//const likeCtrl = require ('../controllers/like')

// Route Affichage de toutes les posts
router.get('/', postCtrl.getAllPost);
// Route Creation d'un post
router.post('/',postCtrl.createPost);
// Route Affichage d'un post
router.get('/:id', postCtrl.getOnePost);
// Route Modification d'un post
router.put('/:id', postCtrl.modifyPost);
// Route Supression d'un post
router.delete('/:id', postCtrl.deletePost);
module.exports = router;
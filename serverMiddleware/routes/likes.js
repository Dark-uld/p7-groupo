// ROUTER 
const express = require('express');
// CREATION D UN ROUTER
const router = express.Router();

// middleware pour proteger la route
const authent = require('../middleware/auth');
//middleware pour l'image
//const multer = require('../middleware/multer-config');
//middleware pour verifier input du formulaire
//const validateInput = require('../middleware/validateInput');


// appel du model mongoose dans ce fichier
const LikeCtrl = require ('../controllers/Like');
//const likeCtrl = require ('../controllers/like')

// Route Affichage de toutes les Likes
router.get('/', LikeCtrl.getAllLike);
// Route pour liker un post
router.post('/', authent, LikeCtrl.likePost);
// Route pour retirer un like
router.delete('/:id', authent, LikeCtrl.dislikePost);
module.exports = router;
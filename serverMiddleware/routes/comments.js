// ROUTER 
const express = require('express');
// CREATION D UN ROUTER
const router = express.Router();

// middleware pour proteger la route
const authent = require('../middleware/auth');


const comCtrl = require ('../controllers/comment');

// Route Creation d'un post
router.post('/', authent, comCtrl.createComment);
// Route Modification d'un post
router.put('/:id', authent, comCtrl.modifyComment);
// Route Supression d'un post
router.delete('/:id', authent, comCtrl.deleteComment);

module.exports = router;
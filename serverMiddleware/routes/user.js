const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
// verification que le mail a un format valide
const emailValid = require('../middleware/emailValide');
// verification que le password a un format valide
const passValid = require('../middleware/passValide');

// Route création de compte
router.post('/signup',emailValid, passValid, userCtrl.signup);
// Route login 
router.post('/login',emailValid, passValid, userCtrl.login);
// Route user
router.get('/user', userCtrl.user);
//Route récup donnée de l'user
router.get('/user/:id', userCtrl.getUser)


module.exports = router;
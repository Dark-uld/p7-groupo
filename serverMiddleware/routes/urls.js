// ROUTER 
const express = require('express');
// CREATION D UN ROUTER
const router = express.Router();

const urlCtrl = require ('../controllers/url');


router.post('/', urlCtrl.getUrlPreview);

module.exports = router;
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require("helmet");

// iMPORTE ROUTES
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');
const likeRoutes = require('./routes/likes');
const adminRoutes = require('./routes/admin');

const limiter = rateLimit({
    windowMs: 10 * 1000, // 10 sec
    max: 30, // limite de création de requete à 30 toutes les 10 secondes
    message:
      'Too request created from this IP, please try again in a few seconds',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})


// INSTALLATION EXPRESS
const app = express();

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use((req, res, next) => {
 // SOLUTIONNER PROBLEME CROSS ORIGIN CORS
//d'accéder à notre API depuis n'importe quelle origine 
    res.setHeader('Access-Control-Allow-Origin', '*');
//d'ajouter les headers mentionnés aux requêtes envoyées vers notre API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
// d'envoyer des requêtes avec les méthodes mentionnées 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    // NEXT POUR PASSER AU PROCHAIN MIDDLEWARE
    next();
});

// ENREGISTRE ROUTER POUR TOUTE DEMANDE API 
app.use('/auth',limiter, userRoutes);
app.use("/posts",limiter, postRoutes);
app.use('/comments',limiter, commentRoutes);
app.use('/likes',limiter, likeRoutes);
app.use('/admin',limiter, adminRoutes);


module.exports = {
    path: '/api',
    handler: app
  }
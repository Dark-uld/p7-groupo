const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.secretToken);
    // verify transforme en donnée js basique
    const userId = decodedToken.id*1;
    // userId raccourci JS de userId: userId
    req.auth = {userId};
    console.log(req.auth);
    
    // VERIFICATION USER ID BODY correspond à user id
    if (req.body.userid && req.body.userid*1 !== userId) {
      throw 'Invalid user ID';
    } else {
      return next();
    }
  } catch {
    res.status(403).json({
      error: 'Invalid request!'
    });
  }
};
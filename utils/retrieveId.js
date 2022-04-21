const jwt = require('jsonwebtoken');

export default () => {
    const token = localStorage.getItem("auth._token.local").split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.secretToken)*1;
    return decodedToken;
}
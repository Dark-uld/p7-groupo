const nameRegex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
const mailRegex= /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

var passwordValidator = require('password-validator');

// Create a schema
var passwordSchema = new passwordValidator();

// Add properties to it
passwordSchema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
//.is().not().oneOf(listPassword); // Blacklist these values


exports.passValide = (req, res, next) => {
    if (passwordSchema.validate(req.body.password)){
        next();
    } else{
        return res
            .status(400)
            .json({error : "Le mot de passe n'est pas assez fort"})
    }
}


exports.mailValide = (req, res, next) => {
    const emailAValide = req.body.email;
    if (emailAValide.match(mailRegex)){
        next();
    } else{
        return res
            .status(400)
            .json({error : "L'email est incorrect"})
    }
}

exports.nomValide = (req, res, next) => {
    const nomAValide = req.body.name;
    if (nomAValide.match(nameRegex)){
        next();
    } else{
        return res
            .status(400)
            .json({error : "Le format du nom est incorrect"})
    }
}

exports.contentValide = (req, res, next) => {
    const nomAValide = req.body.name;
    if (nomAValide.match(nameRegex)){
        next();
    } else{
        return res
            .status(400)
            .json({error : "Le format du nom est incorrect"})
    }
}
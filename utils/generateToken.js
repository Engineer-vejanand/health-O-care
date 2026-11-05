const jwt = require('jsonwebtoken');//for generate tokens

const generateToken = (user) => {
    return jwt.sign({email:user.email, id:user._id } , process.env.JWT_KEY,{ expiresIn:"1h"});
};

module.exports.generateToken = generateToken;

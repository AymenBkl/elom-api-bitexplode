
const checkJWT = require('./checkjwt');

const securePassword = require('./securePassword');
module.exports = {
    checkJWT : (req,res,next) => {
        checkJWT.checkJWT(req,res,next)
    },

    securePassword : (req,res,next) => {
        securePassword.securePassword(req,res,next);
    },

}
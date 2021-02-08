
const checkJWT = require('./checkjwt');

const securePassword = require('./securePassword');

const login = require('./login');

module.exports = {
    checkJWT : (req,res,next) => {
        checkJWT.checkJWT(req,res,next)
    },

    securePassword : (req,res,next) => {
        securePassword.securePassword(req,res,next);
    },

    login : (req,res,next) => {
        login.login(req,res,next);
    },

}
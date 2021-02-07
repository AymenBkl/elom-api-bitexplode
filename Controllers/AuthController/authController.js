
const checkJWT = require('./checkjwt');

module.exports = {
    checkJWT : (req,res,next) => {
        checkJWT.checkJWT(res,res,next)
    },

}
var express = require('express');
var router = express.Router();
const authController = require('../Controllers/AuthController/authController');
const cors = require('../Middlewares/cors');
/* GET users listing. */
const jwt = require('../Middlewares/jwt/jwt');

router.all('/', function(req, res, next) {
    next();
})
.options('/',cors.corsWithOptions, function(req, res, next) {
    next();
})
.get('/checkJWT',cors.corsWithOptions,authController.checkJWT)

.post('/securepassword',cors.corsWithOptions,jwt.verifyHash,authController.securePassword)

.post('/login',cors.corsWithOptions,authController.login);


module.exports = router;

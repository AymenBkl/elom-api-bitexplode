var express = require('express');
var router = express.Router();
const authController = require('../Controllers/AuthController/authController');
const cors = require('../Middlewares/cors');
/* GET users listing. */

router.all('/', function(req, res, next) {
    next();
})
.options('/',cors.corsWithOptions, function(req, res, next) {
    next();
})
.get('/checkJWT',cors.corsWithOptions,authController.checkJWT)

module.exports = router;

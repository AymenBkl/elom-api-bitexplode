var express = require('express');
var router = express.Router();
const hashController = require('../Controllers/hashController/hash.controller');
const cors = require('../Middlewares/cors');
/* GET users listing. */
const jwt = require('../Middlewares/jwt/jwt');

router.all('/', function(req, res, next) {
    next();
})

.options('/',cors.corsWithOptions,jwt.verifyHash,jwt.verifyHashValid, function(req, res, next) {
    next();
})

.post('/createhash',cors.corsWithOptions,hashController.createHash)

.post('/createcomplaint',cors.corsWithOptions,hashController.makeComplaint)


.get('/checkhash',cors.corsWithOptions,hashController.checkHash)


module.exports = router;

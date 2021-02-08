var express = require('express');
var router = express.Router();
const hashController = require('../Controllers/hashController/hash.controller');
const cors = require('../Middlewares/cors');
/* GET users listing. */

router.all('/', function(req, res, next) {
    next();
})

.options('/',cors.corsWithOptions, function(req, res, next) {
    next();
})

.post('/createhash',cors.corsWithOptions,hashController.createHash)

.get('/checkhash',cors.corsWithOptions,hashController.checkHash)


module.exports = router;

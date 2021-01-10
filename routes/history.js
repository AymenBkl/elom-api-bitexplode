var express = require('express');
var router = express.Router();
const historyController = require('../Controllers/historyController/histroy.controller');
const cors = require('../Middlewares/cors');
/* GET users listing. */

router.all('/', function(req, res, next) {
    next();
})

.options('/',cors.corsWithOptions, function(req, res, next) {
    next();
})

.get('/getallhistory',cors.corsWithOptions,historyController.getHistory)


module.exports = router;

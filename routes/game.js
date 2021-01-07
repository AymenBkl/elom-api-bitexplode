var express = require('express');
var router = express.Router();
const gameController = require('../Controllers/gameController/game.controller');
const cors = require('../Middlewares/cors');
/* GET users listing. */

router.all('/', function(req, res, next) {
    next();
})
.options('/',cors.corsWithOptions, function(req, res, next) {
    next();
})
.post('/creategame',cors.corsWithOptions,gameController.createGame)
.post('/clickcel',cors.corsWithOptions,gameController.clickCel);

module.exports = router;

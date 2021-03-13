var express = require('express');
var router = express.Router();
const gameController = require('../Controllers/gameController/game.controller');
const cors = require('../Middlewares/cors');
/* GET users listing. */

const jwt = require('../Middlewares/jwt/jwt');

router.all('/', function(req, res, next) {
    next();
})
.options('/',cors.corsWithOptions,jwt.verifyHash,function(req, res, next) {
    next();
})
.post('/creategame',cors.corsWithOptions,jwt.verifyHash,gameController.createGame)
.post('/clickcel',cors.corsWithOptions,jwt.verifyHash,gameController.clickCel)
.post('/cashout',cors.corsWithOptions,jwt.verifyHash,gameController.cashOut)
.post('/checkgame',cors.corsWithOptions,jwt.verifyHash,gameController.checkGame);

module.exports = router;

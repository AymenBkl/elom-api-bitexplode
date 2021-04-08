var express = require('express');
var router = express.Router();
const gameController = require('../Controllers/gameController/game.controller');
const cors = require('../Middlewares/cors');
/* GET users listing. */

const jwt = require('../Middlewares/jwt/jwt');

router.all('/', function(req, res, next) {
    next();
})
.options('/',cors.corsWithOptions,jwt.verifyHash,jwt.verifyHashValid,function(req, res, next) {
    next();
})
.post('/creategame',cors.corsWithOptions,jwt.verifyHash,jwt.verifyHashValid,gameController.createGame)
.post('/clickcel',cors.corsWithOptions,jwt.verifyHash,jwt.verifyHashValid,gameController.clickCel)
.post('/cashout',cors.corsWithOptions,jwt.verifyHash,jwt.verifyHashValid,gameController.cashOut)
.post('/checkgame',cors.corsWithOptions,jwt.verifyHash,jwt.verifyHashValid,jwt.verifyHashValid,gameController.checkGame);

module.exports = router;

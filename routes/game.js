var express = require('express');
var router = express.Router();
const gameController = require('../Controllers/gameController/game.controller');
/* GET users listing. */

router.all('/', function(req, res, next) {
    next();
})
.options('/', function(req, res, next) {
    next();
})
.post('/creategame',gameController.createGame)
.post('/clickcel',gameController.clickCel);

module.exports = router;

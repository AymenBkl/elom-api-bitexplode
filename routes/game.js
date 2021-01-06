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
.post('/',gameController.createGame);

module.exports = router;

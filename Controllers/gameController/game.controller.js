const gameHandler = require('../../handlerGame/response.controller');

const clickCel = require('./click.cel');

const createGame = require('./game.create');

const checkGame = require('./checkGame');

module.exports = {
    createGame: (req,res) => {
        createGame.createGame(res,req.body.gameHash,req.body.game,req.body.addressId);
    },

    clickCel: (req,res) => {
        const gameHash = req.body.gameHash;
        clickCel.clickCel(res,gameHash,req.body.rowIndex,req.body.colIndex,req.body.value,req.body.addressId);
    },

    checkGame : (req,res) => {
        const gameHash = req.body.gameHash;
        checkGame.checkGame(res,gameHash);
    }
}
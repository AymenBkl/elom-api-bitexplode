const gameHandler = require('../../handlerGame/response.controller');

const clickCel = require('./click.cel');

const createGame = require('./game.create');

let games = {}
module.exports = {
    createGame: (req,res) => {
        createGame.createGame(games,res,req.body.gameHash,req.body.game);
    },

    clickCel: (req,res) => {
        const gameId = req.body.gameId;
        const gameHash = req.body.gameHash;
        clickCel.clickCel(res,games[gameHash][gameId],req.body.rowIndex,req.body.colIndex);
    }
}
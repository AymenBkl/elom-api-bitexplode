const gameHandler = require('../../handlerGame/response.controller');

const clickCel = require('./click.cel');

const createGame = require('./game.create');

let games = {}
module.exports = {
    createGame: (req,res) => {
        createGame.createGame(games,res);
    },

    clickCel: (req,res) => {
        const gameId = req.body.gameId;
        clickCel.clickCel(res,games[gameId],req.body.rowIndex,req.body.colIndex);
    }
}
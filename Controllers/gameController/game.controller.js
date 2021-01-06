const gameHandler = require('../../handlerGame/response.controller');

const createGame = require('./game.create');
let games = {}
module.exports = {
    createGame: () => {
        console.log("lol");
        createGame.createGame(games);
    }
}
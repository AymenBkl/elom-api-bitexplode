

const gameHandler = require('../../handlerGame/response.controller');

module.exports.createGame = async (games, res, gameHash,game) => {
  console.log(game);
  const now = new Date().toISOString();
  if (!games[gameHash]) {
    games[gameHash] = {}
  }
  games[gameHash][now] = initGame(now);
  games[gameHash][now].matrix = await createMatrix();
  const currentGame = games[gameHash][now];
  gameHandler.response("success", res, "YOUR GAME HAS BEEN CREATED", 200, 
  { gameId: currentGame.gameId, 
    stake: currentGame.stake, 
    numberMines: currentGame.numberMines, 
    userClick: 0, playing: currentGame.playing, 
    completed: currentGame.completed });
}

async function createMatrix() {
  let game = await Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => Object.assign({ color: "green", value: 0, clicked: false })));
  return createMine(game, game.minesNumber);
}

async function createMine(game, numberMines) {
  let i = 0;
  while (i < numberMines) {
    let rowIndex = Math.floor(Math.random() * 5);
    let colIndex = Math.floor(Math.random() * 5);
    if (game[rowIndex][colIndex].color != "red") {
      game[rowIndex][colIndex] = { color: "red", value: 0, clicked: false }
      i++;
    }
  }
  return game;
};

function initGame(gameId, minesNumber = 1, gamePlaying = true, stake = 100, matrix = null) {
  game = {
    gameId: gameId,
    stake: stake,
    numberMines: minesNumber,
    userClick: 0,
    playing: gamePlaying,
    matrix: null,
    completed: false,
  }

  return game;
}




const gameHandler = require('../../handlerGame/response.controller');

module.exports.createGame = async (games, res, gameHash,game) => {
  const now = new Date().toISOString();
  if (!games[gameHash]) {
    games[gameHash] = {}
  }
  games[gameHash][now] = initGame(now,minesNumber =  game.numberMines,true,stake= game.stake);
  games[gameHash][now].matrix = await createMatrix(games[gameHash][now].numberMines);
  const currentGame = games[gameHash][now];
  setTimeout(() => {
    gameHandler.response("success", res, "YOUR GAME HAS BEEN CREATED", 200, 
    { gameId: currentGame.gameId, 
      stake: currentGame.stake, 
      numberMines: currentGame.numberMines, 
      userClick: 0, playing: currentGame.playing, 
      completed: currentGame.completed });
  },1000)
  
}

async function createMatrix(numberMines) {
  let game = await Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => Object.assign({ color: "green", value: 0, clicked: false })));
  return await createMine(game, numberMines);
}

async function createMine(game, numberMines) {
  console.log(numberMines);
  let i = 0;
  while (i < numberMines) {
    let rowIndex = Math.floor(Math.random() * 5);
    let colIndex = Math.floor(Math.random() * 5);
    console.log(rowIndex,colIndex)
    if (game[rowIndex][colIndex].color != "red") {
      game[rowIndex][colIndex] = { color: "red", value: 0, clicked: false }
      i += 1;
    }
  }
  return game;
};

function initGame(gameId, minesNumber = 1, gamePlaying = true, stake = 100) {
  game = {
    gameId: gameId,
    stake: stake,
    numberMines: minesNumber,
    userClick: 0,
    playing: gamePlaying,
    completed: false,
  }

  return game;
}


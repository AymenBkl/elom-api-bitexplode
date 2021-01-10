

const gameHandler = require('../../handlerGame/response.controller');

const gameModel = require('../../Models/game');

const hash = require('../../Models/hash');

module.exports.createGame = async (res, hashId,game) => {
  let gameToCreate = {
    hash: hashId,
    stake: game.stake,
    numberMines: game.numberMines,
    userClick: 0,
    playing: true,
    completed: false,
  }

  gameToCreate.matrix = await createMatrix(game.numberMines)

  gameModel.create(gameToCreate)
    .then((gameCreated) => {
      if (gameCreated) {
        console.log(gameCreated);
        insertGameToHash(res,hashId,gameCreated);
      }
      else {
        gameHandler.response("error",res,"YOUR GAME COULDNLT CREATE",404);
      }
    })
    .catch(err => {
      console.log(err);
      gameHandler.response("error",res,"SOMETHING WENT WRONG",500);
    })
}

async function createMatrix(numberMines) {
  let game = await Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => Object.assign({ color: "green", value: 0, clicked: false })));
  return await createMine(game, numberMines);
}

async function createMine(game, numberMines) {
  let i = 0;
  while (i < numberMines) {
    let rowIndex = Math.floor(Math.random() * 5);
    let colIndex = Math.floor(Math.random() * 5);
    if (game[rowIndex][colIndex].color != "red") {
      game[rowIndex][colIndex] = { color: "red", value: 0, clicked: false }
      i += 1;
    }
  }
  return game;
};

function insertGameToHash(res,hashId, currentGame) {
  hash.findByIdAndUpdate(hashId , {
    $push : {
      games: currentGame._id
    }
  },
  {
    new: true,useFindAndModify:true
  }
  )
  .then(() => {
    gameHandler.response("success", res, "YOUR GAME HAS BEEN CREATED", 200,currentGame);
  })
  .catch((err) => {
    console.log(err);
    gameHandler.response("error",res,"SOMETHING WENT WRONG",500);
  })
}


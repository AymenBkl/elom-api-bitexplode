

const gameHandler = require('../../handlerGame/response.controller');

const gameModel = require('../../Models/game');

const hash = require('../../Models/hash');

const encrypt = require('../../Middlewares/encrypte');

const deposit = require('../../Models/deposit');

module.exports.createGame = async (res, hashId, game, addressId) => {
  checkStake(addressId, game.stake)
    .then(async (result) => {
      if (result && result.state != false) {
        let gameToCreate = {
          hash: hashId,
          stake: game.stake,
          numberMines: game.numberMines,
          userClick: 0,
          playing: true,
          completed: false,
        }
        let matrix = await createMatrix(game.numberMines)
        gameToCreate.matrix = matrix.game;
        gameToCreate.data = matrix.data;
        gameModel.create(gameToCreate)
          .then((gameCreated) => {
            if (gameCreated) {
              console.log(gameCreated);
              insertGameToHash(res, hashId, gameCreated);
            }
            else {
              gameHandler.response("error", res, "YOUR GAME COULDNLT CREATE", 404);
            }
          })
          .catch(err => {
            console.log(err);
            gameHandler.response("error", res, "SOMETHING WENT WRONG", 500);
          })
      }
      else {
        gameHandler.response("error", res, result.msg, 404);
      }
    })
    .catch(err => {
      gameHandler.response("error", res, "Something Went Wrong !",500);
    })
}

async function createMatrix(numberMines) {
  let game = await Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => Object.assign({ color: "green", value: 0, clicked: false })));
  return await createMine(game, numberMines);
}

async function createMine(game, numberMines) {
  let i = 0;
  let indexes = 'Your mines are : ';
  while (i < numberMines) {
    let rowIndex = Math.floor(Math.random() * 5);
    let colIndex = Math.floor(Math.random() * 5);
    if (game[rowIndex][colIndex].color != "red") {
      game[rowIndex][colIndex] = { color: "red", value: 0, clicked: false };
      indexes += rowIndex.toString() + colIndex.toString() + ' - ';
      i += 1;
    }
  }
  return { game: game, data: await encrypt.encrypt(indexes) };
};

function checkStake(addressId, stake) {
  return new Promise((resolve,reject) => {
    deposit.find(
      {
        addressId: addressId,
        currentBalance: {
          $gt:0
        }
      }
    )
    .sort('-createdAt')
      .then(async (deposits) => {
        if (deposits && deposits.length > 0) {
          let depositIds = [];
          let currentStake = stake;
          let index = 0;
          while (index < deposits.length) {
            if (deposits[index].currentBalance >= currentStake){
              deposits[index].currentBalance -= currentStake;
              currentStake = 0;
              depositIds.push(deposits[index]);
              index = deposits.length + 1;
            } 
            else {
              currentStake -= deposits[index].currentBalance;
              deposits[index].currentBalance = 0;
              depositIds.push(deposits[index]);
              index += 1;
            }
          }
          if (currentStake == 0){
            resolve(updateDeposits(depositIds));
          }
          else {
            resolve({statue:false,msg: 'You don"t have enough balance'});
          }
        }
      })
      .catch(err => {
        reject(err);
      })
  })
  
}

function updateDeposits(depositIds){
  return new Promise((resolve,reject) => {
    deposit.bulkWrite(
      depositIds.map((deposit) => 
      ({
          updateOne: {
              filter: { _id: deposit._id },
              update: {
                  $set: {
                      currentBalance: deposit.currentBalance
                  },
              },
              new: true, setDefaultsOnInsert: true 
          }
      })
      )
  )
      .then(deposit => { 
          console.log(deposit);
          resolve({status:true});
      })
      .catch(err => {
          reject(err);
      })
  })
  
}
function insertGameToHash(res, hashId, currentGame) {
  hash.findByIdAndUpdate(hashId, {
    $push: {
      games: currentGame._id
    }
  },
    {
      new: true, useFindAndModify: true
    }
  )
    .select("-hash -salt")
    .then(() => {
      gameHandler.response("success", res, "YOUR GAME HAS BEEN CREATED", 200,
        {
          _id: currentGame._id,
          stake: currentGame.stake,
          numberMines: currentGame.numberMines,
          userClick: 0, playing: currentGame.playing,
          completed: currentGame.completed,
          data: { encryptedData: currentGame.data.encryptedData }
        });
    })
    .catch((err) => {
      console.log(err);
      gameHandler.response("error", res, "SOMETHING WENT WRONG", 500);
    })
}


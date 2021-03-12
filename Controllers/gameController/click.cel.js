const gameHandler = require('../../handlerGame/response.controller');

const gameModel = require('../../Models/game');

const hash = require('../../Models/hash');

const encrypt = require('../../Middlewares/encrypte');

module.exports.clickCel = async (res,gameHash,gameId,rowIndex,colIndex,value) => {
    gameModel.findOne({hash:gameHash,_id: gameId})
    .select('-data')
        .then(async (game) => {
            if (game){
                let cel = game.matrix[rowIndex][colIndex];
                if (!cel.clicked && game.playing && !game.completed ) {
                    game.userClick += 1;
                    if (cel.color == 'green'){
                        cel.clicked = true;
                        cel.value = value
                        if ((game.numberMines + game.userClick) == 25){
                            const indexMines = await winGame(game);
                            gameModel.findOne({hash:gameHash,_id: gameId})
                            .then(async (gameWin) => {
                                const decryptedData = await encrypt.decrypted(gameWin.data);
                                res.json({msg : 'YOU WON THE GAME',success: true,status : 200,response: {userClick: game.userClick,indexMines: indexMines,color: 'green',data:gameWin.data,mines: decryptedData}});
                            })                       
                        }
                        else {
                            res.json({msg : 'YOU HAVE CLICK RIGHT CELL',success: true,status : 200,response: {userClick: game.userClick, color: 'green'}});
                        }
                        
        
                    }
                    else {
                        cel.clicked = true;
                        const indexMines = await loseGame(game);
                        gameModel.findOne({hash:gameHash,_id: gameId})
                            .then(async (gameLose) => {
                                const decryptedData = await encrypt.decrypted(gameLose.data);
                                res.json({msg : 'YOU HAVE CLICK MINE CELL',success: true,status : 200,response: {userClick: game.userClick,indexMines: indexMines,color: 'red',data:gameLose.data,mines: decryptedData}});
                            })
                    }
                    game.matrix[rowIndex][colIndex] = cel;
                    gameModel.updateOne({_id:gameId},game)
                        .then((updated => {
                        }))
                }
            }

            else {
                res.json({msg : 'YOU HAVE NO GAME',success: true,status : 404,response: null});
            }
            
        })
        .catch(err => {
            console.log(err);
            res.json({msg : 'SOMETHING WENT WRONG',success: true,status : 500,response: null});
        })
        
    
        
}


async function loseGame(game) {
    let indexMines = [];
    let totalLose = 0;
    game.completed = true;
    game.playing = false;
    await game.matrix.map((row,indexRow) => {
        row.map((col,indexCol) => {
            if (col.color == 'red'){
                indexMines.push({indexRow : indexRow, indexCol : indexCol});
            }
            totalLose -= col.value;
        })
    })
    console.log(totalLose);
    return indexMines;
}

async function winGame(game) {
    let indexMines = [];
    let totalWin = 0;
    game.completed = true;
    game.playing = false;
    await game.matrix.map((row,indexRow) => {
        row.map((col,indexCol) => {
            if (col.color == 'red'){
                indexMines.push({indexRow : indexRow, indexCol : indexCol});
            }
            totalWin += col.value;
        })
    })
    console.log(totalWin);
    return indexMines;
}


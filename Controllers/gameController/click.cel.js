const gameHandler = require('../../handlerGame/response.controller');

const gameModel = require('../../Models/game');

const hash = require('../../Models/hash');

const encrypt = require('../../Middlewares/encrypte');

module.exports.clickCel = async (res,gameHash,gameId,rowIndex,colIndex,value) => {
    console.log(value);
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
                            res.json({msg : 'YOU HAVE CLICK RIGHT CELL',success: true,status : 200,response: {userClick: game.userClick, color: 'green'}});
        
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
    game.completed = true;
    game.playing = false;
    await game.matrix.map((row,indexRow) => {
        row.map((col,indexCol) => {
            if (col.color == 'red'){
                indexMines.push({indexRow : indexRow, indexCol : indexCol});
            }
        })
    })
    return indexMines;
}
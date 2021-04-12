const gameHandler = require('../../handlerGame/response.controller');

const gameModel = require('../../Models/game');

const hash = require('../../Models/hash');

const encrypt = require('../../Middlewares/encrypte');

const deposit = require('../../Models/deposit');

module.exports.clickCel = async (res, gameHash, rowIndex, colIndex, value,addressId) => {
    console.log(gameHash);
    gameModel.findOne({ hash: gameHash,completed:false,playing:true,status:'active'})
        .select('-data -_id')
        .then(async (game) => {
            console.log(game.hash,game);
            if (game) {
                let cel = game.matrix[rowIndex][colIndex];
                if (!cel.clicked && game.playing && !game.completed) {
                    game.userClick += 1;
                    if (cel.color == 'green') {
                        cel.clicked = true;
                        cel.value = value
                        if ((game.numberMines + game.userClick) == 25) {
                            const indexMines = await winGame(game,addressId);
                            game.status = 'win';
                            gameModel.findOne({ hash: gameHash,completed:false,playing:true,status:'active' })
                                .then(async (gameWin) => {
                                    const decryptedData = await encrypt.decrypted(gameWin.data);
                                    res.json({ msg: 'YOU WON THE GAME', success: true, status: 200, response: { userClick: game.userClick, indexMines: indexMines, color: 'green', data: gameWin.data, mines: decryptedData } });
                                })
                        }
                        else {
                            res.json({ msg: 'YOU HAVE CLICK RIGHT CELL', success: true, status: 200, response: { userClick: game.userClick, color: 'green' } });
                        }


                    }
                    else {
                        cel.clicked = true;
                        const indexMines = await loseGame(game);
                        game.status = 'lose';
                        gameModel.findOne({ hash: gameHash,completed:false,playing:true,status:'active' })
                            .then(async (gameLose) => {
                                const decryptedData = await encrypt.decrypted(gameLose.data);
                                res.json({ msg: 'YOU HAVE CLICK MINE CELL', success: true, status: 200, response: { userClick: game.userClick, indexMines: indexMines, color: 'red', data: gameLose.data, mines: decryptedData } });
                            })
                    }
                    game.matrix[rowIndex][colIndex] = cel;

                    gameModel.findOneAndUpdate({hash:gameHash,completed:false,playing:true,status:'active' }, game)
                        .then((updated => {
                        }))
                }
                else if (cel.clicked && game.playing && !game.completed){
                    res.json({ msg: 'This cell is already clicked', success: true, status: 200, response: { userClick: game.userClick, color: cel.color,value:cel.value } });
                }
            }

            else {
                res.json({ msg: 'YOU HAVE NO GAME', success: true, status: 404, response: null });
            }

        })
        .catch(err => {
            console.log(err);
            res.json({ msg: 'SOMETHING WENT WRONG', success: true, status: 500, response: null });
        })



}


async function loseGame(game) {
    let indexMines = [];
    game.completed = true;
    game.playing = false;
    await game.matrix.map((row, indexRow) => {
        row.map((col, indexCol) => {
            if (col.color == 'red') {
                indexMines.push({ indexRow: indexRow, indexCol: indexCol });
            }
        })
    })
    return indexMines;
}

async function winGame(game,addressId) {
    let indexMines = [];
    let totalWin = 0;
    game.completed = true;
    game.playing = false;
    await game.matrix.map((row, indexRow) => {
        row.map((col, indexCol) => {
            if (col.color == 'red') {
                indexMines.push({ indexRow: indexRow, indexCol: indexCol });
            }
            totalWin += col.value;
        })
    })
    if (game.type == 'bitcoin'){
        updateDepositWin(addressId,totalWin)
    }
    return indexMines;
}

function updateDepositWin(addressId,totalWin) {
    deposit.findOneAndUpdate({ addressId: addressId, active: true },{$inc : {currentBalance: totalWin}})
        .then((update) => {
        })
        .catch((err) => {
        })
}
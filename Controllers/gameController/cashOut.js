
const deposit = require('../../Models/deposit');

const gameModel = require('../../Models/game');

const encrypt = require('../../Middlewares/encrypte');

module.exports.cashOut = (res, gameHash, addressId) => {
    gameModel.findOne({ hash: gameHash, completed: false, playing: true, status: 'active' })
        .select('-data')
        .then(async (game) => {
            console.log(game);
            if (game && game.type == 'bitcoin') {
                const indexMines = await cashOut(game, addressId);
                game.status = 'withdraw';
                gameModel.findOneAndUpdate({completed:false,playing:true,status:'active' }, game,{$new:true})
                        .then(async (game) => {
                            const decryptedData = await encrypt.decrypted(game.data);
                            res.json({ msg: 'YOU WITHDRAW THE GAME', success: true, status: 200, response: { userClick: game.userClick, indexMines: indexMines, color: 'green', data: game.data, mines: decryptedData } });
                        })
            }
            else if (game && game.type == 'test'){
                res.json({ msg: 'YOU CAN"T CASHOUT ON TEST GAME', success: true, status: 404, response: null });
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

async function cashOut(game, addressId) {
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
    await updateDepositWin(addressId, totalWin)
    return indexMines;
}

function updateDepositWin(addressId, totalWin) {
    deposit.findOneAndUpdate({ addressId: addressId, active: true }, { $inc: { currentBalance: totalWin } })
        .then((update) => {
        })
        .catch((err) => {
        })
}
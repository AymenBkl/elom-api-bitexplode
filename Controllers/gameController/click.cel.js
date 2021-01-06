const gameHandler = require('../../handlerGame/response.controller');


module.exports.clickCel = async (res,game,rowIndex,colIndex) => {
    let cel = game[rowIndex][colIndex];
        if (cel.color == 'green'){
            cel.clicked = true;
            gameHandler.response("success",res,"YOU HAVE CLICK RIGHT CELL ",200,game);
        }
        else {
            cel.clicked = true;
            gameHandler.response("success",res,"YOU HAVE CLICK MINE CELL ",200,game);
        }
    game[rowIndex][colIndex] = cel;
}
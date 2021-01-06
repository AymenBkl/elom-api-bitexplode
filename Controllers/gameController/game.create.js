

const gameHandler = require('../../handlerGame/response.controller');

module.exports.createGame = async (games) => {
        const now = new Date().toISOString();
        games[now] = await createMatrix();
        console.log(games);
}

async function createMatrix() {
    let game = await Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => 'default'));
    return createMine(game,3);
}

async function createMine(game,numberMines) {
        let i = 0;
        while (i < numberMines) {
          let rowIndex = Math.floor(Math.random() * 5);
          let colIndex = Math.floor(Math.random() * 5);
          if (game[rowIndex][colIndex].color != "red") {
            game[rowIndex][colIndex] = "mine"
            i++;
          }}
          return game;
};


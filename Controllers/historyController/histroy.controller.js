const gameHandler = require('../../handlerGame/response.controller');

const getHistory = require('./getHistory');



module.exports = {
    getHistory: (req,res) => {
        getHistory.getHistory(res,req.query.hashId);
    },
}
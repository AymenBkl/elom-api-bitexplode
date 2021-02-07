
const checkHash = require('./checkHash');

const createHash = require('./createHash');
module.exports = {
    checkHash : (req,res,next) => {
        checkHash.checkHash(res,req.query.hashId)
    },

    createHash: (req,res,next) => {
        createHash.createHash(req,res);
    }
}
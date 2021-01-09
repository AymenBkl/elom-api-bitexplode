
const checkHash = require('./checkHash')
module.exports = {
    checkHash : (req,res,next) => {
        checkHash.checkHash(res,req.query.hashId)
    }
}
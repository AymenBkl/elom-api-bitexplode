
const checkHash = require('./checkHash')
module.exports = {
    checkHash : (req,res,next) => {
        console.log(req.query);
    }
}
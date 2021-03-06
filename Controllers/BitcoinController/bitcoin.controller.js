
const response = require('./response');

module.exports = {
    normalResponse: (req, res, next) => {
        var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":[]}`;
        response(res, req.url.split('/')[1], dataString);
    }
}
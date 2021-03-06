
const response = require('./response');

const confirmAddress = require('./confirmAddress');

module.exports = {
    normalResponse: (req, res, next) => {
        var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":[]}`;
        response.response(res, req.url.split('/')[1], dataString);
    },

    getPrivateKey: (req, res, next) => {
        var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":["${req.params.address}"]}`;
        response.response(res, req.url.split('/')[1], dataString);
    },

    unlockWallet: (req, res, next) => {
        var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":["${PASS + " 3600"}"]}`;
        response.response(res, req.url.split('/')[1], dataString);
    },

    getBlockInfo: (req, res, next) => {
        var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":[${req.params.hash}]}`;
        response.response(res, req.url.split('/')[1], dataString);
    },

    getBlockHash: (req, res, next) => {
        var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":[${req.params.index}]}`;
        response.response(res, req.url.split('/')[1], dataString);
    },

    getRawTransaction: (req, res, next) => {
        var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":[${req.params.id}]}`;
        response.response(res, req.url.split('/')[1], dataString);
    },

    decodeRawTransaction: (req, res, next) => {
        var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":[${req.params.hex.toString()}]}`;
        response.response(res, req.url.split('/')[1], dataString);
    },

    sendToAddress: (req, res, next) => {
        const url = req.url.split('/')[1];
        confirmAddress.confirmAddress(1, req.body.address)
            .then((result) => {
                console.log(result);
                var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${url}","params":{"address":"${req.body.address}","amount":${req.body.amount},"fee_rate":${req.body.fee}}}`;
                response.response(res, url, dataString)
            })
            .catch(err => {
                res.json({ err: "Something Went Wrong", method: url, status: response.statusCode, message: err })
            });
    },
    listUnSpent: (req, res, next) => {
        let addresses = [];
        req.body.addresses.map(address => {
            addresses.push('"' + address + '"');
        })
        const url = req.url.split('/')[1];
        var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${url}","params":[${req.body.minconf},${req.body.maxconf},[${addresses}]]}`;
        response.response(res, url, dataString);
    }
}
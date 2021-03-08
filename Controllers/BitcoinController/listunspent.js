const address = require('../../Models/bitcoin-addresses');

const getInfo = require('./getInfo').getInfo;
module.exports.listUnspent = (addresses) => {
    return new Promise((resolve,reject) => {
        let addresses = [];
        req.body.addresses.map(address => {
            addresses.push('"' + address + '"');
        })
        const url = req.url.split('/')[1];
        var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${url}","params":[${req.body.minconf},${req.body.maxconf},[${addresses}]]}`;
        resolve(getInfo('listunspent',dataString));
    })
    
}
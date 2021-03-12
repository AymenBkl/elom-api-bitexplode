const address = require('../../Models/bitcoin-addresses');

const getInfo = require('./getInfo').getInfo;
module.exports.listUnspent = (addresses) => {
    return new Promise((resolve,reject) => {
        let addressesToBeFormated = [];
        addresses.map(address => {
            addressesToBeFormated.push('"' + address.address + '"');
        })
        const url = 'listunspent';
        var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${url}","params":[${0},${9999},[${addressesToBeFormated}]]}`;
        resolve(getInfo('listunspent',dataString));
    })
    
}
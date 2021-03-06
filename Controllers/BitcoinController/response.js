
const getInfo = require('./getInfo').getInfo;

const bitcoinHandler = require('../../BitcoinHandler/response.controller');
module.exports.response = (res, url, dataString) => {
    getInfo(url, dataString)
        .then(result => {
            bitcoinHandler.response('success', res, '', 200, result.data, url)
        })
        .catch(err => {
            bitcoinHandler.response('err',res,'',result.status,result.message,url);
        })
}
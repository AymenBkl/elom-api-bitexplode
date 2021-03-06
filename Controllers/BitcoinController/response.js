
const getInfo = require('./getInfo').getInfo;

module.exports.response = (res,url,dataString) => {
    getInfo(url,dataString)
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      res.json(err);
    })
}
const request = require('request');


module.exports.prepareRequest = (dataString,callback) => {
    console.log(dataString);
    var options = {
      url: `http://167.99.213.37:80/wallet/bitexplodetest3`,
      method: "POST",
      headers: headers,
      auth:{
        user:USER,
        pass:PASS,
        sendImmediately:false
      },
      body: dataString
    };
    request(options, callback);
}
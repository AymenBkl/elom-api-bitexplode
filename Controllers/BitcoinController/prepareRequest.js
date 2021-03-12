const request = require('request');
const dotenv = require("dotenv");
dotenv.config();

const USER = process.env.RPC_USER;
const PASS = process.env.RPC_PASSWORD;

const headers = {
  "content-type": "text/plain;"
};

module.exports.prepareRequest = (dataString,callback) => {
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
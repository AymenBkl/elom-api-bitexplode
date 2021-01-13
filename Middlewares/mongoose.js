const mongoose = require("mongoose");
const fs = require('fs');



const config = require('../config');

var key = fs.readFileSync(process.mainModule.path + '\\mongoSSL\\mongodb.pem');

var ca = fs.readFileSync(process.mainModule.path + '\\mongoSSL\\rootCA.pem');


var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
    sslValidate:false,
    sslCA: ca,
    sslCert:key,
    sslKey:key,
};

module.exports = mongoose
  .connect(config.config.mongoURL,options)
  .then((db) => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log("ERROR : !!", err);
  });
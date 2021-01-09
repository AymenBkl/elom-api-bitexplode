const mongoose = require("mongoose");

const config = require('../config');
module.exports = mongoose
  .connect(config.config.mongoURL, { useNewUrlParser: true,useFindAndModify : false })
  .then((db) => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log("ERROR : !!", err);
  });
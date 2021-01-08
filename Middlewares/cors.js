const express = require("express");

const cors = require("cors");


const config = require('../config');

const whiteList = [config.config.webURL];

var corsOptionsDelegate = (req, callback) => {
  var corsOptions;
  console.log("cors",req.header("Origin"));
  const index = whiteList.indexOf(req.header("Origin"));  
  console.log("index",index);
  if (index !== -1 ) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null,corsOptions);
};

var corsOptionsDeletePut = (req, callback) => {
    var corsOptions;
    console.log(req.header("Origin"));
    if (whiteList.indexOf(req.header("Origin")) !== -1) {
      corsOptions = { origin: true };
    } else {
      corsOptions = { origin: false };
    }
    callback(null, corsOptions);
  };

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);

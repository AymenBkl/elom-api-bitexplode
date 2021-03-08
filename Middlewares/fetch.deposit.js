const express = require("express");

var app = express();

const address = require('../Models/bitcoin-addresses');

const listUnspent = require('../Controllers/BitcoinController/listunspent').listUnspent;



console.log("voila")

var depositApi = () => {
    address.find({})
        .then(addresses => {
            console.log(addresses);
            if (addresses && address.length > 0) {
                listUnspent(addresses)
                    .then((result) => {
                        console.log(result);
                    })
            }
        })
}
depositApi()
setInterval(() => {
    depositApi()}
    ,300000);


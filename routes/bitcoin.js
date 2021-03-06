const express = require("express");
var router = express.Router();

const bitcoinController = require('../Controllers/BitcoinController/bitcoin.controller');
router.get("/getblockcount",bitcoinController.normalResponse);

router.get("/getbestblockhash",bitcoinController.normalResponse);

router.get("/getconnectioncount",bitcoinController.normalResponse);

router.get("/getdifficulty",bitcoinController.normalResponse);

router.get("/getblockchaininfo",bitcoinController.normalResponse);

router.get("/getmininginfo", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":[]}`;
  response(res,req.url.split('/')[1],dataString);
});

router.get("/getaccountaddress",bitcoinController.normalResponse);

router.get("/getpeerinfo",bitcoinController.normalResponse);

router.get("/getrawmempool",bitcoinController.normalResponse);

router.get("/getnewaddress",bitcoinController.normalResponse);

router.get("/walletlock",bitcoinController.normalResponse);

router.get("/getbalance",bitcoinController.normalResponse);

router.post("/sendtoaddress", (req, res) => {
  
});

router.post("/listunspent", (req, res) => {
  let addresses = [];
  req.body.addresses.map(address => {
    addresses.push('"' + address + '"');
  })
  const url = req.url.split('/')[1];
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${url}","params":[${req.body.minconf},${req.body.maxconf},[${addresses}]]}`;
  response(res,url,dataString);
});

router.get("/walletpassphrase",bitcoinController.unlockWallet);

router.get("/dumpprivkey/:address",bitcoinController.getPrivateKey);

router.get("/getblock/:hash", bitcoinController.getBlockInfo);

router.get("/getblockhash/:index",bitcoinController.getBlockHash);

router.get("/getrawtransaction/:id",bitcoinController.getRawTransaction);

router.get("/decoderawtransaction/:hex",bitcoinController.decodeRawTransaction);





module.exports = router;

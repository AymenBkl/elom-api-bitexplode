const express = require("express");
var router = express.Router();

const cors = require('../Middlewares/cors');

const jwt = require('../Middlewares/jwt/jwt');

const bitcoinController = require('../Controllers/BitcoinController/bitcoin.controller');


router.get("/getblockcount",cors.corsWithOptions,jwt.verifyHash,bitcoinController.normalResponse);

router.get("/getbestblockhash",cors.corsWithOptions,jwt.verifyHash,bitcoinController.normalResponse);

router.get("/getconnectioncount",cors.corsWithOptions,jwt.verifyHash,bitcoinController.normalResponse);

router.get("/getdifficulty",cors.corsWithOptions,jwt.verifyHash,bitcoinController.normalResponse);

router.get("/getblockchaininfo",cors.corsWithOptions,jwt.verifyHash,bitcoinController.normalResponse);

router.get("/getmininginfo",cors.corsWithOptions,jwt.verifyHash,bitcoinController.normalResponse);

router.get("/getaccountaddress",cors.corsWithOptions,jwt.verifyHash,bitcoinController.normalResponse);

router.get("/getpeerinfo",cors.corsWithOptions,jwt.verifyHash,bitcoinController.normalResponse);

router.get("/getrawmempool",cors.corsWithOptions,jwt.verifyHash,bitcoinController.normalResponse);

router.get("/getnewaddress",cors.corsWithOptions,jwt.verifyHash,bitcoinController.getNewAddress);

router.get("/walletlock",cors.corsWithOptions,jwt.verifyHash,bitcoinController.normalResponse);

router.get("/getbalance",cors.corsWithOptions,jwt.verifyHash,bitcoinController.normalResponse);

router.post("/sendtoaddress",cors.corsWithOptions,jwt.verifyHash,bitcoinController.sendToAddress);

router.post("/listunspent",cors.corsWithOptions,jwt.verifyHash,bitcoinController.listUnSpent);

router.get("/walletpassphrase",cors.corsWithOptions,jwt.verifyHash,bitcoinController.unlockWallet);

router.get("/dumpprivkey/:address",cors.corsWithOptions,jwt.verifyHash,bitcoinController.getPrivateKey);

router.get("/getblock/:hash",cors.corsWithOptions,jwt.verifyHash,bitcoinController.getBlockInfo);

router.get("/getblockhash/:index",cors.corsWithOptions,jwt.verifyHash,bitcoinController.getBlockHash);

router.get("/getrawtransaction/:id",cors.corsWithOptions,jwt.verifyHash,bitcoinController.getRawTransaction);

router.get("/decoderawtransaction/:hex",cors.corsWithOptions,jwt.verifyHash,bitcoinController.decodeRawTransaction);





module.exports = router;

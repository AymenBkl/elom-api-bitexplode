const express = require("express");
var router = express.Router();

const bitcoinController = require('../Controllers/BitcoinController/bitcoin.controller');
router.get("/getblockcount",bitcoinController.normalResponse);

router.get("/getbestblockhash", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":[]}`;
  response(res,req.url.split('/')[1],dataString);
});

router.get("/getconnectioncount", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":[]}`;
  response(res,req.url.split('/')[1],dataString);
});

router.get("/getdifficulty", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":[]}`;
  response(res,req.url.split('/')[1],dataString);
});

router.get("/getblockchaininfo", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":[]}`;
  response(res,req.url.split('/')[1],dataString);
});

router.get("/getmininginfo", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":[]}`;
  response(res,req.url.split('/')[1],dataString);
});

router.get("/getaccountaddress", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":[]}`;
  response(res,req.url.split('/')[1],dataString);
});
router.get("/getpeerinfo", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":[]}`;
  response(res,req.url.split('/')[1],dataString);
});

router.get("/getrawmempool", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":[]}`;
  response(res,req.url.split('/')[1],dataString);
});

router.get("/getnewaddress", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":["-addresstype legacy"]}`;
  response(res,req.url.split('/')[1],dataString);
});

router.get("/walletlock", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":[]}`;
  response(res,req.url.split('/')[1],dataString);
});

router.get("/getbalance", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":[]}`;
  response(res,req.url.split('/')[1],dataString);
});

router.post("/sendtoaddress", (req, res) => {
  const url = req.url.split('/')[1];
  confirmAddress(res,1,req.body.address)
    .then((result) => {
      console.log(result);
      var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${url}","params":{"address":"${req.body.address}","amount":${req.body.amount},"fee_rate":${req.body.fee}}}`;
      response(res,url,dataString)
    })
    .catch(err => {
      res.json({err:"Something Went Wrong",method:url,status:response.statusCode,message:err})
    });
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

router.get("/walletpassphrase", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":["${PASS + " 3600"}"]}`;
  response(res,req.url.split('/')[1],dataString);
});

router.get("/dumpprivkey/:address", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":["${req.params.address}"]}`;
  response(res,req.url.split('/')[1],dataString);
});

router.get("/getblock/:hash", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":[${req.params.hash}]}`;
  response(res,req.url.split('/')[1],dataString);
});

router.get("/getblockhash/:index", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":[${req.params.index}]}`;
  response(res,req.url.split('/')[1],dataString);
});

router.get("/getrawtransaction/:id", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":[${req.params.id}]}`;
  response(res,req.url.split('/')[1],dataString);
});

router.get("/decoderawtransaction/:hex", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":[${req.params.hex.toString()}]}`;
  response(res,req.url.split('/')[1],dataString);
});



function confirmAddress(res,numberBlocks,address){
  return new Promise((resolve,reject) => {
    var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"generatetoaddress","params":[${numberBlocks},"${address}"]}`;
    console.log(dataString);
    callback = (error, response, body) => {
      if (error || response.statusCode != 200){
        reject({err:"Something Went Wrong",method:'generatetoaddress',status:response.statusCode,message:JSON.parse(body)});
      }
      if (!error && response.statusCode == 200) {
        console.log('here2')
        const data = JSON.parse(body);
        console.log(data.result);
        resolve({data:data});
      }
    };
    prepareRequest(dataString,callback);
  }) 
}




module.exports = router;

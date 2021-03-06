const prepareRequest = require('./prepareRequest').prepareRequest;


module.exports.confirmAddress = (numberBlocks,address) => {
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
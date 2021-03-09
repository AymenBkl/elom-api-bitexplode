const prepareRequest = require('./prepareRequest').prepareRequest;


module.exports.getInfo = (url,dataString) => {
    return new Promise((resolve,reject) => {
        callback = (error, response, body) => {
          if (error || response.statusCode != 200){
            resolve({err:"Something Went Wrong",method:url,status:response.statusCode,message:JSON.parse(body)});
          }
          if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            resolve({data:data});
          }
        };
        prepareRequest(dataString,callback);
      })
}



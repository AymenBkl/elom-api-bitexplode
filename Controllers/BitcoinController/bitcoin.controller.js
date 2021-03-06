

function getInfo(url,dataString){
    return new Promise((resolve,reject) => {
      callback = (error, response, body) => {
        if (error || response.statusCode != 200){
          console.log('here')
          resolve({err:"Something Went Wrong",method:url,status:response.statusCode,message:JSON.parse(body)});
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
let crypto = require('crypto');

let algorithms = [{name: 'aes128',keyLen : 16,ivLen: 16},{name: 'aes-128-cbc',keyLen : 16,ivLen: 16},{name: 'aes192',keyLen : 24,ivLen: 16},{name: 'aes-192-cbc',keyLen : 24,ivLen: 16},{name: 'aes256',keyLen : 32,ivLen: 16},{name: 'aes-256-cbc',keyLen : 32,ivLen: 16}];

async function randomAlgo(){
   let x = Math.floor(Math.random() * 6);
   console.log(x);
   const algo = algorithms[x];
   const iv =  crypto.randomBytes(algo.ivLen);
   const key = crypto.randomBytes(algo.keyLen);
   return {algorithm : algo.name,iv : iv , key : key ,encrypted: '' }
 }
  
  
    
  // Difining algorithm 
    
  // An encrypt function 
  module.exports.encrypt = async function encrypt(text) { 
   let data = await randomAlgo();
   console.log(data);
   let cipher =  
      crypto.createCipheriv(data.algorithm, Buffer.from(data.key), data.iv); 
   // Updating text 
   console.log(text);
   let encrypted = cipher.update(text); 
    
   // Using concatenation 
   encrypted = Buffer.concat([encrypted, cipher.final()]); 
    console.log(encrypted.toString('hex').length);
   // Returning iv and encrypted data 
   return Promise.resolve({algorithm : data.algorithm,iv : data.iv.toString('hex'), key : data.key.toString('hex'),encryptedData: encrypted.toString('hex') })
  } 


  module.exports.decrypted = async function decrypt(data) { 
    
    let iv = Buffer.from(data.iv, 'hex'); 
    let encryptedText = 
       Buffer.from(data.encryptedData, 'hex'); 
     
    // Creating Decipher 
    let decipher = crypto.createDecipheriv( 
     data.algorithm, Buffer.from(data.key,'hex'), iv); 
     
    // Updating encrypted text 
    let decrypted = decipher.update(encryptedText); 
    decrypted = Buffer.concat([decrypted, decipher.final()]); 
     
    // returns data after decryption 
    return Promise.resolve(decrypted.toString()); 
    }
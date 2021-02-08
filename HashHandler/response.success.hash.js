module.exports.success = (res,token,status,hash) => {
    res.statusCode = status;
    res.setHeader("Content-Type","application/json");
    res.json({msg : "Welcom to NAT3RFOU ",success: true,token : token,status : status,hash : hash});
}
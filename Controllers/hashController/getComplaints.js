var complaintModel = require('../../Models/complaint');

module.exports.getComplaints = async (res,hashId) => {
    complaintModel.find({hashId:hashId}) 
        .then((complaints) => {
            if (complaints && complaints.length > 0 ){
                console.log(complaints)
                res.json({msg : 'COMPLAINT CREATED',success: true,status : 200,complaints:complaints});
            }
            else if (complaints && complaints.length == 0 ){
                res.json({msg : 'COMPLAINTS NOT FOUND',success: false,status : 404});
            }
            else {
                res.json({msg : 'SOMETHING WENT WRONG !',success: false,status : 500});
            }
        })
        .catch(err => {
            console.log(err);
            res.json({msg : 'SOMETHING WENT WRONG !',success: false,status : 500});

        })
    
}






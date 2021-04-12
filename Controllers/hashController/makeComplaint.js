var complaintModel = require('../../Models/complaint');

module.exports.makeComplaint = async (req,res,next) => {
    console.log("here");
    complaintModel.create(req.body.complaint) 
        .then((complaintCreated) => {
            if (complaintCreated ){
                console.log(complaintCreated)
                res.json({msg : 'COMPLAINT CREATED',success: true,status : 200});
            }
            else {
                res.json({msg : 'COMPLAINT NOT FOUND',success: false,status : 404});
            }
        })
        .catch(err => {
            console.log(err);
            res.json({msg : 'SOMETHING WENT WRONG !',success: false,status : 500});

        })
    
}






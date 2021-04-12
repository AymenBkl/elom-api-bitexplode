
const checkHash = require('./checkHash');

const createHash = require('./createHash');

const makeComplaint = require('./makeComplaint');

const getComplaints = require('./getComplaints');

module.exports = {
    checkHash : (req,res,next) => {
        checkHash.checkHash(res,req.query.hashId)
    },

    createHash: (req,res,next) => {
        createHash.createHash(req,res,next);
    },

    makeComplaint: (req,res,next) => {
        makeComplaint.makeComplaint(req,res,next);
    },

    getComplaints: (req,res,next) => {
        getComplaints.getComplaints(res,req.query.hashId);
    }
}
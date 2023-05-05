const twilioCall = require('../services/twiliocall');
exports.getCallEvents = async(req,res) => {
    const callPriority =  req.query.callPriority;
    const gid = req.query.gid;
    const phoneNumber = req.body.Called;
   // console.log(req.body)
    twilioCall.updateCallStatus(phoneNumber,req.body,callPriority,gid);
    res.sendStatus(200);
}
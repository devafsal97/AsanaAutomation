const twilioCall = require("../services/twiliocall");

exports.getCallEvents = async (req, res) => {
  console.log("twilio hitted");
  const callPriority = req.query.callPriority;
  const gid = req.query.gid;
  const phoneNumber = req.body.Called;
  twilioCall.updateCallStatus(phoneNumber, req.body, callPriority, gid);
  res.sendStatus(200);
};

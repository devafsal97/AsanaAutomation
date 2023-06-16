const plivo = require("../services/plivoVoice");

require("dotenv").config();

exports.answerUrl = async (req, res) => {
  const callStatus = req.body;
  console.log("statussss", callStatus);
  const callPriority = req.query.callPriority;
  const gid = req.query.gid;
  const phoneNumber = req.body.To;

  plivo.updateCallStatus(phoneNumber, req.body, callPriority, gid);
};

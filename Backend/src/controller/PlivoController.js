const plivo = require("plivo");
require("dotenv").config();

exports.answerUrl = async (req, res) => {
  const callStatus = req.body.CallStatus;
  console.log("statussss", callStatus);
  const callUUID = req.body.CallUUID;

  console.log("plivo hitted", req.body);
  console.log(req.query.callPriority, req.query.gid);
  const callPriority = req.query.callPriority;
  const gid = req.query.gid;
  const phoneNumber = req.body.Called;
  //twilioCall.updateCallStatus(phoneNumber, req.body, callPriority, gid);

  // Handle the call status based on the received data
  // switch (callStatus) {
  //   case "completed":
  //     console.log(req.body);
  //     console.log("completde");
  //     // Call completed successfully
  //     // Perform any necessary actions
  //     break;
  //   case "busy":
  //     console.log(req.body);
  //     console.log("busy");
  //     // Call recipient was busy
  //     // Perform any necessary actions
  //     break;
  //   case "in-progress":
  //     console.log(req.body);
  //     console.log("in-progress");
  //     // Call failed
  //     // Perform any necessary actions
  //     break;
  //   case "timeout":
  //     console.log(req.body);
  //     console.log("timeout");
  //     // Call timed out
  //     // Perform any necessary actions
  //     break;
  //   case "no-answer":
  //     console.log(req.body);
  //     console.log("no answer");
  //     // Call recipient did not answer
  //     // Perform any necessary actions
  //     break;
  //   default:
  // }
};

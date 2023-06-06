const plivo = require("plivo");
require("dotenv").config();

exports.plivoCall = async () => {
  var client = new plivo.Client(
    "MAY2MXMZZINGE2NDJKY2",
    "ZDA2ZWY2M2RjNjUwOTdkNGI2MzAyOGNkODlkNjc5"
  );
  client.calls
    .create(
      "+1 614-298-4523", // from
      "+918075176645", // to
      `${process.env.ServerUrl}/twilio/answer-url`, // answer url
      {
        answerMethod: "POST",
      }
    )
    .then(
      function (response) {
        console.log(response);
      },
      function (err) {
        console.error(err);
      }
    );
};

exports.answerUrl = async (req, res) => {
  const callStatus = req.body.CallStatus;
  console.log("statussss", callStatus);
  const callUUID = req.body.CallUUID;

  // Handle the call status based on the received data
  switch (callStatus) {
    case "completed":
      console.log(req.body);
      console.log("completde");
      // Call completed successfully
      // Perform any necessary actions
      break;
    case "busy":
      console.log(req.body);
      console.log("busy");
      // Call recipient was busy
      // Perform any necessary actions
      break;
    case "in-progress":
      console.log(req.body);
      console.log("in-progress");
      // Call failed
      // Perform any necessary actions
      break;
    case "timeout":
      console.log(req.body);
      console.log("timeout");
      // Call timed out
      // Perform any necessary actions
      break;
    case "no-answer":
      console.log(req.body);
      console.log("no answer");
      // Call recipient did not answer
      // Perform any necessary actions
      break;
    default:
  }
};

exports.fallBackUrl = async (data) => {
  console.log("fallback", data);
};

exports.hangUpUrl = async (data) => {
  console.log("hangUpUrl", data);
};

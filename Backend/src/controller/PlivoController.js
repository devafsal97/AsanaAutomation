const plivo = require("../services/plivoVoice");

require("dotenv").config();

exports.answerUrl = async (req, res) => {
  const callStatus = req.body;
  console.log("statussss", callStatus);
  const callPriority = req.query.callPriority;
  const gid = req.query.gid;
  const phoneNumber = req.body.To;

  await plivo.updateCallStatus(phoneNumber, req.body, callPriority, gid);
  const xmlResponse = `
    <Response>
      <Speak>new emergency task created with id ${gid}</Speak>
    </Response>
  `;

  res.set("Content-Type", "text/xml");
  res.status(200).send(xmlResponse);
};

exports.hangupUrl = async (req, res) => {
  console.log("hangup url hitted", req.body);
  res.status(200);
};

exports.fallbackUrl = async (req, res) => {
  console.log("fallback hitted", req.body);
  res.status(200);
};

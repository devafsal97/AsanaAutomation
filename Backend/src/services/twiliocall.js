const firestore = require("./firestoreCrud");

const escalationData = {
  firstCall: {
    number: "",
    callStatus: "",
  },
  secondCall: {
    number: "",
    callStatus: "",
  },
  thirdCall: {
    number: "",
    callStatus: "",
  },
};

exports.notifyCurrentAuthor = async (data, gid) => {
  phoneNumber = data;
  await this.generateCall(phoneNumber, "standard", gid);
};

exports.escalationCallDefiner = async (gid) => {
  const data = await firestore.getEscalationContacts();
  await this.generateCall(data.FirstContact, "firstCall", gid);
};

exports.updateCallStatus = async (
  phoneNumber,
  callStatusParams,
  callPriorityparam,
  gid
) => {
  const data = await firestore.getEscalationContacts();
  if (
    (callStatusParams.CallStatus == "no-answer" ||
      callStatusParams.CallStatus == "busy") &&
    callPriorityparam == "firstCall"
  ) {
    console.log(
      phoneNumber,
      callStatusParams.CallStatus,
      callPriorityparam,
      gid
    );
    const escalationdata = {
      number: callStatusParams.Called,
      callStatus: callStatusParams.CallStatus,
      timeStamp: callStatusParams.Timestamp,
    };
    await firestore.updateTask(gid, escalationdata);
    await this.generateCall(data.SecondContact, "secondCall", gid);
  } else if (
    callStatusParams.CallStatus == "in-progress" &&
    callPriorityparam == "firstCall"
  ) {
    const escalationdata = {
      number: callStatusParams.Called,
      callStatus: "Answered",
      timeStamp: callStatusParams.Timestamp,
    };
    await firestore.updateTask(gid, escalationdata);
  }
  if (
    (callStatusParams.CallStatus == "no-answer" ||
      callStatusParams.CallStatus == "busy") &&
    callPriorityparam == "secondCall"
  ) {
    console.log(
      phoneNumber,
      callStatusParams.CallStatus,
      callPriorityparam,
      gid
    );
    const escalationdata = {
      number: callStatusParams.Called,
      callStatus: callStatusParams.CallStatus,
      timeStamp: callStatusParams.Timestamp,
    };
    await firestore.updateTask(gid, escalationdata);
    await this.generateCall(data.SecondContact, "thirdCall", gid);
  } else if (
    callStatusParams.CallStatus == "in-progress" &&
    callPriorityparam == "secondCall"
  ) {
    const escalationdata = {
      number: callStatusParams.Called,
      callStatus: "Answered",
      timeStamp: callStatusParams.Timestamp,
    };
    await firestore.updateTask(gid, escalationdata);
  }
  if (
    (callStatusParams.CallStatus == "no-answer" ||
      callStatusParams.CallStatus == "busy") &&
    callPriorityparam == "thirdCall"
  ) {
    console.log(
      phoneNumber,
      callStatusParams.CallStatus,
      callPriorityparam,
      gid
    );
    const escalationdata = {
      number: callStatusParams.Called,
      callStatus: callStatusParams.CallStatus,
      timeStamp: callStatusParams.Timestamp,
    };
    await firestore.updateTask(gid, escalationdata);
  } else if (
    callStatusParams.CallStatus === "in-progress" &&
    callPriorityparam == "thirdCall"
  ) {
    const escalationdata = {
      number: callStatusParams.Called,
      callStatus: "Answered",
      timeStamp: callStatusParams.Timestamp,
    };
    await firestore.updateTask(gid, escalationdata);
  }
  if (
    (callStatusParams.CallStatus == "no-answer" ||
      callStatusParams.CallStatus == "busy") &&
    callPriorityparam == "standard"
  ) {
    console.log(
      phoneNumber,
      callStatusParams.CallStatus,
      callPriorityparam,
      gid
    );
    const escalationdata = {
      number: callStatusParams.Called,
      callStatus: callStatusParams.CallStatus,
      timeStamp: callStatusParams.Timestamp,
    };
    await firestore.updateAuthorCallData(gid, escalationdata);
  } else if (
    callStatusParams.CallStatus === "in-progress" &&
    callPriorityparam == "standard"
  ) {
    const escalationdata = {
      number: callStatusParams.Called,
      callStatus: "Answered",
      timeStamp: callStatusParams.Timestamp,
    };
    await firestore.updateAuthorCallData(gid, escalationdata);
  }
};

exports.generateCall = async (number, priority, gid) => {
  const accountSid = "AC1ca42dfe718f96ef4489ffef386cd2f1";
  const authToken = "1d327728eca86b5890f0fbcfa3beaf5c";
  const client = require("twilio")(accountSid, authToken);

  client.calls.create({
    url: "http://demo.twilio.com/docs/voice.xml",
    to: number,
    from: "+16204559131",
    statusCallback: `https://32fe-103-243-45-169.ngrok-free.app/api/status-callback?callPriority=${priority}&gid=${gid}`,
    statusCallbackEvent: ["answered", "completed"],
    statusCallbackMethod: "POST",
  });
};

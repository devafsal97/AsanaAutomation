const firestore = require("./firestoreCrud");
const Escalation = require("../models/Escalation");
const Task = require("../models/Task");
const User = require("../models/User");
require("dotenv").config();

exports.notifyCurrentAuthor = async (data, gid) => {
  phoneNumber = data;
  await this.generateCall(phoneNumber, "standard", gid);
};

exports.escalationCallDefiner = async (gid) => {
  const data = await Escalation.getAll();

  const initialContactData = data.filter((item) => item.priority == "Initial");

  const initialContactUser = await User.findById(initialContactData[0].userId);
  const phoneNumber = initialContactUser.phoneNumber;
  await this.generateCall(phoneNumber, "Initial", gid);
};

exports.updateCallStatus = async (
  phoneNumber,
  callStatusParams,
  callPriorityparam,
  gid
) => {
  const data = await Escalation.getAll();
  if (
    (callStatusParams.CallStatus == "no-answer" ||
      callStatusParams.CallStatus == "busy") &&
    callPriorityparam == "Initial"
  ) {
    const escalationdata = {
      number: callStatusParams.Called,
      callStatus: callStatusParams.CallStatus,
      timeStamp: callStatusParams.Timestamp,
    };
    await updateTaskDetails(gid, escalationdata, "Initial");
    const secondayContactData = data.filter(
      (item) => item.priority == "Secondary"
    );
    const secondayContactUser = await User.findById(
      secondayContactData[0].userId
    );
    await this.generateCall(secondayContactUser.phoneNumber, "Secondary", gid);
  } else if (
    callStatusParams.CallStatus == "in-progress" &&
    callPriorityparam == "Initial"
  ) {
    const escalationdata = {
      number: callStatusParams.Called,
      callStatus: "Answered",
      timeStamp: callStatusParams.Timestamp,
    };
    await updateTaskDetails(gid, escalationdata, "Initial");
  }
  if (
    (callStatusParams.CallStatus == "no-answer" ||
      callStatusParams.CallStatus == "busy") &&
    callPriorityparam == "Secondary"
  ) {
    const escalationdata = {
      number: callStatusParams.Called,
      callStatus: callStatusParams.CallStatus,
      timeStamp: callStatusParams.Timestamp,
    };
    await updateTaskDetails(gid, escalationdata, "Secondary");
    const tertiaryContactData = data.filter(
      (item) => item.priority == "Tertiary"
    );
    const tertiaryContactUser = await User.findById(
      tertiaryContactData[0].userId
    );
    await this.generateCall(tertiaryContactUser.phoneNumber, "Tertiary", gid);
  } else if (
    callStatusParams.CallStatus == "in-progress" &&
    callPriorityparam == "Secondary"
  ) {
    const escalationdata = {
      number: callStatusParams.Called,
      callStatus: "Answered",
      timeStamp: callStatusParams.Timestamp,
    };
    await updateTaskDetails(gid, escalationdata, "Secondary");
  }
  if (
    (callStatusParams.CallStatus == "no-answer" ||
      callStatusParams.CallStatus == "busy") &&
    callPriorityparam == "Tertiary"
  ) {
    const escalationdata = {
      number: callStatusParams.Called,
      callStatus: callStatusParams.CallStatus,
      timeStamp: callStatusParams.Timestamp,
    };
    await updateTaskDetails(gid, escalationdata, "Tertiary");
  } else if (
    callStatusParams.CallStatus === "in-progress" &&
    callPriorityparam == "Tertiary"
  ) {
    const escalationdata = {
      number: callStatusParams.Called,
      callStatus: "Answered",
      timeStamp: callStatusParams.Timestamp,
    };
    await updateTaskDetails(gid, escalationdata, "Tertiary");
  }
  if (
    (callStatusParams.CallStatus == "no-answer" ||
      callStatusParams.CallStatus == "busy") &&
    callPriorityparam == "standard"
  ) {
    const escalationdata = {
      number: callStatusParams.Called,
      callStatus: callStatusParams.CallStatus,
      timeStamp: callStatusParams.Timestamp,
    };

    await updateTaskDetails(gid, escalationdata, "standard");
  } else if (
    callStatusParams.CallStatus === "in-progress" &&
    callPriorityparam == "standard"
  ) {
    const escalationdata = {
      number: callStatusParams.Called,
      callStatus: "Answered",
      timeStamp: callStatusParams.Timestamp,
    };
    await updateTaskDetails(gid, escalationdata, "standard");
  }
};

exports.generateCall = async (number, priority, gid) => {
  const accountSid = process.env.TwilioAccounSid;
  const authToken = process.env.TwilioAuthToken;
  const client = require("twilio")(accountSid, authToken);

  client.calls.create({
    url: "http://demo.twilio.com/docs/voice.xml",
    to: number,
    from: "+16204559131",
    statusCallback: `${process.env.ServerUrl}/twilio/status-callback?callPriority=${priority}&gid=${gid}`,
    statusCallbackEvent: ["answered", "completed"],
    statusCallbackMethod: "POST",
  });
};

const updateTaskDetails = async (taskId, data, priority) => {
  const task = await Task.getByGid(taskId);

  if (priority == "standard") {
    const updatedTask = { ...task, authorCallStatus: data };

    await Task.update(updatedTask);
  } else {
    const escalationData = task.escalationProcess;
    escalationData.push(data);
    const updatedTask = { ...task, escalationProcess: escalationData };
    await Task.update(updatedTask);
  }
};

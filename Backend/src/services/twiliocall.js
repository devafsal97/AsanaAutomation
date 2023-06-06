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
  console.log("data", data);
  const initialContactData = data.filter((item) => item.priority == "Initial");
  console.log("initia ata", initialContactData);
  const initialContactUser = await User.findById(initialContactData[0].userId);
  const phoneNumber = initialContactUser.phoneNumber;
  await this.generateCall(phoneNumber, "firstCall", gid);
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
    await updateTaskDetails(gid, escalationdata, "firstCall");
    const secondayContactData = data.filter(
      (item) => item.priority == "Secondary"
    );
    const secondayContactUser = await User.findById(
      secondayContactData[0].userId
    );
    await this.generateCall(secondayContactUser.phoneNumber, "secondCall", gid);
  } else if (
    callStatusParams.CallStatus == "in-progress" &&
    callPriorityparam == "firstCall"
  ) {
    const escalationdata = {
      number: callStatusParams.Called,
      callStatus: "Answered",
      timeStamp: callStatusParams.Timestamp,
    };
    await updateTaskDetails(gid, escalationdata, "firstCall");
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
    await updateTaskDetails(gid, escalationdata, "secondCall");
    const tertiaryContactData = data.filter(
      (item) => item.priority == "Tertiary"
    );
    const tertiaryContactUser = await User.findById(
      tertiaryContactData[0].userId
    );
    await this.generateCall(tertiaryContactUser.phoneNumber, "thirdCall", gid);
  } else if (
    callStatusParams.CallStatus == "in-progress" &&
    callPriorityparam == "secondCall"
  ) {
    const escalationdata = {
      number: callStatusParams.Called,
      callStatus: "Answered",
      timeStamp: callStatusParams.Timestamp,
    };
    await updateTaskDetails(gid, escalationdata, "secondCall");
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
    await updateTaskDetails(gid, escalationdata, "thirdCall");
  } else if (
    callStatusParams.CallStatus === "in-progress" &&
    callPriorityparam == "thirdCall"
  ) {
    const escalationdata = {
      number: callStatusParams.Called,
      callStatus: "Answered",
      timeStamp: callStatusParams.Timestamp,
    };
    await updateTaskDetails(gid, escalationdata, "thirdCall");
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
  console.log("data", data);
  const task = await Task.getByGid(taskId);
  console.log("task detais", task);
  if (priority == "standard") {
    const updatedTask = { ...task, authorCallStatus: data };
    console.log("updated task", updatedTask);
    await Task.update(updatedTask);
  } else {
    const escalationData = task.escalationProcess;
    escalationData.push(data);
    const updatedTask = { ...task, escalationProcess: escalationData };
    await Task.update(updatedTask);
  }
};

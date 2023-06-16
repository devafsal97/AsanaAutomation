const firestore = require("./firestoreCrud");
const Escalation = require("../models/Escalation");
const Task = require("../models/Task");
const User = require("../models/User");
const plivo = require("plivo");
const moment = require("moment");
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
      "first call status",
      phoneNumber,
      callStatusParams.CallStatus,
      callPriorityparam,
      gid
    );
    const escalationdata = {
      number: callStatusParams.To,
      callStatus: callStatusParams.CallStatus,
      timeStamp: moment().format("YYYY-MM-DD HH:mm:ss").toString(),
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
      number: callStatusParams.To,
      callStatus: "Answered",
      timeStamp: moment().format("YYYY-MM-DD HH:mm:ss").toString(),
    };
    await updateTaskDetails(gid, escalationdata, "firstCall");
  }
  if (
    (callStatusParams.CallStatus == "no-answer" ||
      callStatusParams.CallStatus == "busy") &&
    callPriorityparam == "secondCall"
  ) {
    console.log(
      "second call status",
      phoneNumber,
      callStatusParams.CallStatus,
      callPriorityparam,
      gid
    );
    const escalationdata = {
      number: callStatusParams.To,
      callStatus: callStatusParams.CallStatus,
      timeStamp: moment().format("YYYY-MM-DD HH:mm:ss").toString(),
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
      number: callStatusParams.To,
      callStatus: "Answered",
      timeStamp: moment().format("YYYY-MM-DD HH:mm:ss").toString(),
    };
    await updateTaskDetails(gid, escalationdata, "secondCall");
  }
  if (
    (callStatusParams.CallStatus == "no-answer" ||
      callStatusParams.CallStatus == "busy") &&
    callPriorityparam == "thirdCall"
  ) {
    console.log(
      "third call status",
      phoneNumber,
      callStatusParams.CallStatus,
      callPriorityparam,
      gid
    );
    const escalationdata = {
      number: callStatusParams.To,
      callStatus: callStatusParams.CallStatus,
      timeStamp: moment().format("YYYY-MM-DD HH:mm:ss").toString(),
    };
    await updateTaskDetails(gid, escalationdata, "thirdCall");
  } else if (
    callStatusParams.CallStatus === "in-progress" &&
    callPriorityparam == "thirdCall"
  ) {
    const escalationdata = {
      number: callStatusParams.To,
      callStatus: "Answered",
      timeStamp: moment().format("YYYY-MM-DD HH:mm:ss").toString(),
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
      number: callStatusParams.To,
      callStatus: callStatusParams.CallStatus,
      timeStamp: moment().format("YYYY-MM-DD HH:mm:ss").toString(),
    };

    await updateTaskDetails(gid, escalationdata, "standard");
  } else if (
    callStatusParams.CallStatus === "in-progress" &&
    callPriorityparam == "standard"
  ) {
    const escalationdata = {
      number: callStatusParams.To,
      callStatus: "Answered",
      timeStamp: moment().format("YYYY-MM-DD HH:mm:ss").toString(),
    };
    await updateTaskDetails(gid, escalationdata, "standard");
  }
};

exports.generateCall = async (number, priority, gid) => {
  console.log("generate call reached", number);
  var client = new plivo.Client(
    process.env.PlivoAuthId,
    process.env.PlivoAuthToken
  );
  client.calls.create(
    "+19702872487",
    `+91${number}`,
    `${process.env.ServerUrl}/api/plivo/answer-url?callPriority=${priority}&gid=${gid}`,
    {
      answerMethod: "POST",
    }
  );
};

const updateTaskDetails = async (taskId, data, priority) => {
  const task = await Task.getByGid(taskId);
  if (priority == "standard") {
    const updatedTask = { ...task, authorCallStatus: data };
    await Task.update(updatedTask);
  } else {
    const escalationData = task.escalationProcess;
    const object = escalationData.find((item) => item["priority"] === priority);
    if (!object) {
      console.log("no object");
      escalationData.push(data);
      const updatedTask = { ...task, escalationProcess: escalationData };
      await Task.update(updatedTask);
    }
  }
};

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
      number: callStatusParams.To,
      callStatus: "Answered",
      timeStamp: moment().format("YYYY-MM-DD HH:mm:ss").toString(),
    };
    await updateTaskDetails(gid, escalationdata, "Initial");
  }
  if (
    (callStatusParams.CallStatus == "no-answer" ||
      callStatusParams.CallStatus == "busy") &&
    callPriorityparam == "Secondary"
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
      number: callStatusParams.To,
      callStatus: "Answered",
      timeStamp: moment().format("YYYY-MM-DD HH:mm:ss").toString(),
    };
    await updateTaskDetails(gid, escalationdata, "Secondary");
  }
  if (
    (callStatusParams.CallStatus == "no-answer" ||
      callStatusParams.CallStatus == "busy") &&
    callPriorityparam == "Tertiary"
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
    await updateTaskDetails(gid, escalationdata, "Tertiary");
  } else if (
    callStatusParams.CallStatus === "in-progress" &&
    callPriorityparam == "Tertiary"
  ) {
    const escalationdata = {
      number: callStatusParams.To,
      callStatus: "Answered",
      timeStamp: moment().format("YYYY-MM-DD HH:mm:ss").toString(),
    };
    await updateTaskDetails(gid, escalationdata, "Tertiary");
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
  var client = new plivo.Client(
    process.env.PlivoAuthId,
    process.env.PlivoAuthToken
  );
  client.calls.create(
    "+19702872487",
    `+66${number}`,
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
      escalationData.push(data);
      const updatedTask = { ...task, escalationProcess: escalationData };
      await Task.update(updatedTask);
    }
  }
};

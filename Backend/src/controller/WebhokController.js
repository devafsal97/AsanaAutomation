const axios = require("axios");
const twilio = require("../services/twiliocall");
const firebase = require("../services/firestoreCrud");
const Author = require("../models/Author");
const User = require("../models/User");
const moment = require("moment");
const Task = require("../models/Task");
const tatCaculator = require("../services/tatCalculator");
const Comment = require("../models/Comment");

exports.create_task_emer_post = async (req, res) => {
  if (req.header("x-hook-secret")) {
    secret = req.header("x-hook-secret");
    res.setHeader("x-hook-secret", secret);
    res.sendStatus(200);
  } else if (req.header("x-hook-signature")) {
    // console.log("emrgency events",req.body.events[0])
    // const computedSignature = crypto.createHmac("SHA256",secret)
    // .update(JSON.stringify(req.body))
    // .digest("hex");

    // if(!crypto.timingSafeEqual(
    //     Buffer.from(req.header("x-hook-signature")),
    //     Buffer.from(computedSignature)
    // )){
    //     res.sendStatus(401);
    // }else{
    res.sendStatus(200);
    if (req.body.events[0].change.new_value.gid === "1204569783901849") {
      const taskId = req.body.events[0].resource.gid;
      const taskDetails = await getTaskDetails(taskId);
      const date = new Date().toLocaleString();
      const customfield = taskDetails.data.custom_fields;
      const timingStatus = customfield.find(
        (item) => item.gid === "1204569783901849"
      );
      if (
        timingStatus.display_value === "Emergency" ||
        timingStatus.display_value === "Exception"
      ) {
        startTimer(taskId);

        const authors = await Author.getAll();
        const authorArray = authors.filter((author) => {
          const startTime = moment(author.startTime, "h:mm a");
          const endTime = moment(author.endTime, "h:mm a");

          const currentTime = moment();
          if (endTime.isBefore(startTime)) {
            startTime.add(-1, "day");
          }
          if (currentTime.isBetween(startTime, endTime)) {
            return author;
          } else {
            console.log("Current time is not between the start and end times.");
          }
        });

        const currentAuthor = await User.findById(authorArray[0].userId);

        const taskUrlresponse = await getTaskUrl(taskId);
        const taskUrl = taskUrlresponse.data.data.permalink_url;
        const task = new Task({
          name: taskDetails.data.name,
          createdAt: date,
          author: currentAuthor.name,
          authorCallStatus: {},
          escalationProcess: [],
          gid: taskDetails.data.gid,
          inProgressTime: "",
          completedTime: "",
          turnArroundTime: "",
          url: taskUrl,
        });

        await task.save();

        await twilio.notifyCurrentAuthor(currentAuthor.phoneNumber, taskId);
      }
    }
  }
};

exports.setionChange_Post = async (req, res) => {
  if (req.header("x-hook-secret")) {
    console.log("this is new webhook");
    secret = req.header("x-hook-secret");
    res.setHeader("x-hook-secret", secret);
    res.sendStatus(200);
  } else if (req.header("x-hook-signature")) {
    // const computedSignature = crypto.createHmac("SHA256",secret)
    // .update(JSON.stringify(req.body))
    // .digest("hex");

    // if(!crypto.timingSafeEqual(
    //     Buffer.from(req.header("x-hook-signature")),
    //     Buffer.from(computedSignature)
    // )){
    //     res.sendStatus(401);
    // }else{
    res.sendStatus(200);
    const taskId = req.body.events[0].parent.gid;
    const date = new Date().toLocaleString();
    const taskDetails = await getTaskDetails(taskId);
    const customfield = taskDetails.data.custom_fields;
    const timingStatus = customfield.find(
      (item) => item.gid === "1204569783901849"
    );
    if (
      timingStatus.display_value === "Emergency" ||
      timingStatus.display_value === "Exception"
    ) {
      const status = taskDetails.data.memberships[0].section.name;
      if (status == "In Progress" || status == "Published") {
        await updateTaskProgress(taskId, status, date);
      }
    }
  }
};

async function getTaskDetails(id) {
  const response = await axios.get(
    `https://app.asana.com/api/1.0/tasks/${id}`,
    {
      headers: {
        Authorization: `Bearer 1/1204569739108552:c7540c050a75c47debbebec51aaab986`,
      },
    }
  );
  return response.data;
}

const functionAfter2Minutes = async (taskId) => {
  getTaskDetails(taskId).then(async (taskDetails) => {
    const section = taskDetails.data.memberships[0].section.name;
    if (section != "In Progress") {
      await twilio.escalationCallDefiner(taskDetails.data.gid);
    }
  });
};

const functionAfter15Minutes = async (taskId) => {
  const taskDetails = await getTaskDetails(taskId);
  const section = taskDetails.data.memberships[0].section.name;
  if (section != "Published" && section == "In Progress") {
    const comment = await Comment.getByName("Comment On Delay");
    await addComment(taskId, comment.comment);
  }
};

const startTimer = (taskId) => {
  let timerId = setTimeout(() => {
    functionAfter2Minutes(taskId);
    timerId = setTimeout(() => {
      functionAfter15Minutes(taskId);
    }, 1 * 60 * 1000);
  }, 0.5 * 60 * 1000);
};

const updateTaskProgress = async (taskId, status, date) => {
  const task = await Task.getByGid(taskId);
  if (status == "In Progress") {
    updatedTask = { ...task, inProgressTime: date };
    await Task.update(updatedTask);
  } else if (status == "Published") {
    const turnArroundTime = tatCaculator.tatCaculator(
      task.inProgressTime,
      date
    );
    updatedTask = {
      ...task,
      completedTime: date,
      turnArroundTime: turnArroundTime,
    };
    await Task.update(updatedTask);
    const comment = await Comment.getByName("Comment On Completed");
    await addComment(taskId, comment.comment);
  }
};

const addComment = async (gid, comment) => {
  const accessToken = "1/1204569739108552:c7540c050a75c47debbebec51aaab986";

  const commentText = comment;

  const requestHeaders = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const requestBody = {
    data: {
      text: commentText,
    },
  };

  axios
    .post(
      `https://app.asana.com/api/1.0/tasks/${gid}/stories?opt_fields=`,
      requestBody,
      { headers: requestHeaders }
    )
    .then((response) => {
      console.log("Comment added:", response.data.data.text);
    })
    .catch((error) => {
      console.error("Error adding comment:", error.response.data.errors);
    });
};

const getTaskUrl = async (gid) => {
  const accessToken = "1/1204569739108552:c7540c050a75c47debbebec51aaab986";
  const taskId = gid;

  const requestHeaders = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const taskUrl = await axios.get(
    `https://app.asana.com/api/1.0/tasks/${taskId}?opt_fields=permalink_url`,
    { headers: requestHeaders }
  );
  return taskUrl;
};

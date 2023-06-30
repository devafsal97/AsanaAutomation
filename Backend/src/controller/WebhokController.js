const axios = require("axios");
const plivo = require("../services/plivoVoice");
const firebase = require("../services/firestoreCrud");
const Author = require("../models/Author");
const User = require("../models/User");
const moment = require("moment");
const Task = require("../models/Task");
const tatCaculator = require("../services/tatCalculator");
const Comment = require("../models/Comment");
const crypto = require("crypto");
const fs = require("fs");
var path = require("path");
const firestoreAdmin = require("firebase-admin");
const { threadId } = require("worker_threads");
require("dotenv").config();

exports.create_task_emer_post = async (req, res) => {
  try {
    console.log("webhook recieved");
    const requestBody = JSON.stringify(req.body);

    if (req.header("X-Hook-Secret")) {
      xHookSecret = req.header("X-Hook-Secret");
      console.log(xHookSecret);
      console.log("X-Hook-Secret true");
      fs.writeFile(
        path.join(__dirname, "..", "constants", "xhookSecret.txt"),
        xHookSecret,
        (err) => {
          if (err) {
            console.error("Error writing secret file:", err);
          } else {
            console.log("Secret file saved successfully");
          }
        }
      );
      res.setHeader("X-Hook-Secret", xHookSecret);
      res.sendStatus(200);
    } else if (req.header("X-Hook-Signature")) {
      const xHookSignature = req.header("X-Hook-Signature");
      console.log("reached");

      const xHookSecret = fs.readFileSync(
        path.join(__dirname, "..", "constants", "xhookSecret.txt"),
        "utf8"
      );

      const calculatedSignature = crypto
        .createHmac("sha256", xHookSecret)
        .update(requestBody)
        .digest("hex");

      if (calculatedSignature === xHookSignature) {
        console.log("valid signature");
        res.sendStatus(200);
        console.log("evenst", req.body.events[0].change.new_value.gid);
        if (!!req.body.events.length) {
          if (
            req.body.events[0].change.new_value.gid ===
            process.env.TimingCustomFiledId
          ) {
            console.log("daataaaaa", req.body.events[0].resource);
            const taskId = req.body.events[0].resource.gid;
            const taskDetails = await getTaskDetails(taskId);
            const date = firestoreAdmin.firestore.FieldValue.serverTimestamp();
            const customfield = taskDetails.data.custom_fields;
            const timingStatus = customfield.find(
              (item) => item.gid === process.env.TimingCustomFiledId
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
                  endTime.add(1, "day");
                }
                if (currentTime.isBetween(startTime, endTime)) {
                  return author;
                } else {
                  console.log(
                    "Current time is not between the start and end times."
                  );
                }
              });
              if (!!authorArray.length) {
                const currentAuthor = await User.findById(
                  authorArray[0].userId
                );

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

                // await plivo.notifyCurrentAuthor(
                //   currentAuthor.phoneNumber,
                //   taskId
                // );
              } else {
                throw new Error("No author Found");
              }
            }
          } else {
            throw new Error("not the timing custom field value changed");
          }
        }
      } else {
        console.log("Invalid signature!");
        res.status(403).send("Forbidden");
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

exports.setionChange_Post = async (req, res) => {
  const requestBody = JSON.stringify(req.body);

  if (req.header("X-Hook-Secret")) {
    xHookSecret = req.header("X-Hook-Secret");
    console.log(xHookSecret);
    console.log("X-Hook-Secret true");
    fs.writeFile(
      path.join(__dirname, "..", "constants", "sectionChangeSecret.txt"),
      xHookSecret,
      (err) => {
        if (err) {
          console.error("Error writing secret file:", err);
        } else {
          console.log("Secret file saved successfully");
        }
      }
    );
    res.setHeader("X-Hook-Secret", xHookSecret);
    res.sendStatus(200);
  } else if (req.header("X-Hook-Signature")) {
    const xHookSignature = req.header("X-Hook-Signature");
    console.log("reached");

    const xHookSecret = fs.readFileSync(
      path.join(__dirname, "..", "constants", "sectionChangeSecret.txt"),
      "utf8"
    );

    const calculatedSignature = crypto
      .createHmac("sha256", xHookSecret)
      .update(requestBody)
      .digest("hex");

    if (calculatedSignature === xHookSignature) {
      console.log("valide sign");
      res.sendStatus(200);
      if (!!req.body.events.length) {
        const taskId = req.body.events[0].parent.gid;
        const date = new Date().toLocaleString();
        const taskDetails = await getTaskDetails(taskId);
        const customfield = taskDetails.data.custom_fields;
        const timingStatus = customfield.find(
          (item) => item.gid === process.env.TimingCustomFiledId
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
    }
  }
};

async function getTaskDetails(id) {
  const response = await axios.get(`${process.env.AsanaTaskApi}/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.AsanaAccessToken}`,
    },
  });
  return response.data;
}

const functionAfter2Minutes = async (taskId) => {
  getTaskDetails(taskId).then(async (taskDetails) => {
    const section = taskDetails.data.memberships[0].section.name;
    if (section != "In Progress") {
      //await plivo.escalationCallDefiner(taskDetails.data.gid);
    }
  });
};

const functionAfter15Minutes = async (taskId) => {
  console.log("functin after 15 min cllaed");
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
  const accessToken = process.env.AsanaAccessToken;

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
      `${process.env.AsanaTaskApi}/${gid}/stories?opt_fields=`,
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
  const accessToken = process.env.AsanaAccessToken;
  const taskId = gid;

  const requestHeaders = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const taskUrl = await axios.get(
    `${process.env.AsanaTaskApi}/${taskId}?opt_fields=permalink_url`,
    { headers: requestHeaders }
  );
  return taskUrl;
};

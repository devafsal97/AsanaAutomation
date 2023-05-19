const axios = require("axios");
const twilio = require("../services/twiliocall");
const firebase = require("../services/firestoreCrud");

exports.create_task_emer_post = async (req, res) => {
  if (req.header("x-hook-secret")) {
    console.log("this is new webhook");
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
    console.log(" events", req.body.events[0]);
    if (req.body.events[0].change.new_value.gid === "1204345653271174") {
      const taskId = req.body.events[0].resource.gid;
      const taskDetails = await getTaskDetails(taskId);
      const date = new Date().toLocaleString();
      console.log("first time", taskDetails.data.memberships[0].section.name);
      const customfield = taskDetails.data.custom_fields;
      const timingStatus = customfield.find(
        (item) => item.gid === "1204345653271174"
      );
      if (
        timingStatus.display_value === "Emergency" ||
        timingStatus.display_value === "Exception"
      ) {
        startTimer(taskId);
        let authordata;
        let taskUrl;
        firebase.getCurrentAuthor().then(async (result) => {
          console.log("author data", result);
          authordata = result;
          await firebase.getTaskUrl(taskId);
          await firebase.addTask(
            taskDetails.data.gid,
            taskDetails.data.name,
            date,
            authordata.Name
          );
          await twilio.notifyCurrentAuthor(authordata.PhoneNumber, taskId);
        });
      }
    }
  }
};

exports.setionChange_Post = async (req, res) => {
  console.log("recieved");
  console.log(JSON.stringify(req.headers));
  console.log("xhook secret", req.header("x-hook-secret"));
  if (req.header("x-hook-secret")) {
    console.log("this is new webhook");
    secret = req.header("x-hook-secret");
    res.setHeader("x-hook-secret", secret);
    res.sendStatus(200);
  } else if (req.header("x-hook-signature")) {
    console.log(req.body.events);
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
      (item) => item.gid === "1204345653271174"
    );
    if (
      timingStatus.display_value === "Emergency" ||
      timingStatus.display_value === "Exception"
    ) {
      const status = taskDetails.data.memberships[0].section.name;
      if (status == "Doing" || status == "Done") {
        await firebase.updateTaskProgress(taskId, status, date);
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
  console.log("Timer exceeded 2 minutes");
  getTaskDetails(taskId).then(async (taskDetails) => {
    const section = taskDetails.data.memberships[0].section.name;
    if (section != "Doing") {
      await twilio.escalationCallDefiner(taskDetails.data.gid);
    }
  });
};

const functionAfter15Minutes = (taskId) => {
  console.log("Timer exceeded 15 minutes");
  getTaskDetails(taskId).then(async (taskDetails) => {
    const section = taskDetails.data.memberships[0].section.name;
    if (section != "Done") {
      const comment = "we are working on this, will get back to you soon";
      firebase.addComment(taskId, comment);
    }
  });
};

const startTimer = (taskId) => {
  let timerId = setTimeout(() => {
    functionAfter2Minutes(taskId);
    timerId = setTimeout(() => {
      functionAfter15Minutes(taskId);
    }, 1 * 60 * 1000);
  }, 0.5 * 60 * 1000);
};

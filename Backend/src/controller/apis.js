const twilioCall = require("../services/twiliocall");
const firebase = require("../services/firestoreCrud");

exports.getCallEvents = async (req, res) => {
  const callPriority = req.query.callPriority;
  const gid = req.query.gid;
  const phoneNumber = req.body.Called;
  // console.log(req.body)
  twilioCall.updateCallStatus(phoneNumber, req.body, callPriority, gid);
  res.sendStatus(200);
};

exports.getAllTasks = async (req, res) => {
  console.log("request receieved");
  console.log(req.body);
  const limit = req.body.limit;
  const offset = req.body.offset;
  firebase.getAllTask(limit, offset).then((result) => {
    res.json(result);
  });
};

exports.getSearchResult = async (req, res) => {
  console.log(req.body);
  const keyword = req.body.keyword;
  firebase.getSearchTask(keyword).then((result) => {
    res.json(result);
  });
};

exports.getSelectedTask = async (req, res) => {
  const id = req.body.id;
  firebase.getSelectedTask(id).then((data) => {
    res.json(data);
  });
};

exports.getCurrentAuthor = async (req, res) => {
  firebase.getCurrentAuthor().then((result) => {
    res.json(result);
  });
};

exports.updateCurrentAuthor = async (req, res) => {
  const authorData = req.body;
  firebase
    .updateCurrentAuthor(
      authorData.name,
      authorData.contactnumber,
      authorData.id
    )
    .then((result) => {
      res.json(result);
    });
};

exports.getEscalationContacts = async (req, res) => {
  firebase.getEscalationContacts().then((result) => {
    res.json(result);
  });
};

exports.postEscalationContacts = async (req, res) => {
  firebase.updateEscalationData(req.body).then((result) => {
    res.json(result);
  });
};

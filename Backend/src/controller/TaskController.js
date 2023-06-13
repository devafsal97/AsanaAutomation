const Task = require("../models/Task");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    const newTask = new Task(req.body);

    const task = await newTask.save();
    res.json({ success: true, task });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getById = async (req, res) => {
  const response = await Task.findById(req.params.id);
  res.json(response);
};

exports.update = async (req, res) => {
  console.log("req body", req.body);
  const response = await Task.update(req.body);
  res.json(response);
};

exports.getTasks = async (req, res) => {
  try {
    console.log("reached");
    const keyword = req.query.keyword;
    const limit = req.query.limit;
    const offset = req.query.offset;
    console.log(req.query.limit, req.query.offset);
    const response = await Task.getAll(limit, offset, keyword);
    res.json({ success: true, data: response });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

exports.getByDate = async (req, res) => {
  try {
    console.log("reached getbydate", req.query.startDate, req.query.endDate);
    const response = await Task.getByDate(
      req.query.startDate,
      req.query.endDate,
      req.query.limit,
      req.query.offset
    );
    console.log("response", response);
    res.json({ success: true, data: response });
  } catch (error) {
    console.log("err", error.message);
    res.json({ success: false, error: error.message });
  }
};

const Comment = require("../models/Comment.js");

exports.create = async (req, res) => {
  try {
    console.log("req", req.body);
    const comment = new Comment(req.body);
    const response = await comment.save();
    res.json({ success: true, data: response });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

exports.getById = async (req, res) => {
  const response = await Comment.findById(req.query.id);
  return res.json(response);
};

exports.update = async (req, res) => {
  console.log("recahed", req.body);
  const response = await Comment.update(req.body);
  res.json({ success: true, data: response });
};

exports.getComments = async (req, res) => {
  const response = await Comment.getAll();
  res.json(response);
};

const User = require("../models/User");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    const newUser = new User(req.body);

    const user = await newUser.save();
    res.json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getById = async (req, res) => {
  const response = await User.findById(req.params.id);
  res.json(response);
};

exports.update = async (req, res) => {
  console.log("req body", req.body);
  const response = await User.update(req.body);
  res.json(response);
};

exports.getUsers = async (req, res) => {
  console.log("reached");
  console.log(req.query.limit, req.query.offset);
  const response = await User.getAll(req.query.limit, req.query.offset);
  res.json(response);
};

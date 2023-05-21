const Author = require("../models/Author");

exports.create = async (req, res) => {
  const author = new Author(req.body);
  const response = await author.save();
  res.json(response);
};

exports.getById = async (req, res) => {
  const response = await Author.findById(req.query.id);
  return res.json(response);
};

exports.update = async (req, res) => {
  const response = await Author.update(req.body);
  res.json(response);
};

exports.getAuthors = async (req, res) => {
  const response = await Author.getAll();
  res.json(response);
};

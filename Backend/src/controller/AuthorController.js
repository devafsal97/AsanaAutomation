const Author = require("../models/Author");

exports.create = async (req, res) => {
  try {
    console.log("req", req.body);
    const author = new Author(req.body);
    const response = await author.save();
    res.json({ success: true, data: response });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
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

exports.deleteAuthor = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Author.delete(id);
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false });
  }
};
